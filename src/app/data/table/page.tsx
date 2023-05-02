'use client';
import { Datatable } from '@/components/DataTable/datatable';
import { useRef } from 'react';
import { useSpring, animated } from 'react-spring';


export default function Page() {
  const tablRef = useRef<HTMLDivElement>(null);
  
    const spring = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1},
      config: { duration: 1000 },
    });
    return (
      <>
        <animated.div style={{background: 'black', marginBottom: '1%', marginTop: '3%', width: 'screen', height: 'scren', ...spring}}>
                <div style={{height: 'screen', marginTop: '-1%', marginBottom: '1%' }} ref={tablRef}>
                    <Datatable />
                </div>
          </animated.div>
        </>
    );
}
