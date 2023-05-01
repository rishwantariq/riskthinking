'use client';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import { Divider, Typography } from '@mui/material';
import MapChart from '@/components/Charts/maps/map';
import MapsHero from '@/components/Charts/mapsHero';
import ColorPalette from '@/components/pallette';
import ShortBanner from '@/components/shortBanner';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import RoomIcon from '@mui/icons-material/Room';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';

export default function Page() {
    const mapsRef = useRef<HTMLDivElement>(null);
    const gridData = [
        {
          icon: <PanToolAltIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Zoom & Pan',
          subtitle: 'The RiskView map allows you to freely move and pan across the areas.',
        },
        {
          icon: <RoomIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Risk Markers',
          subtitle: 'Identify the areas using risk markers. Double tap marker to zoom and show details.',
        },
        {
          icon: <LegendToggleIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Visual Indicator',
          subtitle: 'Color coded Legend. Each marker will correspond to the risk value in the legend.',
        },
        // Add more objects for additional grid items
    ];

    return (
        <>
            <Box sx={{ background: 'black', textAlign: 'center', maxWidth: 'screen', height: 'screen',  paddingTop: '5px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '100%' }}>
                        <MapsHero targetRef={mapsRef} />
                        <Divider style={{ width:'1000px', marginLeft: 'auto', marginRight: 'auto', background: 'gray', marginTop: '2%', marginBottom: '2%'}}/>
                        <Typography variant='h1'>Usage</Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '5%', gap: '20px' }}>
                            <ShortBanner gridData={gridData} />
                            <div style={{ marginTop: '5%' }}>
                                <Typography mb={'2%'} variant='h3'>Key</Typography>
                                <ColorPalette />
                            </div>
                        </div>
                    </div>
                    <Divider style={{ width:'1000px', marginLeft: 'auto', marginRight: 'auto', background: 'gray', marginTop: '2%', marginBottom: '2%'}}/>
                    <Typography mb={'1%'} variant='h1'>Risk Map</Typography>
                    <Typography mb={'5%'} fontWeight={'regular'} variant='h4'>Powered by Highcharts</Typography>

                    <div style={{ display: 'flex' }}>
                    </div>
                    <div ref={mapsRef} style={{ paddingLeft: '20px', paddingRight: '20px', marginLeft: '60px', marginRight: '60px'}}>
                        <MapChart />
                    </div>
                </div>
            </Box>

        </>
    );
}
