import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, ThemeProvider, Typography, Link, useMediaQuery } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const items = [

    {
        name: 'Not Sure Climate Can Impact Your Decisions? Get Full Inisghts with ',
        module: 'RiskView',
        description: 'Dive Into Your Data with Our Interactive Data Table',
        image: 'https://imgtr.ee/images/2023/05/04/ablOi.png',
        link: '/data/riskview'
      },
    {
        name: 'Concerned About a Specific Category? Find Out With ',
        module: 'SectorWatch',
        description: 'Uncover Trends and Patterns across business categories with our Powerful & Insightful Charting Tool."',
        image: 'https://imgtr.ee/images/2023/05/04/abJtJ.png',
        link: '/data/chart'
    },
    {
        name: 'Want to Visualize Risk Areas? Navigate the Map With ',
        module: ' Geo Discoveries',
        description: 'Discover Global Insights: Navigate Your Data with our Interactive Geographical Visualization',
        image: 'https://imgtr.ee/images/2023/05/04/ab0kz.png',
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
  link: string | undefined; name: string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; description: string; image: string; module: string;
};
}) {
    const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <Paper style={{ height: '100vh', position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
      <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', marginLeft: '5%' }}>
        <div>
        <Typography fontSize={{ xs: "3rem", sm: "4rem" }} align='left' variant='h1' color='text.primary' sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'left' }}>
        {props.item.name}
          <Typography fontSize={{ xs: "3rem", sm: "4rem" }} fontWeight={'bold'} component='span' color='primary'>{props.item.module}</Typography>
        </Typography>
          <Typography align='left' variant='h4' color='text.secondary' sx={{ fontWeight: 'light', marginBottom: '24px', textAlign: 'left' }}>{props.item.description}</Typography>
        </div>
        <div style={{ width: 'auto', alignItems: 'center', marginRight: 'auto', marginBottom: 'auto' }}>
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
