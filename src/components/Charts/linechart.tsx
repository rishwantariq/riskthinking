import React, { useState, useEffect } from 'react';
import Highcharts, { setOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ResponseData } from '@/app/api/riskdata/route';
import { FormControl, Select, MenuItem, SelectChangeEvent, InputLabel, Typography } from '@mui/material';
import ChevronDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import { highchartsTheme } from './theme';
import MY_APP_BASE_URL from '../../../config';
import Cards from '../cards';

const LineChart = () => {
    const [selectedAssetFilter, setSelectedAssetFilter] = useState('');
    const [selectedAssetLabel, setSelectedAssetLabel] = useState('none');
    const [selectedBusinessCategoryLabel, setSelectedBusinessCategoryLabel] = useState('Energy');
    const [selectedBusinessCategoryFilter, setSelectedBusinessCategoryFilter] = useState('');
    const [assetLabels, setAssetLabels] = useState(['']);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [data, setData] = useState<ResponseData>({ Data: [], hasNext: false, totalPages: 0, pageSize: 0 });
    const [cardData, setCardData] = useState([{ assetName: '', latitude: 0, longitude: 0, risk: 0}]);
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
    const fetchPageDataAll = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${MY_APP_BASE_URL}/api/riskdata?page=1&pagesize=2000`);
            const items: ResponseData = await res.json();
            const groupedData: {[key: string]: {riskSum: number, count: number, lat: number, long: number, businessCategory: string, year: number}} = {};
            items.Data.forEach(item => {
            if (!groupedData[item.assetName]) {
                groupedData[item.assetName] = {
                    riskSum: 0,
                    lat: item.lat,
                    long: item.long,
                    businessCategory: item.businessCategory,
                    year: item.year,
                    count: 0
                };
                }
                groupedData[item.assetName].riskSum += item.riskRating;
                groupedData[item.assetName].count++;
            });
            const aggregatedData = Object.keys(groupedData).map(item => ({
                name: item,
                riskRating: ((groupedData[item].riskSum / groupedData[item].count)*100),
                businessCategory: groupedData[item].businessCategory,
                year: groupedData[item].year,
            }));
            const sortedTopThree = aggregatedData.sort((a, b) => Number(b.riskRating) - Number(a.riskRating))
            .splice(0, 3)
            .map(({ businessCategory, riskRating, year, name }) => ({ assetName: businessCategory, latitude: 0, longitude: 0, risk: riskRating}));
            setCardData(sortedTopThree);
                
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {         
        fetchPageData(paginationModel.page);
    }, [paginationModel.page, paginationModel.pageSize, selectedAssetFilter, selectedBusinessCategoryFilter]);

    useEffect(() => {
        fetchPageDataAll();
    }, []);

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
            events: {
                load(this: Highcharts.Chart): void {
                  if (loading) {
                    this.showLoading();
                  } else {
                    this.hideLoading();
                  }
                }
            },
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
        <div style={{marginBottom: '4%'}}>
            <Cards data={cardData} />   
        </div>  
        <div style={{ background: '#242F39', display: 'flex', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', justifyContent: 'space-between', width: '100%', border: '1px solid #495262', flexWrap: 'wrap' }}>
            <img style={{ width: '250px', height: '120px', marginBottom: '2%' }} src="https://imgtr.ee/images/2023/04/27/JMcWb.png" alt="" />
                <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', overflow: 'auto' }}>
                    <div>
                        <FormControl
                            variant="outlined"
                            color="secondary"
                            sx={{
                            m: 0,
                            minWidth: 20,
                            borderRadius: "50px",
                            padding: "14px",
                            width: "200px",
                            marginBottom: "5%",
                            maringRight: '-40px',
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
                            <Typography fontWeight={'medium'} align='center' mb={3} variant='h4'></Typography>
                            <Select sx={{borderRadius: '20px'}} color='secondary' id="category" name="category" value={selectedAssetLabel} onChange={handleAssetNameChange} IconComponent={WhiteArrowIcon}>
                                <MenuItem value="none">No Assets selected</MenuItem>
                                {assetLabels.map(asset => (
                                <MenuItem key={asset} value={asset}>{asset}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl
                        variant="outlined"
                        color="secondary"
                        sx={{
                            m: 0,
                            minWidth: 20,
                            borderRadius: "50px",
                            padding: "14px 40px",
                            width: "200px",
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
                            <Typography fontWeight={'medium'} align='center' mb={3} variant='h4'></Typography>
                            <Select sx={{borderRadius: '20px'}} color='secondary' id="category" name="category" value={selectedBusinessCategoryLabel} onChange={handleBusinessCategoryChange} IconComponent={WhiteArrowIcon}>
                                <MenuItem value="all">All Categories</MenuItem>
                                {businessCategories.map(category => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                                ))}
                            </Select> 
                        </FormControl>
                     </div>
                </div>
            </div>
        <HighchartsReact highcharts={Highcharts} options={options} theme={highchartsTheme} />
        <HighchartsReact
            highcharts={Highcharts}
            options={{ ...options, chart: { type: 'bar' } }}
            theme={highchartsTheme}
        />
    </div>
  );
};

export default LineChart;
