'use client';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import { Divider, Typography, useMediaQuery } from '@mui/material';
import ShortBanner from '@/components/banners/ShortBanner';
import Process from '@/components/interactive-items/Process';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useInView } from 'react-intersection-observer';
import LineChart from '@/components/chart/LineChart';
import ChartsHero from '@/components/chart/ChartsHero';
import { PageWrapper } from '@/components/PageWrapper';
import { motion } from "framer-motion";

export default function Page() {
    const chartsRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const { ref, inView } = useInView();



    const gridData = [
        {
          icon: <InsertChartIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Multiple Charts',
          subtitle: 'Want to visualize data in the way you want? Choose from upto 5 chart types.',
        },
        {
          icon: <DateRangeIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Change Catgories',
          subtitle: 'Show data for different categories, and their assets, for 5+ decades.',
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
        <PageWrapper>
            <div style={{ background: 'black', width: 'screen' }}>
                <ChartsHero targetRef={chartsRef} />
                <Box sx={{ background: 'black', marginTop: '4%', textAlign: 'center', maxWidth: 'screen', paddingTop: '5px', heght: 'auto', overflow: 'none'}}>
                    <div style={{ display: "flex", flexDirection: "column", background: "#ad96af", marginBottom: "5%" }}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left", position: "relative" }}>
                            <div style={{ display: "flex", flexDirection: "column", width: "50%", maxWidth: "500px", padding: "20px" }}>
                            <Typography align="left" variant="h1" fontWeight={"bold"} color={"black"}>
                                Data-Driven. Stochastic. Aggregated. For All Categories.
                            </Typography>
                            <Typography align="left" mt={2} variant="h4" fontSize={"1rem"} fontWeight={"medium"} color={"black"}>
                                All the important projections, organized by their category for 5+ decades.
                            </Typography>
                            </div>
                            {isSmallScreen ? null : (
                                <img
                                src="https://imgtr.ee/images/2023/05/04/apmEz.png"                               
                                alt=""
                                style={{
                                 position: "relative",
                                 width: "600px",
                                 height: "auto",
                                 top: "-70px",
                                 display: "block",
                                 marginLeft: "auto",
                                 marginBottom: '-15%'
                               }}
                                />  
                            )}
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '1%', gap: '20px' }}>
                            <Typography mb={5} color={"white"} variant='h1'>Usage</Typography>

                            <div style={{ marginTop: '1%', marginBottom: '2%'}}>
                                <Process />
                            </div>
                            <div style={{ marginTop: '1%', marginBottom: '2%'}}>
                                <ShortBanner gridData={gridData} />       
                            </div>
                        </div>   
                    </div>
                    <Divider style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto', background: '#404040', marginTop: '5%', marginBottom: '5%' }} />
                    <div ref={chartsRef}>
                        <motion.div
                            ref={ref}
                            style={{ background: 'black', padding: '1rem' }}
                            initial={{ y: "200px" }}
                            animate={{ y: inView ? 0 : "200px", opacity: inView ? 1 : 0 }}
                            exit={{ y: "200px", opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 80,
                                damping: 20,
                                duration: 0.5,
                            }}
                            >    
                            <Typography color={"white"} mb={'1%'} variant='h1'>Risk Chart</Typography>
                            <Typography color={'white'} mb={'5%'} fontWeight={'regular'} variant='h4'>Powered by Highcharts</Typography>
                            <LineChart />
                        </motion.div>
                    </div>    
                </Box>
            </div>
        </PageWrapper>
        </>
    );
}
