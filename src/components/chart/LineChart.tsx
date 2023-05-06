import React, { useState, useEffect, useMemo } from 'react';
import Highcharts, { setOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ResponseData } from '@/app/api/riskdata/route';
import { FormControl, Select, MenuItem, SelectChangeEvent, InputLabel, Typography, CircularProgress, Chip } from '@mui/material';
import ChevronDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import { highchartsTheme } from '../theme';
import MY_APP_BASE_URL from '../../../config';
import Image from 'next/image'

const LineChart = () => {
    const [selectedAssetFilter, setSelectedAssetFilter] = useState('');
    const [selectedAssetLabel, setSelectedAssetLabel] = useState('none');
    const [selectedBusinessCategoryLabel, setSelectedBusinessCategoryLabel] = useState('Energy');
    const [selectedBusinessCategoryFilter, setSelectedBusinessCategoryFilter] = useState(encodeURIComponent('Business Category:Energy'));
    const [assetLabels, setAssetLabels] = useState(['']);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [data, setData] = useState<ResponseData>({ Data: [], hasNext: false, totalPages: 0, pageSize: 0 });
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [chartType, setChartType] = useState('line');
    const [aggregatedData, setAggregatedData] = useState([{
        x: 0,
        y: 0
    }])
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 300,
    });
    const chartTypes = ['line', 'area', 'column', 'bar', 'pie', 'scatter'];
    const businessCategories = ['Energy', 'Manufacturing', 'Retail', 'Technology', 'Healthcare', 'Finance'];

    const fetchPageData = async (page: number) => {
        try {
          setLoading(true);
          const res = await fetch(`${MY_APP_BASE_URL}/api/riskdata?filter=${selectedBusinessCategoryFilter}|${selectedAssetFilter}`);
          const data: ResponseData = await res.json();
          if (data && data.Data && data.Data.length > 0) {
            setData(data);
            setAssetLabels([...data.Data.map(item => item.assetName)].filter((value, index, self) => self.indexOf(value) === index));
            setTotalPages(Number(data.totalPages));
          }
          setLoading(false);
        } catch (error) {
        console.log(error);
        }
      };    
      
      useEffect(() => {         
        fetchPageData(paginationModel.page);
      }, [paginationModel.page, paginationModel.pageSize, selectedAssetFilter, selectedBusinessCategoryFilter]);
      
      useEffect(() => {         
        const agg = aggregateData(data);
        setAggregatedData(agg);
      }, [data]);
      
      
      function aggregateData(data: ResponseData | null) {
        if (data && data?.Data && data?.Data?.length > 0) {
          const groupedData = data?.Data?.reduce((acc: { [key: string]: { riskSum: number, count: number } }, item) => {
            if (!acc[item.year]) {
              acc[item.year] = {
                riskSum: 0,
                count: 0
              };
            }
            acc[item.year].riskSum += item.riskRating;
            acc[item.year].count++;
            return acc;
          }, {});

          const aggregate = Object.keys(groupedData).map(year => ({
            x: parseInt(year),
            y: (groupedData[year].riskSum / groupedData[year].count) * 100
          }));
          return aggregate;
        }
        return [{x: 0, y: 0  }];
      }

    const options = {
        chart: {
            type: `${chartType}`
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
    
    var combinedOptions = options;
    if (typeof Highcharts === 'object') {
        combinedOptions = Highcharts.merge(options, highchartsTheme);
    }
    
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
    const handleChange = (e: string) => {
        setChartType(e);
    };

    const WhiteArrowIcon = styled(ChevronDownIcon)({
        color: 'white',
        fill: 'white'
    });
    

    return (
    <div>
        <div style={{ display: 'relative', marginBottom: '6%' }}>
            
        </div>
        <div style={{ background: '#242F39', display: 'flex', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', justifyContent: 'space-between', width: '100%', border: '1px solid #495262', flexWrap: 'wrap', alignItems: 'center' }}>
            <img style={{ width: '250px', height: '120px', marginBottom: '2%' }} src="https://imgtr.ee/images/2023/04/27/JMcWb.png" alt="" />
                <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', marginTop: 'auto', flexWrap: 'wrap' }}>
                <div> 
                    <Typography fontWeight={'medium'} color={'white'} fontSize={'small'} ml={3} align='left' variant='h4'>Assets</Typography>
                    <FormControl
                        variant="outlined"
                        color="secondary"
                        sx={{
                        m: 0,
                        minWidth: 30,
                        borderRadius: "50px",
                        padding: "14px",
                        width: "200px",
                        marginBottom: "5%",
                        borderColor: "secondary.main",
                        "& label": {
                            color: "secondary.main"
                        },
                        "& fieldset": {
                            borderColor: "secondary.main"
                        }
                        }}
                        size="small"
                    > 
                            <Select sx={{ borderRadius: '20px', minWidth: '30px'}} color='secondary' id="category" name="category" value={selectedAssetLabel} onChange={handleAssetNameChange} IconComponent={WhiteArrowIcon}>
                        <MenuItem value="none" style={{marginRight: 'auto'}}>No Assets selected</MenuItem>
                        {assetLabels.map(asset => (
                            <MenuItem key={asset} value={asset}>{asset}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>     
                </div>
                <div>
                <Typography fontWeight={'medium'} color={'white'} fontSize={'small'} ml={3} align='left' variant='h4'>Category</Typography>
                    <FormControl
                        variant="outlined"
                        color="secondary"
                        sx={{
                        m: 0,
                        minWidth: 30,
                        borderRadius: "50px",
                        padding: "14px",
                        width: "200px",
                        marginBottom: "5%",
                        borderColor: "secondary.main",
                        "& label": {
                            color: "secondary.main"
                        },
                        "& fieldset": {
                            borderColor: "secondary.main"
                        }
                        }}
                        size="small"
                        > 
                        <Select sx={{borderRadius: '20px', width: 'fit-content'}} color='secondary' id="category" name="category" value={selectedBusinessCategoryLabel} onChange={handleBusinessCategoryChange} IconComponent={WhiteArrowIcon}>
                        <MenuItem value="all">All Categories</MenuItem>
                        {businessCategories.map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                        </Select> 
                    </FormControl>     
                </div>
                <div>
                <Typography fontWeight={'medium'} color={"white"} fontSize={'small'} ml={3} mb={2} align='left' variant='h4'>Chart Type</Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', overflow: 'auto', gap: '8px', marginTop: '1%', marginBottom: '4%', paddingLeft: '4%' }}>
                        {chartTypes.map(type => (
                        <Chip
                            key={type}
                            label={type.toString()}
                            style={{ fontWeight: 'bold', marginRight: '2%', marginBottom: '1%', marginTop: '2%' }}
                            onClick={() => handleChange(type)}
                            color={type === chartType ? 'secondary' : 'default'}
                            variant={type === chartType ? 'filled' : 'outlined'}
                        />
                        ))}
                    </div>    
                </div>
            </div>
        </div>
        <div>
            <HighchartsReact immutable={true} highcharts={Highcharts} options={combinedOptions} theme={highchartsTheme} />
        </div>
    </div>
  );
};

export default LineChart;