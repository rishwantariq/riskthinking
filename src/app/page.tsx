'use client';
import Box from '@mui/material/Box';
import Banner from '@/components/banner';
import ShortBanner from '@/components/shortBanner';
import Ticker from '@/components/Ticker';
import { Typography, Divider, Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';

export default function Home() {
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
     <Box sx={{ textAlign: 'center', maxWidth: '100vw', overflow: 'hidden' }}>
        <div style={{ position: 'relative', marginBottom :'5%' }}>
          <Banner />
        </div>
        <Divider style={{ width:'100%', background: 'gray', marginTop: '2%', marginBottom: '5%'}}/>

        <div style={{ position: 'relative', marginBottom: '10%' }}>
          <Typography fontWeight='bold' variant="h1" color={'text'} mb={2}>Top Metrics</Typography>
          <ShortBanner gridData={gridData} />
        </div>

        <div style={{ marginBottom: '4%', marginTop: '5%'}}>
          <Ticker />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', placeItems: 'center', marginBottom: '5%' }}>
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

