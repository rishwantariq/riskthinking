'use client';
import Box from '@mui/material/Box';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useRef } from 'react';
import { Typography } from '@mui/material';
import LineChart from '@/components/Charts/linechart';
import MapChart from '@/components/Charts/maps/map';
export default function Page() {
    return (
        <>
            <Box sx={{ background: 'black', marginTop: '4%', textAlign: 'center', maxWidth: 'screen', paddingTop: '5px', paddingLeft: '10px', paddingRight: '10px', marginLeft: '10px', marginRight: '10px', marginBottom: '20px', borderRadius: '20px' }}>
                <div style={{height: 'screen', marginTop: '-1%', marginBottom: '1%' }}>
                    <LineChart />
                </div>
            </Box>
        </>
    );
}