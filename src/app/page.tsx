'use client';
import Box from '@mui/material/Box';
import Banner from '@/components/banners/Banner';
import ShortBanner from '@/components/banners/ShortBanner';
import { Typography, Divider, Button, useMediaQuery, Grid, Skeleton, } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import CustomizedAccordions from '@/components/interactive-items/Accordion';
import { PageWrapper } from '@/components/PageWrapper';

export default function Home() {
    const isSmallScreen = useMediaQuery("(max-width:600px)");
   
  const gridData: { icon: JSX.Element, title: string, subtitle: string }[] = [
    {
      icon: <TrendingUpIcon color="info" style={{ fontSize: '5rem', marginBottom: 5 }} />,
      title: 'Risk Factors',
      subtitle: 'Evaluate how various climate factors can impact financial decisions in your geographical location.',
    },
    {
      icon: <AnalyticsIcon color="info" style={{ fontSize: '5rem', marginBottom: 5 }} />,
      title: 'Regional Risk Ratings',
      subtitle: 'Visualize and explore historical climate data for any location or asset in the world.',
    },
    {
      icon: <CategoryIcon color="info" style={{ fontSize: '5rem', marginBottom: 5 }} />,
      title: 'Category Risk Ratings',
      subtitle: 'Risk Ratings of how a given cateogry is effected by natural climate risk factors.',
    },
    // Add more objects for additional grid items
  ];
  const accordionData = [
    {
      title: "Overview",
      content: "Data points aggregated to provide insights into potential financial impacts due to physical climate risks, between now and 2070."
    },
    {
      title: "Direct/Indirect",
      content: "Direct and Indirect Analysis of how natural climate risk factors impact business assets"
    },
    {
      title: "Geographic Analysis",
      content: "Provides insights into the geographic distribution and concentration of a company’s (Assets) exposure to physical climate risks."
    },
    {
      title: "Hazard Analysis",
      content: "Estimations of the future probability (Risk Rating) and severity of Natural Risk Factors by decade"
    },
    {
      title: "Metric Analysis",
      content: "Metrics are combined by aggregation techniques to represent data in visual form."
    }
  ];
  
  
  return (
    
 <>
  <PageWrapper>
    <div>
      <Box sx={{ background: 'black', textAlign: 'center', maxWidth: '100vw', overflow: 'hidden' }}>
          <Banner />              
        <div style={{display: "flex", flexDirection: "column", background: "#d2e9e1", marginBottom: "5%" }}>
          <div style={{display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", justifyContent: "space-between", marginLeft: '5%', marginRight: '5%', position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", width: isSmallScreen ? "100%": "50%", maxWidth: "600px", padding: "20px" }}>
              <Typography align="left" variant="h1" fontSize={isSmallScreen ? '3rem' : '4rem'} fontWeight={"bold"} color={"black"}>
               Unlock the Power of Climate Risk: Learn How Its Computed and Utilized.</Typography>
              <Typography align="left" mt={2} variant="h4" fontSize={"1rem"} fontWeight={"medium"} color={"black"}>
                Understanding the Process Behind Calculating Climate Risk and Its Impact on Businesses
              </Typography>
            </div>
            <div style={{width: isSmallScreen ? "100%" : '40%', height: '500px', color: 'white', overflow: 'auto' }}>
              <Box display="flex" flexDirection="column" mt={'16%'} justifyContent="start" flexWrap="wrap"  width={'100%'}>
                <CustomizedAccordions data={accordionData} />
              </Box>
            </div>
          </div>
        </div>
        <div  style={{ position: 'relative', background: 'black', marginBottom: '5%' }}>
          <Typography fontWeight='bold' variant="h1" color={'white'} mb={15}>Top Metrics</Typography>
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
                marginBottom: '5%',
              }}>
              View Guidelines
            </Button>
          </Link>
          </div>
          <div style={{display: "flex", flexDirection: "column", background: "#f6eac2", marginBottom: "5%", marginTop: '5%' }}>
            <div style={{display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", justifyContent: isSmallScreen ? "start": "space-between", marginLeft: '5%', marginRight: '5%', position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", width: isSmallScreen ? "100%" : "50%", maxWidth: "600px", padding: "20px", marginBottom: '2%' }}>
                <Typography align="left" variant="h2" fontWeight={"bold"} color={"black"}>
                Transforming the Way Businesses Assess Climate Financial Risk. </Typography>
                <Typography align="left" mt={2} variant="h4" fontSize={"1rem"} fontWeight={"medium"} color={"black"}>
                  Projecting Data to Over 5+ Decades to Make Your Investments Safe.
                </Typography>
              </div>
              <div style={{ width: isSmallScreen ? "100%" : '40%', height: '100%', color: 'white', overflow: 'auto' }}>
                <Box mt={'auto'} mb={'auto'} height={'100%'} display="flex" justifyContent="center">
                  <Link href="https://riskthinking.ai" target="_blank">
                    <Button
                      variant="contained"
                      color={"success"}
                      endIcon={<ChevronRightIcon />}
                      style={{
                        borderRadius: "50px",
                        padding: "14px 40px",
                        width: '100%',
                        marginBottom: '5%',
                        color: "white",
                      }}>
                      Learn More
                    </Button>
                  </Link>
                </Box>
              </div>
            </div>
          </div>
      </Box>
    </div>
  </PageWrapper>
</>
);
}


