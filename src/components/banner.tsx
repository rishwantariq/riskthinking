import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, ThemeProvider, Typography, Link } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const items = [

    {
        name: 'RiskView',
        description: 'Dive Into Your Data with Our Interactive Data Table',
        image: 'https://imgtr.ee/images/2023/04/25/8mmWi.png',
        link: '/data/riskview'
      },
    {
        name: 'SectorWatch',
        description: 'Uncover Trends and Patterns with our Powerful & Insightful Charting Tool."',
        image: 'https://imgtr.ee/images/2023/04/25/8mL6c.png',
        link: '/data/chart'
    },
    {
        name: 'Geo Discoveries',
        description: 'Discover Global Insights: Navigate Your Data with our Interactive Geographical Visualization',
      image: 'https://imgtr.ee/images/2023/04/25/8ZiPn.png',
      link: '/data/map'
    }
];

function Banner(_props: any) {
  return (
    <div style={{ position: 'relative' }}>
      <Carousel
        indicators
        animation="slide"
        navButtonsProps={{
          style: {
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: 0,
            margin: 0
          }
        }}
        fullHeightHover={false}
        autoPlay={true}
        duration={1300}
        interval={8000}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
}

function Item(props: { item: {
  link: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; image: string | undefined; 
}; }) {
  return (
    <Paper style={{ height: '80vh', position: 'relative' }}>
      <div style={{ display:'flex', flexDirection: 'column', position: 'absolute', left: 0, top: 0, width: '50%', height: '100%' }}>
        <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <Typography variant='h1' color='text.primary' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>{props.item.name}</Typography>
          <Typography variant='h4' color='text.secondary' sx={{ fontWeight: 'light', marginBottom: '24px' }}>{props.item.description}</Typography>
          <div style={{width:'30%', marginRight:'auto', marginLeft: 'auto', alignItems: 'center'}}>
          <Link href={props.item.link} target="_blank" >
              <Button
              variant="outlined"
              color="secondary"
              endIcon={<ChevronRightIcon />}
              style={{
              borderRadius: "50px",
              padding: "14px 40px",
              width: '100%',
              marginRight: '20px',
              marginBottom: '5%'
              }}>
                  Try Now
              </Button>
            </Link>      
         </div>
       </div>
      </div>
      <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%' }}>
        <img src={props.item.image} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </div>
    </Paper>
  );
}

export default Banner;
