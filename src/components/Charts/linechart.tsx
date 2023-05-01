import React, { useState, useEffect } from 'react';
import Highcharts, { setOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ResponseData } from '@/app/api/riskdata/route';
import { FormControl, Select, MenuItem, SelectChangeEvent, InputLabel } from '@mui/material';
import ChevronDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import { highchartsTheme } from './theme';
import MY_APP_BASE_URL from '../../../config';


const LineChart = () => {
    const [selectedAssetFilter, setSelectedAssetFilter] = useState('');
    const [selectedAssetLabel, setSelectedAssetLabel] = useState('none');
    const [selectedBusinessCategoryLabel, setSelectedBusinessCategoryLabel] = useState('Energy');
    const [selectedBusinessCategoryFilter, setSelectedBusinessCategoryFilter] = useState('');
    const [assetLabels, setAssetLabels] = useState(['']);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [data, setData] = useState<ResponseData>({ Data: [], hasNext: false, totalPages: 0, pageSize: 0 });
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 300,
    });
    const fetchPageData = async (page: number) => {
        try {
        setLoading(true);
        const res = await fetch(`${MY_APP_BASE_URL}/api/riskdata?filter=${selectedBusinessCategoryFilter}|${selectedAssetFilter}`);
        const data: ResponseData = await res.json();
        setData(data);
        setAssetLabels([...data.Data.map(item => item.assetName)].filter((value, index, self) => self.indexOf(value) === index)        );
        setTotalPages(Number(data.totalPages));
        setLoading(false);
        } catch (error) {
        console.log(error);
        }
    };

        useEffect(() => {         
            fetchPageData(paginationModel.page);
        }, [paginationModel.page, paginationModel.pageSize, selectedAssetFilter, selectedBusinessCategoryFilter]);

    // get unique list of countries from data
    const businessCategories = ['Energy', 'Manufacturing', 'Retail', 'Technology', 'Healthcare', 'Finance'];
    //const assetNames = [...new Set(data.Data.map(item => item.assetName))];
        
    // perform data aggregation for selected country
    const groupedData: {[key: string]: {riskSum: number, count: number}} = {};
    data.Data.forEach(item => {
        if (!groupedData[item.year]) {
        groupedData[item.year] = {
            riskSum: 0,
            count: 0
        };
        }
        groupedData[item.year].riskSum += item.riskRating;
        groupedData[item.year].count++;
    });
    const aggregatedData = Object.keys(groupedData).map(year => ({
        x: parseInt(year),
        y: (groupedData[year].riskSum / groupedData[year].count)*100
    }));
        
    const options = {
        chart: {
        type: 'line',
        },
        title: {
            text: 'Climate Risk Rating vs Year',

        },
        xAxis: {
        title: {
            text: 'Year',
        },
        allowDecimals: false,
        labels: {
            formatter: function (this: { value: number }) {
                return this.value;
            }
        }
        },
        yAxis: {
        title: {
            text: 'Risk %',
        },
        allowDecimals: false,
        min: 0,
        labels: {
            formatter: function (this: { value: number }) {
                return this.value;
            }
        }
        },
        series: [
        {
            name: 'Risk',
            data: aggregatedData
        }
        ],
        dataGrouping: {
            approximation: 'average',
            enabled: true,
            turboThreshold: 2000 // Maximum number of data points to display at a time
        },
    };

    const handleBusinessCategoryChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedAssetFilter('');
        setSelectedAssetLabel('none');
        setSelectedBusinessCategoryFilter(encodeURIComponent(`Business Category:${e.target.value}`));
        setSelectedBusinessCategoryLabel(e.target.value);
        if (e.target.value === 'all') {
            setSelectedBusinessCategoryFilter('');
        }
    }

    const handleAssetNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setSelectedAssetFilter(encodeURIComponent(`Asset Name:${e.target.value}`));
      setSelectedAssetLabel(e.target.value); 

      if (e.target.value === 'none') {
          setSelectedAssetFilter('');
          setSelectedBusinessCategoryFilter(selectedBusinessCategoryFilter);
        }
    }
    
    const WhiteArrowIcon = styled(ChevronDownIcon)({
        color: 'white',
        fill: 'white'
      });
    
    return (
    <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                  <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: '#1c2e4a', borderColor: 'secondary', borderRadius: '20px' }} size="small">    
                        <Select sx={{borderRadius: '20px'}}  color='secondary' id="category" name="category" value={selectedBusinessCategoryLabel} onChange={handleBusinessCategoryChange} IconComponent={WhiteArrowIcon}>
                            <MenuItem value="all">All Categories</MenuItem>
                            {businessCategories.map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
              <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">    
                        <Select id="assetName" name="assetName" value={selectedAssetLabel} onChange={handleAssetNameChange}>
                                <MenuItem value="none">No Asset Selected</MenuItem>
                                {assetLabels.map(asset => (
                                    <MenuItem key={asset} value={asset}>{asset}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
        </div>
          <HighchartsReact highcharts={Highcharts} options={options} theme={highchartsTheme} />
    </div>
  );
};

export default LineChart;
