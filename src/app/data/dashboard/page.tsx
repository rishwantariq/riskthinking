'use client';
import { useRef } from 'react';
import { Divider, Typography, useMediaQuery, Box, CardContent, Card, Grid } from '@mui/material';
import ShortBanner from '@/components/banners/ShortBanner';
import Process from '@/components/interactive-items/Process';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useInView } from 'react-intersection-observer';
import LineChart from '@/components/chart/LineChart';
import { PageWrapper } from '@/components/PageWrapper';
import { motion } from "framer-motion";
import { Datatable } from '@/components/data-table/Datatable';
import MapChart from '@/components/map/Map';
import TopRiskCategories from '@/components/chart/TopRiskCategories';

export default function Page() {

    return (
     <PageWrapper>
        <Box sx={{transform: 'scale(0.98)'}} mt={5}>
            <motion.div
                style={{
                    background: '#272727',
                    padding: '2rem',
                    borderRadius: '20px',
                    border: '1px solid #363636',
                    overflow: 'hidden',
                    marginBottom: '2%'
                }}
                initial={{ y: '200px' }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '200px', opacity: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 80,
                    damping: 20,
                    duration: 0.5,
                }}
            >
                <Box mb={10}>
                    <Typography color="white" variant="h1" align="center" gutterBottom>
                        Good Morning
                    </Typography>
                    <Typography color="white" fontWeight={'regular'} variant="h4" align="center" gutterBottom>
                        Visualize Climate Data and Risks at a Glance
                    </Typography>
                    <Divider style={{ background: '#464646', margin: '3% auto', width: '50%' }} />
                </Box>
                <Grid overflow={'hidden'} container spacing={3} justifyContent="center">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <LineChart showAll={false} />
                            <div style={{ height: '600px', marginTop: '2%'}}>
                                <Datatable showAll={false} />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <MapChart />
                            <div style={{marginTop: '2%'}}>
                            <TopRiskCategories />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </motion.div>
            </Box>
        </PageWrapper>
    );
}
