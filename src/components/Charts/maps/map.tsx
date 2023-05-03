'use client'
import React, { useState, useEffect, useMemo } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import topology from '@/components/Charts/maps/topology.json';
import highchartsMap from 'highcharts/modules/map';
import { ResponseData } from '@/app/api/riskdata/route';
import { Chip, Typography, styled } from '@mui/material';
import { FormControl, Select, MenuItem } from '@mui/material';
import ChevronDownIcon from '@mui/icons-material/ArrowDropDown';
import MY_APP_BASE_URL from '../../../../config';
import Cards from '@/components/cards';


if (typeof Highcharts === 'object') {
  highchartsMap(Highcharts); // initialize the highchartsMap module
}
const MapChart = () => {
  //data fetching
  const [selectedDecadeFilter, setSelectedDecadeFilter] = useState('');
  const [selectedDecadeLabel, setSelectedDecadeLabel] = useState('all');
  const [data, setData] = useState<ResponseData>({ Data: [], hasNext: false, totalPages: 0, pageSize: 0 });
  const [loading, setLoading] = useState(false);

  const years = [
    '2030',
    '2040',
    '2050',
    '2060',
    '2070'
  ];
  const fetchPageData = async () => {
    try {
      console.log('api call');

      setLoading(true);
      const res = await fetch(`${MY_APP_BASE_URL}/api/riskdata?filter=${selectedDecadeFilter}`);
      const data: ResponseData = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  
    const groupedData: {[key: string]: {riskSum: number, count: number, lat: number, long: number, businessCategory: string, year: number}} = {};
    data.Data.forEach(item => {
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
        riskRating: (groupedData[item].riskSum / groupedData[item].count),
        lat: groupedData[item].lat,
        long: groupedData[item].long,
        businessCategory: groupedData[item].businessCategory,
        year: groupedData[item].year,
  }));

  
  const mappedData = aggregatedData.map(item => ({
    lat: item.lat,
    long: item.long,
    name: item.name,
    riskRating: Number(item.riskRating * 100).toFixed(3),
    year: item.year,
    clusterPointsAmount: Number((item.riskRating * 100).toFixed(0)),
    isCluster: true
  }));
  
  const sortedTopThree = mappedData.sort((a, b) => Number(b.riskRating) - Number(a.riskRating))
  .splice(0, 3)
  .map(({ name, lat, long, riskRating }) => ({ assetName: name, latitude: lat, longitude: long, risk: Number(riskRating) }));


  const memoizedPageData = useMemo(() => {
    return fetchPageData();
  }, [selectedDecadeFilter]);
  
  useEffect(() => {
    // Use memoizedPageData in your Highcharts map here
  }, [memoizedPageData]);

  //initiqlize the map module
  // Define the options

  const options = {
    
    chart: {
      map: topology,
      height: 600, // set the height to 600 pixels
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
      text: '',
      align: 'center',
      style: {
      },
      useHTML: true
    },
    subtitle: {
      text: '',
      align: 'center',
      style: {
      },
      useHTML: true
    },
    mapNavigation: {
      enabled: true,
    },
    tooltip: {
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        const point = this.point as Highcharts.Point & { riskRating: number, lon: number, lat: number, name: String};

        return `<div>
                  <Typography variant="h6" style="margin-bottom: 5px;"><b>${point.name}</b></Typography></br>
                  <Typography style="margin-bottom: 5px;">Lat: ${point.lat.toFixed(2)}</Typography>
                  <Typography style="margin-bottom: 5px;">Lon: ${point.lon.toFixed(2)}</Typography></br>
                  <Typography><b>${point.riskRating}%</b></Typography>
                </div>`;
      },
    },
    
    colorAxis: {
      min: 0,
      max: 100,
      labels: {
        format: '{value}%'
      },
      stops: [
        [0, '#BDE7BD'],
        [60, '#FF6961'],
        [100, '#FF6961'],
      ],
      showInLegend: true // Add this option to show labels and values
    },
    plotOptions: {
      series: {
          cluster: {
              enabled: true,
              allowOverlap: false,
              layoutAlgorithm: {
                  type: 'grid',
                  gridSize: 50
              },
              marker: {
                  fillColor: '#F00'
              }
          }
      }
    },
    series: [
      {
        name: 'Map',
        accessibility: {
          exposeAsGroupOnly: true,
        },
        borderColor: '#A0A0A0',
        nullColor: 'rgba(177, 244, 177, 0.5)',
        showInLegend: true,
      },
      {
        type: 'mappoint',
        enableMouseTracking: true,
        accessibility: {

        },
        colorKey: 'clusterPointsAmount',
        name: 'Areas',
        keys: ['name', 'lat', 'lon', 'riskRating'],
        data: mappedData.map((area) => ({
          name: area.name,
          lat: Number(area.lat),
          lon: Number(area.long),
          riskRating: area.riskRating,
          clusterPointsAmount: area.clusterPointsAmount,
          isCluster: true
        })),
        marker: {
            lineWidth: 1,
            lineColor: '#fff',
            symbol: 'mapmarker',
            radius: 8
        },
        dataLabels: {
            verticalAlign: 'top'
        }
      },
    ],
  };

  const handleChange = (e: String) => {
    if (e === 'all') {
      setSelectedDecadeFilter('');
      setSelectedDecadeLabel('all');
    }
    else {
      setSelectedDecadeFilter(encodeURIComponent(`Year:${e}`));
      setSelectedDecadeLabel(e.toString());
    }
    
  };
  const WhiteArrowIcon = styled(ChevronDownIcon)({
    color: 'white',
    fill: 'white'
  });

  return (
    <div style={{ background: 'black', width: '100%' }}> 
        <div style={{ display: 'flex' , justifyContent: 'center', gap: '8%', marginBottom: '4%', flexWrap: 'wrap' }}>
          <Cards data={sortedTopThree} subheading='High Risk Assets' info='Data is aggregated for a given decade'/>
        </div>    
      <div style={{ background: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor: 'secondary', width: '100%'}}>
        <div style={{ width: '100%' }}>
            <div>
              <div style={{ background: '#242F39', display: 'flex', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', justifyContent: 'space-between', width: '100%', border: '1px solid #495262', flexWrap: 'wrap' }}>
                <img style={{width: '250px', height: '120px', marginBottom: '2%'}} src="https://imgtr.ee/images/2023/04/27/JMcWb.png" alt="" />
              <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap-reverse', justifyContent: 'justify-between', overflow: 'auto', width: 'fit-content', gap: '8px', marginTop: '10%', marginRight: '20px', marginBottom: '4%', marginLeft: '4%' }}>
                      {years.map(year => (
                        <Chip
                          key={year}
                          label={year.toString()}
                          style={{ fontWeight: 'bold', marginLeft: '2%', marginTop: '1%' }}
                          onClick={() => handleChange(year)}
                          color={year === selectedDecadeLabel ? 'secondary' : 'default'}
                          variant={year === selectedDecadeLabel ? 'filled' : 'outlined'}
                        />
                      ))}
                      <Chip
                      label="All Years"
                        
                        onClick={() => handleChange('all')}
                      style={{ fontWeight: 'bold', marginTop: '0%'}}
                        color={selectedDecadeLabel == 'all' ? 'secondary' : 'default'}
                        variant={selectedDecadeLabel == 'all'  ? 'filled' : 'outlined'}
                      />
                    </div>
                  </div>
              </div>
            </div>
            <HighchartsReact immutable={true} highcharts={Highcharts} options={options} constructorType={'mapChart'} />
          </div>
        </div>
      </div>
    </div>
    );
};
  
export default MapChart;