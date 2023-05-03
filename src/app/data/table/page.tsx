'use client';
import { Datatable } from '@/components/DataTable/datatable';
import { Typography } from '@mui/material';
import { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import InfoIcon from '@mui/icons-material/Info';


export default function Page() {
  const tablRef = useRef<HTMLDivElement>(null);
  
    const spring = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1},
      config: { duration: 1000 },
    });
    return (
      <>
        <animated.div style={{ background: 'black', marginTop: '3%', width: 'screen', height: '100%', ...spring }}>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginBottom: '4%'}}>
                    <InfoIcon />
                    <Typography align='center' variant='h4' fontWeight={'medium'}>Data is relative to page</Typography>
                  </div>
                <div style={{height: 'screen', marginTop: '-1%'}} ref={tablRef}>
                    <Datatable />
                </div>
          </animated.div>
        </>
    );
}
