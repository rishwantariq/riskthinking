'use client';
import { Datatable } from '@/components/data-table/Datatable';
import { Typography } from '@mui/material';
import { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import InfoIcon from '@mui/icons-material/Info';
import { PageWrapper } from '@/components/PageWrapper';

export default function Page() {
  const tablRef = useRef<HTMLDivElement>(null);
  const spring = useSpring({
      from: { opacity: 0. },
      to: { opacity: 1},
      config: { duration: 1000 },
    });
    return (
      <>
      <PageWrapper> 
        <animated.div style={{ background: 'black', height: 'fitcontent', ...spring }}>
          <div style={{ marginBottom: '2%', background: 'black'}}>
              <span></span>
              </div>
              <div style={{height: 'fit-content'}} ref={tablRef}>
                <Datatable />
              </div>
        </animated.div>
      </PageWrapper>
        </>
    );
}
