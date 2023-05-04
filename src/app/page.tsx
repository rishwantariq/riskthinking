'use client';
import Box from '@mui/material/Box';
import Banner from '@/components/banner';
import ShortBanner from '@/components/shortBanner';
import Ticker from '@/components/Ticker';
import { Typography, Divider, Button, useMediaQuery, Accordion, AccordionSummary, AccordionDetails, Grid, } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionComponent from '@/components/accordion';

export default function Home() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const gridData: { icon: JSX.Element, title: string, subtitle: string }[] = [
    {
      icon: <TrendingUpIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
      title: 'Risk Factors',
      subtitle: 'Evaluate how various climate factors can impact financial decisions in your geographical location.',
    },
    {
      icon: <AnalyticsIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
      title: 'Data Visualization',
      subtitle: 'Visualize and explore historical climate data for any location in the world.',
    },
    {
      icon: <CategoryIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
      title: 'Data Visualization',
      subtitle: 'Visualize and explore historical climate data for any location in the world.',
    },
    // Add more objects for additional grid items
  ];
  
  return (
    <>
     <Box sx={{ background: 'black', textAlign: 'center', maxWidth: '100vw', overflow: 'hidden' }}>
        <div style={{ position: 'relative' }}>
          <Banner />
        </div>
        <Typography fontWeight='bold' variant="h1" color={'text'} mt={'5%'} mb={'5%'}>How is Climate Risk Measured?</Typography>
        <Grid container spacing={4} alignItems="start">
          <Grid item xs={12} md={6}>
            <img src="https://imgtr.ee/images/2023/05/04/aa4Pz.png" alt="" style={{ width: '80%' }} />
          </Grid>
          <Grid color={'white'} item xs={12} md={5}>
            <Box display="flex" flexDirection="column" justifyContent={'start'} flexWrap={'wrap'} mr={3} ml={3} width={'80%'}>
              <AccordionComponent title="Overview" content="Millions of data points aggregate to provide insights into potential financial impacts due to physical climate risks, between now and 2070." />
              <AccordionComponent title="Direct/Indirect" content="Direct and Indirect Analysis of how natural climate risk factors impact business assets" />
              <AccordionComponent title="Geographic Analysis" content="Provides insights into the geographic distribution and concentration of a company’s (Assets) exposure to physical climate risks." />
              <AccordionComponent title="Hazard Analysis" content="Estimations of the future probability (Risk Rating) and severity of Natural Risk Factors by decade" />
              <AccordionComponent title="Metric Analysis" content="Metrics are aggregated to represent data in visual form." />
              <AccordionComponent title="Facility Analysis" content="Data Categorized by geo-spatial analysis at the individual asset level." />
            </Box>
          </Grid>
        </Grid>



        <div style={{display: "flex", flexDirection: "column", background: "#fff5ba", marginBottom: "5%", marginTop: '15%' }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left", position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "50%", maxWidth: "500px", padding: "20px" }}>
                <Typography align="left" variant="h1" fontWeight={"bold"} color={"black"}>
                    Predict The Future. Assess Climate Risks Through Visualizations.
                </Typography>
                <Typography align="left" mt={2} variant="h4" fontSize={"1rem"} fontWeight={"medium"} color={"black"}>
                    Identify all the risk areas, at a glance.
                </Typography>
              </div>
              {isSmallScreen ? null : (
                  <img
                  src="https://imgtr.ee/images/2023/05/03/a9VkL.png"
                  alt=""
                  style={{
                    position: "relative",
                    width: "700px",
                    height: "auto",
                    top: "-250px",
                    display: "block",
                    marginLeft: "auto",
                    marginBottom: '-15%'
                  }}
                  />                            
                )}
          </div>
        </div>
        <div  style={{ position: 'relative', background: 'black', marginBottom: '10%' }}>
          <Typography fontWeight='bold' variant="h1" color={'text'} mb={2}>Top Metrics</Typography>
          <ShortBanner gridData={gridData} />
        </div>
        <div style={{ background: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', placeItems: 'center', marginBottom: '5%' }}>
          <Link href="https://github.com/RiskThinking/work-samples/blob/main/UI-UX-Developer.md" target="_blank" >
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<ChevronRightIcon />}
              style={{
                borderRadius: "50px",
                padding: "14px 40px",
                width: '100%',
                marginBottom: '5%'
              }}>
              View Guidelines
            </Button>
          </Link>
        </div>
      </Box>
    </>
);
}


