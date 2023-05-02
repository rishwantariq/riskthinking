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

    return (
      <>
        <div style={{background: 'black', width: 'screen', height: 'scren'}}>
            <Box sx={{ background: 'black', marginTop: '4%', textAlign: 'center', maxWidth: 'screen', paddingTop: '5px', paddingLeft: '10px', paddingRight: '10px', marginLeft: '10px', marginRight: '10px', marginBottom: '20px', borderRadius: '20px' }}>
                <div style={{height: 'screen', marginTop: '-1%', marginBottom: '1%' }} ref={tablRef}>
                    <Datatable />
                </div>
                
            </Box>
          </div>
        </>
    );
}
