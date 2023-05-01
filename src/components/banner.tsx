import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, ThemeProvider, Typography } from '@mui/material';

const items = [
  {
    name: 'Visualize Data',
    description: 'Data Visualization made easy with various metrics put together in insightful data visualizations',
    image: 'https://imgtr.ee/images/2023/04/25/8mQez.png'
    },
    {
        name: 'RiskView',
        description: 'Dive Into Your Data with Our Interactive Data Table',
        image: 'https://imgtr.ee/images/2023/04/25/8mmWi.png'
      },
    {
        name: 'Chart Your Progress',
        description: 'Uncover Trends and Patterns with our Powerful & Insightful Charting Tools"',
        image: 'https://imgtr.ee/images/2023/04/25/8mL6c.png'
    },
    {
        name: 'Geo Discoveries',
        description: 'Discover Global Insights: Navigate Your Data with our Interactive Geographical Visualization',
        image: 'https://imgtr.ee/images/2023/04/25/8ZiPn.png'
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

function Item(props: { item: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; image: string | undefined; }; }) {
  return (
    <Paper style={{ height: '80vh', position: 'relative' }}>
      <div style={{ display:'flex', flexDirection: 'column', position: 'absolute', left: 0, top: 0, width: '50%', height: '100%' }}>
        <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <Typography variant='h1' color='text.primary' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>{props.item.name}</Typography>
          <Typography variant='h4' color='text.secondary' sx={{ fontWeight: 'light', marginBottom: '24px' }}>{props.item.description}</Typography>
          <div style={{width:'30%', marginRight:'auto', marginLeft: 'auto', alignItems: 'center'}}>
          <Button
            variant="outlined"
            color="secondary"
            style={{
              borderRadius: "50px",
              padding: "14px 40px",
            }}
          >
            Try Out
            </Button>
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
