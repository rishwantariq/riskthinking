import React, { useState, useEffect, useMemo, useRef } from 'react';
import Highcharts, { setOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { NaturalRiskFactors, ResponseData, RiskFactor } from '@/app/api/riskdata/route';
import { FormControl, Select, MenuItem, SelectChangeEvent, InputLabel, Typography, CircularProgress, Chip } from '@mui/material';
import ChevronDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import { highchartsTheme } from '../theme';

//computes individual risk factors risk rating based on the passed name
function aggregateData(data: RiskFactor[] | null, riskFactorName: string) {
    if (data && data?.length > 0) {
      const groupedData = data?.reduce(
        (
          acc: { [key: string]: { riskSum: number; count: number } },
          item: RiskFactor
        ) => {
          if (!acc[item.year]) {
            acc[item.year] = {
              riskSum: 0,
              count: 0,
            };
          }
          const riskFactorValue = Object.keys(item.riskFactors).includes(riskFactorName) ? item.riskFactors[riskFactorName] : 0;
          acc[item.year].riskSum += riskFactorValue;
          acc[item.year].count++;

          return acc;
        },
        {}
      );
      const aggregate = Object.keys(groupedData).map((year) => ({
        x: parseInt(year),
        y: Number(Number((groupedData[year].riskSum / groupedData[year].count) * 100).toFixed(2)),
      }));
      return aggregate;
    }
    return [{ x: 0, y: 0 }];
  }
  
  
  

  
const MiniChart = (props: { data: RiskFactor[], chartType: string, riskFactorName: string }) => {
      
    const { data, chartType, riskFactorName } = props;
    const [aggregatedData, setAggregatedData] = useState([{
        x: 0,
        y: 0
    }])
    const capitalizeFirstLetter = (str : string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    useEffect(() => {
        const riskFactorRating = aggregateData(data, riskFactorName);
        setAggregatedData(riskFactorRating);
    }, [data, riskFactorName]);

    const options = useMemo(() => {
        return {
          chart: {
            type: `${chartType}`
          },
          title: {
            text: riskFactorName ? (
              riskFactorName === 'sealevelrise' ? 'Sea Level Rise' :
              riskFactorName === 'extremeheat' ? 'Extreme Heat' :
              riskFactorName === 'extremecold' ? 'Extreme Cold' :
              capitalizeFirstLetter(riskFactorName)
            ) : '',
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
        };
    }, [aggregatedData, chartType, riskFactorName]);



    return (
        <div style={{background: '#222222', paddingTop: '20px', border: '1px solid #363636', borderRadius: '20px'}}>
            <HighchartsReact immutable={true} highcharts={Highcharts} options={options} />
        </div>
    );
}

export default MiniChart;