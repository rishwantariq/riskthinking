import React from 'react';
import { Container, Typography, Grid, responsiveFontSizes } from '@mui/material';
import JSXStyle from 'styled-jsx/style';

interface GridItemProps {
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

interface ShortBannerProps {
  gridData: GridItemProps[];
}

function ShortBanner({ gridData }: ShortBannerProps) {
  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {gridData.map((item, index) => (
          <Grid key={index} item xs={12} md={4} alignItems="center">
            {item.icon}
            <Typography fontWeight='bold' color={'text'} variant="h3" mb={2}>
              {item.title}
            </Typography>
            <Typography  fontWeight='regular' color={'text'} variant="h4">
              {item.subtitle}
            </Typography>
          </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default ShortBanner;
