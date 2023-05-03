'use client';
import Box from '@mui/material/Box';
import LineChart from '@/components/Charts/linechart';
import ChartsHero from '@/components/Charts/chartshero';
import { useRef } from 'react';
import { Divider, Typography, useMediaQuery } from '@mui/material';
import ShortBanner from '@/components/shortBanner';
import ColorPalette from '@/components/pallette';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import InfoIcon from '@mui/icons-material/Info';

export default function Page() {
    const chartsRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const { ref, inView } = useInView();

    const spring = useSpring({
      opacity: inView ? 1 : 0,
      from: { opacity: 0 },
      config: { duration: 1000 },
    });

    const gridData = [
        {
          icon: <InsertChartIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Multiple Charts',
          subtitle: 'The SectorWatch chart allows you to take a glance at 2 maps.',
        },
        {
          icon: <DateRangeIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Change Decades',
          subtitle: 'Show data for different decades, made to visualize easier.',
        },
        {
          icon: <LegendToggleIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Hover & Tooltip',
          subtitle: 'Tooltip to view precise values, hover across the trend-line.',
        },
        // Add more objects for additional grid items
    ];

    return (
        <>
        <div style={{ background: 'black', width: 'screen' }}>
            <ChartsHero targetRef={chartsRef} />
                <Box sx={{ background: 'black', marginTop: '4%', textAlign: 'center', maxWidth: 'screen', paddingTop: '5px', heght: 'auto'}}>
                    <div style={{ display: "flex", flexDirection: "column", background: "#ad96af", marginBottom: "5%" }}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left", position: "relative" }}>
                            <div style={{ display: "flex", flexDirection: "column", width: "50%", maxWidth: "500px", padding: "20px" }}>
                            <Typography align="left" variant="h1" fontWeight={"bold"} color={"black"}>
                                Data-Driven. Stochastic. Aggregated. All together.
                            </Typography>
                            <Typography align="left" mt={2} variant="h4" fontSize={"1rem"} fontWeight={"medium"} color={"black"}>
                                All the important data and tools you need, in one chart now.
                            </Typography>
                            </div>
                            {isSmallScreen ? null : (
                                <img
                                src="https://imgtr.ee/images/2023/05/02/Jig6i.png"                               
                                alt=""
                               style={{
                                 position: "relative",
                                 width: "600px",
                                 height: "auto",
                                 top: "-200px",
                                 display: "block",
                                 marginLeft: "auto",
                                 marginBottom: '-15%'
                               }}
                                />  
                            )}
                        </div>
                    </div>
                    <div>
                        <Typography variant='h1'>Usage</Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '5%', gap: '20px' }}>
                            <div style={{ marginTop: '0%', marginBottom: '5%' }}>
                                <ColorPalette />
                            </div>
                            <ShortBanner gridData={gridData} />
                        </div>   
                    </div>
                    <Divider style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto', background: 'gray', marginTop: '2%', marginBottom: '4%' }} />
                    <div ref={ref} style={{ background: 'black', marginBottom: '2%', padding: '1rem'}}>    
                        <Typography mb={'1%'} variant='h1'>Risk Chart</Typography>
                        <Typography mb={'5%'} fontWeight={'regular'} variant='h4'>Powered by Highcharts</Typography>
                        <animated.div ref={chartsRef} style={{ paddingLeft: '20px', paddingRight: '20px', marginLeft: '40px', marginRight: '40px', ...spring }}>
                        <   div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginBottom: '4%'}}>
                                <InfoIcon />
                                <Typography align='center' variant='h4' fontWeight={'medium'}>Data is the average of 2000 random entries</Typography>
                            </div>
                            <LineChart />
                        </animated.div >
                    </div>
            </Box>
        </div>
        </>
    );
}
