'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { ResponseData } from '@/app/api/riskdata/route';
import { Chip, Typography, styled } from '@mui/material';
import ChevronDownIcon from '@mui/icons-material/ArrowDropDown';
import MY_APP_BASE_URL from '../../../config';
import Cards from '@/components/interactive-items/Cards';
import GoogleMaps from './GoogleMaps';

interface SortData {
  assetName: string;
  latitude: number;
  longitude: number;
  risk: number;
}
export interface MappedData {
  lat: number;
  long: number;
  name: string;
  riskRating: string;
  year: number;
  clusterPointsAmount: number;
  isCluster: boolean;
}

const MapChart = () => {
  //data fetching
  const [selectedDecadeFilter, setSelectedDecadeFilter] = useState('');
  const [selectedDecadeLabel, setSelectedDecadeLabel] = useState('all');
  const [data, setData] = useState<ResponseData>({ Data: [], hasNext: false, totalPages: 0, pageSize: 0 });
  const [loading, setLoading] = useState(false);
  const [sortedDataFiltered, setSortedDataFiltered] = useState<SortData[]>([]);
  const [mappedData, setMappedData] = useState<MappedData[]>([]);

  const years = [
    '2030',
    '2040',
    '2050',
    '2060',
    '2070'
  ];
  const fetchPageData = async () => {
    try {
        setLoading(true);
        const res = await fetch(`${MY_APP_BASE_URL}/api/riskdata?filter=${selectedDecadeFilter}`);
        const data: ResponseData = await res.json();
        setData(data);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
  };
  
  function aggregatedData() {
    if (data && data?.Data && data?.Data?.length > 0) {
        const groupedData: { [key: string]: { riskSum: number, count: number, lat: number, long: number, businessCategory: string, year: number } } = {};
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

        const mapped = aggregatedData.map(item => ({
          lat: item.lat,
          long: item.long,
          name: item.name,
          riskRating: Number(item.riskRating * 100).toFixed(3),
          year: item.year,
          clusterPointsAmount: Number((item.riskRating * 100).toFixed(0)),
          isCluster: true
        }));
        setMappedData(mapped);
        
        const sortedTopThree = mapped.sort((a, b) => Number(b.riskRating) - Number(a.riskRating))
        .splice(0, 3)
        .map(({ name, lat, long, riskRating }) => ({ assetName: name, latitude: lat, longitude: long, risk: Number(riskRating) }));
        setSortedDataFiltered(sortedTopThree);
      } 
  }
    

  useEffect(() => {
    fetchPageData();
  }, [selectedDecadeFilter]);

  useEffect(() => {
    aggregatedData();
  }, [data]);


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
    <div style={{ background: 'inherit', width: '100%' }}> 
        <div style={{ display: 'flex' , justifyContent: 'center', gap: '8%', marginBottom: '4%', flexWrap: 'wrap' }}>
          <Cards data={sortedDataFiltered} subheading='High Risk Assets' info='Data is aggregated for a given decade'/>
        </div>    
        <div style={{ background: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', border: '1px solid #404040', borderRadius: '20px'}}>
          <div style={{ width: '100%'}}>
            <div>
              <div style={{ background: '#222222', display: 'flex', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', justifyContent: 'space-between', width: '100%', border: '1px solid #404040', flexWrap: 'wrap' }}>
                <img style={{width: '250px', height: '120px', marginBottom: '2%'}} src="https://s12.gifyu.com/images/Riskthinking-color.png" alt="" />
              <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
                <div>
                  <Typography fontWeight={'bold'} color={'white'} fontSize={'small'} mt={3} ml={3} mb={1} align='left' variant='h4'>Select Year</Typography>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex', overflow: 'auto', gap: '8px', marginTop: '1%', marginBottom: '4%', paddingLeft: '4%' }}>
                    {years.map(year => (
                        <Chip
                          key={year}
                          label={year.toString()}
                          style={{ fontWeight: 'bold', marginRight: '2%', marginBottom: '1%', marginTop: '2%' }}
                          onClick={() => handleChange(year)}
                          color={year === selectedDecadeLabel ? 'secondary' : 'default'}
                          variant={year === selectedDecadeLabel ? 'filled' : 'outlined'}
                        />
                      ))}
                      <Chip
                      label="All Years"
                        onClick={() => handleChange('all')}
                        style={{ fontWeight: 'bold', marginRight: '2%', marginBottom: '1%', marginTop: '2%' }}
                        color={selectedDecadeLabel == 'all' ? 'secondary' : 'default'}
                        variant={selectedDecadeLabel == 'all'  ? 'filled' : 'outlined'}
                      />
                  </div>
                </div>
              </div>
            </div>
            <GoogleMaps mappedData={mappedData} />
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default MapChart;