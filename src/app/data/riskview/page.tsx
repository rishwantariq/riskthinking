'use client';
import { Datatable } from '@/components/data-table/Datatable';
import DatatableHero from '@/components/data-table/DatatableHero';
import Box from '@mui/material/Box';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PercentIcon from '@mui/icons-material/Percent';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoIcon from '@mui/icons-material/Info';
import ShortBanner from '@/components/banners/ShortBanner';
import { Divider, Button, Typography, useMediaQuery } from '@mui/material';
import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import { PageWrapper } from '@/components/PageWrapper';

export default function Page() {
    
    const tablRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const { ref, inView } = useInView();

    const DynamicButtonBase = dynamic(() => import('@mui/material/ButtonBase'), {
        ssr: false
      });

    const gridData = [
        {
          icon: <SortIcon color="info" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Sorting',
          subtitle: 'Interested in how certain metrics stand out? Sorting has you covered.',
        },
        {
          icon: <FilterListIcon color="info" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Filtering',
          subtitle: 'Clear the clutter with filtering. Filter out data specified data.',
        },
        {
          icon: <SearchIcon color="info" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Search',
          subtitle: 'Want to something, from a certain column? Use column-based search',
        },
        // Add more objects for additional grid items
    ];
    const gridDataDup = [
        {
          icon: <TableRowsIcon color="info" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Customize Columns',
          subtitle: 'Personalize your table by selecting columns you want to see.',
        },
        {
          icon: <PercentIcon color="info" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Stochastic Risk Ranking',
          subtitle: 'Visualize Risk Ranking relative to Risk-Factors, with our probabilistic values.',
        },
        {
          icon: <FormatListNumberedIcon color="info" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Rows per Page',
          subtitle: 'Select the number of rows you want to see per page to your liking.',
        },
        // Add more objects for additional grid items
    ];
    return (
        <>
        <PageWrapper>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'black'}}>
                <div style={{}}>
                    <DatatableHero targetRef={tablRef} />
                </div>
                <Divider style={{ width:'100%', marginLeft: 'auto', marginRight: 'auto', background: 'gray', marginBottom: '5%'}}/>
                <div>
                    <Box sx={{ textAlign: 'center', marginBottom: '5%', marginTop: '5%' }}>
                    <Typography mt={-5} mb={5} variant={'h1'}> Key Features</Typography>
                    <div style={{marginBottom: '5%'}}>
                        <ShortBanner gridData={gridData} />
                    </div>
                    <div style={{marginBottom: '8%'}}>
                        <ShortBanner gridData={gridDataDup} />
                    </div>
                    </Box>
                </div>
                <div style={{ display: "flex", flexDirection: "column", background: "#C7DBDA", marginBottom: "10%", marginTop: '1%' }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left", position: "relative" }}>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "500px", padding: "20px" }}>
                            <Typography align="left" variant="h1" fontWeight={"bold"} color={"black"}>
                            Interactive. Visual. Custom. Fully Climate-Ready.
                            </Typography>
                            <Typography align="left" mt={2} variant="h4" fontSize={"1rem"} fontWeight={"medium"} color={"black"}>
                            Identify all the risk factors, with indicators, a glance.
                            </Typography>
                        </div>
                        {isSmallScreen ? null : (
                        <img
                        src="https://s11.gifyu.com/images/Charts-bro.png"
                        alt=""
                        style={{
                            position: "relative",
                            width: "600px",
                            height: "auto",
                            top: "0px",
                            display: "block",
                            marginLeft: "auto",
                            marginTop: '-15%'
                        }}
                        />                             
                    )}   
                    </div>
                </div>
                <div>
                    <Box sx={{ background: 'black', textAlign: 'center', maxWidth: '100vw', marginBottom: '3%' }}>
                        <Typography mb={5} variant={'h1'}>Datatable Preview</Typography>
                        <Link href="/data/table">
                            <Button
                            variant="outlined"
                            color="secondary"
                            endIcon={<ChevronRightIcon />}
                            style={{
                                borderRadius: "50px",
                                padding: "14px 40px",
                                marginRight: '20px',
                                marginBottom: '5%'
                            }}>
                            Show fullscreen
                            </Button>
                        </Link>
                        <div ref={ref}>
                            <div style={{ background: 'black', height:'100%', marginTop: '-1%', margin: '1%'}} ref={tablRef}>
                                <Datatable />
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </PageWrapper>
    </>
    );
}
