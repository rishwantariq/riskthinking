'use client';
import { Datatable } from '@/components/DataTable/datatable';
import { useRef } from 'react';


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
