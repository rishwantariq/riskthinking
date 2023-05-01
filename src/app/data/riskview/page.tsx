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
import ShortBanner from '@/components/shortBanner';
import { Divider, Button, Typography } from '@mui/material';
import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';


export default function Page() {
    
    const tablRef = useRef<HTMLDivElement>(null);
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
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div>
                    <DatatableHero targetRef={tablRef} />
                </div>
                <Divider style={{ width:'1000px', marginLeft: 'auto', marginRight: 'auto', background: 'gray', marginTop: '2%', marginBottom: '5%'}}/>
                <div>
                    <Box sx={{ textAlign: 'center', maxHeight: 'screen', maxWidth: 'screen', marginBottom: '5%' }}>
                        <Typography mt={-5} mb={5} variant={'h1'}> Key Features</Typography>
                        <div style={{marginBottom: 100}}>
                            <ShortBanner gridData={gridData} />
                        </div>
                        <div style={{marginBottom: 8}}>
                            <ShortBanner gridData={gridDataDup} />
                        </div>
                    </Box>
                </div>
                <Divider style={{ width:'1000px', marginLeft: 'auto', marginRight: 'auto', background: 'gray', marginTop: '2%', marginBottom: '2%'}}/>
            </div>

            <Box sx={{ background: 'black', textAlign: 'center', height: 'screen', maxWidth: '100vw', paddingTop: '5px', paddingLeft: '20px', paddingRight: '20px', marginLeft: '60px', marginRight: '60px', marginBottom: '60px' }}>
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
                <Box sx={{ background: 'black', borderRadius: '30px', width: 'screen', paddingTop: '30px', padding: '30px' }}>
                    
                    <div style={{ height:'600px',  marginTop: '-1%', marginBottom: '1%' }} ref={tablRef}>
                        <Datatable />
                    </div>
                </Box>
            </Box>
        </>
    );
}
