'use client';
import { Datatable } from '@/components/DataTable/datatable';
import { Typography } from '@mui/material';
import { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import InfoIcon from '@mui/icons-material/Info';


export default function Page() {
  const tablRef = useRef<HTMLDivElement>(null);
  const spring = useSpring({
      from: { opacity: 0. },
      to: { opacity: 1},
      config: { duration: 1000 },
    });
    return (
      <>
        <animated.div style={{ background: 'black', height: 'fitcontent', ...spring }}>
          <div style={{ marginBottom: '2%', background: 'black'}}>
            s
              </div>
              <div style={{height: 'fit-content'}} ref={tablRef}>
                <Datatable />
              </div>
        </animated.div>
        </>
    );
}
