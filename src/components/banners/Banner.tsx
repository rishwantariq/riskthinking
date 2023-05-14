import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, ThemeProvider, Typography, Link, useMediaQuery, Box } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const items = [

  {
    name: 'Not Sure How Climate Can Impact Your Decisions? Get Full Inisghts with ',
    module: 'RiskView',
    description: 'Dive Into Your Data with Our Interactive Data Table',
    image: 'https://imgtr.ee/images/2023/05/04/ablOi.png',
    link: '/data/riskview'
  },
  {
    name: 'Concerned About a Specific Category? Find Out With ',
    module: 'SectorWatch',
    description: 'Uncover Trends and Patterns across business categories with our Powerful & Insightful Charting Tool.',
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
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box height="100vh" width="100%" sx={{ background: 'black' }}>
      <Carousel
        indicators
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            top: '20',
            left: '50%',
            transform: 'translateX(-50%)',
          }
        }}
        animation="fade"
        navButtonsProps={{
          style: {
            borderRadius: '50px',
            height: "full",
            opacity: 0.5
          },
        }}
        navButtonsAlwaysVisible={true}
        fullHeightHover={false}
        autoPlay={true}
        duration={1000}
        interval={8000}
      >
        {items.map((item, i) => (
          <Box key={i} height="100vh" width="100%" sx={{ background: 'black' }}>
            <Paper sx={{ height: '100%', background: 'black', position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
              <Box
                sx={{
                  width: { xs: '100%', md: '50%' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  order: { xs: 1, md: 2 },
                }}
              >
                {isSmallScreen ? (
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      justifyContent: 'center',
                      marginBottom: "5%",
                    }}
                  />
                ) : (
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      position: "relative",
                      width: "500px",
                      height: "auto",
                      marginRight: '5%',
                      display: "block",
                      marginLeft: "auto",
                    }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  width: { xs: '100%', md: '100%' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  order: { xs: 2, md: 1 },
                  px: { xs: 4, md: 8 },
                }}
              >
                <Typography
                  variant="h1"
                  color="text.primary"
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    textAlign: 'left',
                    fontSize: { xs: '3rem', sm: '4rem' },
                  }}
                >
                  {item.name}
                  <Typography
                    variant="h1"
                    color="primary"
                    component="span"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '3rem', sm: '4rem' } }}
                  >
                    {item.module}
                  </Typography>
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  sx={{
                    fontWeight: 'light',
                    marginBottom: '24px',
                    textAlign: 'left',
                  }}
                >
                  {item.description}
                </Typography>
                <Link href={item.link} target="_blank">
                  <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<ChevronRightIcon />}
                    sx={{
                      borderRadius: '50px',
                      padding: '14px 40px',
                      width: '100%',
                      marginBottom: '5%',
                    }}
                  >
                    Try Now
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default Banner;
