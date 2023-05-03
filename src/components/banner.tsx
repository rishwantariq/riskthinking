import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, ThemeProvider, Typography, Link, useMediaQuery } from '@mui/material';
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
        duration={1000}
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
};
}) {
    const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <Paper style={{ height: '80vh', position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h1' color='text.primary' sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>{props.item.name}</Typography>
        <Typography variant='h4' color='text.secondary' sx={{ fontWeight: 'light', marginBottom: '24px', textAlign: 'center' }}>{props.item.description}</Typography>
        <div style={{ width: 'auto', alignItems: 'center' }}>
          <Link href={props.item.link} target="_blank">
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<ChevronRightIcon />}
              style={{
                borderRadius: "50px",
                padding: "14px 40px",
                width: '100%',
                marginBottom: '5%'
              }}>
              Try Now
            </Button>
          </Link>
        </div>
      </div>
      <div style={{ width: 'auto', height: 'auto' }}>
        {isSmallScreen ? null : (
            <img
            src={props.item.image}                             
            alt=""
            style={{
              position: "relative",
              width: "600px",
              height: "auto",
              display: "block",
              marginLeft: "auto",
              marginBottom: '-15%'
            }}
            />  
        )}
      </div>
    </Paper>

  );
}

export default Banner;
