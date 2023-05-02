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
        <div style={{background: 'black', marginBottom: '1%', marginTop: '3%', width: 'screen', height: 'scren'}}>
                <div style={{height: 'screen', marginTop: '-1%', marginBottom: '1%' }} ref={tablRef}>
                    <Datatable />
                </div>
          </div>
        </>
    );
}
