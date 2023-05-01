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
import { useRef } from 'react';
import { Typography } from '@mui/material';


export default function Page() {
    
    const tablRef = useRef<HTMLDivElement>(null);

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
            <Box sx={{ background: 'black', marginTop: '4%', textAlign: 'center', maxWidth: 'screen', paddingTop: '5px', paddingLeft: '10px', paddingRight: '10px', marginLeft: '10px', marginRight: '10px', marginBottom: '20px', borderRadius: '20px' }}>
                <div style={{height: 'screen', marginTop: '-1%', marginBottom: '1%' }} ref={tablRef}>
                    <Datatable />
                </div>
                
            </Box>

        </>
    );
}
