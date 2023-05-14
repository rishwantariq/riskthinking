import React, { useState, useEffect, useMemo, useRef } from 'react';
import Highcharts, { setOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ResponseData, RiskFactor } from '@/app/api/riskdata/route';
import { FormControl, Select, MenuItem, SelectChangeEvent, InputLabel, Typography, CircularProgress, Chip, useMediaQuery } from '@mui/material';
import ChevronDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import { highchartsTheme } from '../theme';
import MY_APP_BASE_URL from '../../../config';
import Cards from '../interactive-items/Cards';
import { riskFactorRating } from '../data-table/Datatable';
import { SortData } from '../chart/TopRiskCategories';
import TopRiskCategories from '../chart/TopRiskCategories';
import MiniChart from './MiniChart';


if (typeof Highcharts === 'object') {
  Highcharts.setOptions(highchartsTheme);
}

export function aggregateData(data: RiskFactor[] | null) {
  if (data && data?.length > 0) {
    const groupedData = data?.reduce((acc: { [key: string]: { riskSum: number, count: number } }, item) => {
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
      y: Number(Number((groupedData[year].riskSum / groupedData[year].count) * 100).toFixed(2)),
    }));
    return aggregate;
  }
  return [{ x: 0, y: 0 }];
}


const LineChart = (props: { showAll: boolean }) => {
  const [selectedAssetFilter, setSelectedAssetFilter] = useState('');
  const [selectedAssetLabel, setSelectedAssetLabel] = useState('none');
  const [selectedBusinessCategoryLabel, setSelectedBusinessCategoryLabel] = useState('all');
  const [selectedBusinessCategoryFilter, setSelectedBusinessCategoryFilter] = useState(encodeURIComponent('Business Category:Energy'));
  const [assetLabels, setAssetLabels] = useState(['']);
  const [data, setData] = useState<ResponseData>({ Data: [], hasNext: false, totalPages: 0, pageSize: 0 });
  const [totalPages, setTotalPages] = useState(0);
  const [sortedData, setSortedData] = useState<SortData[]>([]);
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
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const fetchPageData = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(`${MY_APP_BASE_URL}/api/riskdata?filter=${selectedBusinessCategoryFilter}|${selectedAssetFilter}`);
      const data: ResponseData = await res.json();
      if (data && data.Data && data.Data.length > 0) {
        setData(data);
        if (selectedAssetLabel == 'none' && selectedBusinessCategoryLabel == 'all') {
          //retain asset labels if we send an API call for asset
          setAssetLabels([...data.Data.map(item => item.assetName)].filter((value, index, self) => self.indexOf(value) === index));
        }
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
    const agg = aggregateData(data.Data);
    setAggregatedData(agg);
    const riskRating = riskFactorRating(data.Data);
    setSortedData(riskRating);
  }, [data]);

  const options = useMemo(() => {
    return {
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
      }
    };
  }, [aggregatedData, chartType]);



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
      <div style={{ display: props.showAll ? 'flex' : 'none', flexDirection: 'column', marginBottom:'6%', width: 'inherit' }}>
        <div style={{ marginBottom: '6%'}}>
          <TopRiskCategories />
        </div>
        <div>
          <Cards data={sortedData} subheading='Top Risk Factors' info='The top Risk Factors for the selected category.' />
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '6%', width: '100%', justifyContent: 'space-between', ...(isSmallScreen && { flexWrap: 'wrap', marginBottom: '2%' }) }}>
        <div style={{ flex: 1, margin: '0 2%', ...(isSmallScreen && { marginBottom: '30px' }) }}>
          <MiniChart data={data.Data} chartType={chartType} riskFactorName={sortedData[0]?.assetName} />
        </div>
        <div style={{ flex: 1, margin: '0 2%', ...(isSmallScreen && { marginBottom: '30px' }) }}>
          <MiniChart data={data.Data} chartType={chartType} riskFactorName={sortedData[1]?.assetName} />
        </div>
        <div style={{ flex: 1, margin: '0 2%', ...(isSmallScreen && { marginBottom: '30px' }) }}>
          <MiniChart data={data.Data} chartType={chartType} riskFactorName={sortedData[2]?.assetName} />
        </div>
      </div>
      <div style={{ background: '#222222', display: 'flex', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', justifyContent: 'space-between', width: '100%', border: '1px solid #404040', flexWrap: 'wrap', alignItems: 'center' }}>
        <img style={{ width: '250px', height: '120px', marginBottom: '2%' }} src="https://s12.gifyu.com/images/Riskthinking-color.png" alt="" />
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
              <Select sx={{ borderRadius: '20px', minWidth: '30px' }} color={"info"} id="category" name="category" value={selectedAssetLabel} onChange={handleAssetNameChange} IconComponent={WhiteArrowIcon}>
                <MenuItem value="none" style={{ marginRight: 'auto' }}>No Assets selected</MenuItem>
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
              <Select sx={{ borderRadius: '20px', width: 'fit-content' }} color='secondary' id="category" name="category" value={selectedBusinessCategoryLabel} onChange={handleBusinessCategoryChange} IconComponent={WhiteArrowIcon}>
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
                  style={{ fontWeight: 'bold', marginRight: '2%', marginBottom: '1%', marginTop: '2%', textTransform: 'capitalize' }}
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
        <HighchartsReact immutable={true} highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default LineChart;