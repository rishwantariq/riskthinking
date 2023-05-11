'use client';
import { Datatable } from '@/components/data-table/Datatable';
import { Typography } from '@mui/material';
import { useRef } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { PageWrapper } from '@/components/PageWrapper';

export default function Page() {
  const tablRef = useRef<HTMLDivElement>(null);
    return (
      <>
      <PageWrapper> 
        <div style={{ background: 'black', height: 'fitcontent'}}>
          <div style={{ marginBottom: '2%', background: 'black'}}>
              <span></span>
              </div>
              <div style={{height: 'fit-content', margin: '0.5%'}} ref={tablRef}>
                <Datatable />
              </div>
        </div>
      </PageWrapper>
        </>
    );
}
