'use client';
import { Datatable } from '@/components/DataTable/datatable';
import DatatableHero from '@/components/DataTable/datatableHero';
import Box from '@mui/material/Box';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PercentIcon from '@mui/icons-material/Percent';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoIcon from '@mui/icons-material/Info';
import ShortBanner from '@/components/shortBanner';
import { Divider, Button, Typography, useMediaQuery } from '@mui/material';
import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';

export default function Page() {
    
    const tablRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const { ref, inView } = useInView();
    const spring = useSpring({
      opacity: inView ? 1 : 0,
      from: { opacity: 0 },
      config: { duration: 800 },
    });
    const DynamicButtonBase = dynamic(() => import('@mui/material/ButtonBase'), {
        ssr: false
      });

    const gridData = [
        {
          icon: <SortIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Sorting',
          subtitle: 'Interested in how certain metrics stand out? Sorting has you covered.',
        },
        {
          icon: <FilterListIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Filtering',
          subtitle: 'Clear the clutter with filtering. Filter out data specified data.',
        },
        {
          icon: <SearchIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Search',
          subtitle: 'Want to something, from a certain column? Use column-based search',
        },
        // Add more objects for additional grid items
    ];
    const gridDataDup = [
        {
          icon: <TableRowsIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Customize Columns',
          subtitle: 'Personalize your table by selecting columns you want to see.',
        },
        {
          icon: <PercentIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Stochastic Risk Ranking',
          subtitle: 'Visualize Risk Ranking relative to Risk-Factors, with our probabilistic values.',
        },
        {
          icon: <FormatListNumberedIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Rows per Page',
          subtitle: 'Select the number of rows you want to see per page to your liking.',
        },
        // Add more objects for additional grid items
    ];
    return (
        <>
            <div></div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'black'}}>
                <div style={{}}>
                    <DatatableHero targetRef={tablRef} />
                    <img src="" alt="" />
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
                <div style={{ display: "flex", flexDirection: "column", background: "#defde0", marginBottom: "10%", marginTop: '1%' }}>
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
                        src="https://imgtr.ee/images/2023/05/03/ao7fL.png"
                        alt=""
                        style={{
                            position: "relative",
                            width: "500px",
                            height: "auto",
                            top: "0px",
                            display: "block",
                            marginLeft: "auto",
                            marginBottom: '-15%'
                        }}
                        />                             
                    )}   
                    </div>
                </div>
                <div>
                    <Box sx={{ background: 'black', textAlign: 'center', maxWidth: '100vw', paddingTop: '5px', paddingLeft: '20px', paddingRight: '20px', marginLeft: '5%', marginRight: '5%', marginBottom: '3%' }}>
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
                        <animated.div ref={ref} style={{ ...spring}}>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginBottom: '4%'}}>
                                <InfoIcon />
                                <Typography align='center' variant='h4' fontWeight={'medium'}>Data is relative to page</Typography>
                            </div>
                            <div style={{ background: 'black', height:'600px', marginTop: '-1%', marginBottom: '1%' }} ref={tablRef}>
                                <Datatable />
                            </div>
                        </animated.div>
                    </Box>
                </div>
            </div>
        </>
    );
}
