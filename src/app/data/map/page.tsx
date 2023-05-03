'use client';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import { Divider, Typography, useMediaQuery } from '@mui/material';
import MapChart from '@/components/Charts/maps/map';
import MapsHero from '@/components/Charts/mapsHero';
import ColorPalette from '@/components/pallette';
import ShortBanner from '@/components/shortBanner';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import RoomIcon from '@mui/icons-material/Room';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';


export default function Page() {
    const mapsRef = useRef<HTMLDivElement>(null);
    const { ref, inView } = useInView();
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const spring = useSpring({
      opacity: inView ? 1 : 0,
      from: { opacity: 0 },
      config: { duration: 800 },
    });
  
    const gridData = [
        {
          icon: <PanToolAltIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Zoom & Pan',
          subtitle: 'The RiskView map allows you to freely move and pan across the areas.',
        },
        {
          icon: <RoomIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Risk Markers',
          subtitle: 'Identify the areas using risk markers. Double tap marker to zoom and show details.',
        },
        {
          icon: <LegendToggleIcon color="primary" style={{ fontSize: '5rem', marginBottom: 5 }} />,
          title: 'Visual Indicator',
          subtitle: 'Color coded Legend. Each marker will correspond to the risk value in the legend.',
        },
        // Add more objects for additional grid items
    ];

    return (
        <>
        <div style={{ background: 'black', width: '100%', height: 'screen'}}> 
            `<Box sx={{ background: 'black', textAlign: 'center', maxWidth: 'screen', height: 'screen',  paddingTop: '5px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <MapsHero targetRef={mapsRef} />
                        <Divider style={{ width:'auto', marginLeft: 'auto', marginRight: 'auto', background: 'gray', marginTop: '2%', marginBottom: '2%'}}/>
                        <Typography variant='h1'>Usage</Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '5%', gap: '20px' }}>
                            <div style={{ marginTop: '0%', marginBottom: '5%' }}>
                                <ColorPalette />
                            </div>
                            <ShortBanner gridData={gridData} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", background: "#ffb092", marginBottom: "5%", marginTop: '15%' }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left", position: "relative" }}>
                                <div style={{ display: "flex", flexDirection: "column", width: "50%", maxWidth: "500px", padding: "20px" }}>
                                <Typography align="left" variant="h1" fontWeight={"bold"} color={"black"}>
                                    Interactive. Detailed. Featureful. Personal.
                                </Typography>
                                <Typography align="left" mt={2} variant="h4" fontSize={"1rem"} fontWeight={"medium"} color={"black"}>
                                   Identify all the risk areas, at a glance.
                                </Typography>
                                </div>
                                {isSmallScreen ? null : (
                               <img
                               src="https://imgtr.ee/images/2023/05/02/J3fw2.png"
                               alt=""
                               style={{
                                 position: "relative",
                                 width: "500px",
                                 height: "auto",
                                 top: "-200px",
                                 display: "block",
                                 marginLeft: "auto",
                                 marginBottom: '-15%'
                               }}
                                />                             
                                )}
                            </div>
                        </div>
                    </div>
                    <div ref={mapsRef} style={{ background: 'black', marginBottom: '2%' }}> 
                        <Typography mb={'1%'} variant='h1'>Risk Map</Typography>
                        <Typography mb={'5%'} fontWeight={'regular'} variant='h4'>Powered by Highcharts</Typography>
                        <animated.div ref={ref} style={{ paddingLeft: '20px', paddingRight: '20px', ...spring}}>
                            <MapChart />
                        </animated.div >
                    </div>
                </div>
            </Box>`
        </div>
        </>
    );
}
