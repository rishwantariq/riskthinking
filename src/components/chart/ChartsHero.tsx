import React, { RefObject } from 'react';
import { Box, Button, Container, Typography } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ArrowDownwardRounded';

interface ChartsHeroProps {
  targetRef: RefObject<HTMLDivElement>;
}

const ChartsHero = (targetRef: ChartsHeroProps) => {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  const handleTableClick = () => {
    if (targetRef.targetRef.current) {
      window.scrollTo({
          top: targetRef.targetRef.current.offsetTop,
          behavior: 'smooth',
    });
  }
  };
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        position: "relative",
        padding: 0,
        overflow: "hidden",
      }}
    >
        <img style={{ width: '300px', height: '300px' }} src="https://s12.gifyu.com/images/Data-Trends-bro-2.png" alt="" />
        <Box sx={{background: 'black'}}>
            <Typography
            variant="h1"
            align="center"
            fontSize={{ xs: "2rem", sm: "3rem", md: "6rem" }}
            color="text.primary"
            style={{ marginBottom: "20px" }}
            >
             SectorWatch
            </Typography>
            <Typography
            variant="h4"
            fontWeight="light"
            align="center"
            fontSize={{ xs: "0.7rem", sm: "0.9rem", md: "1rem" }}
            color="text.secondary"
            style={{ marginBottom: "40px" }}
            >
            Chart the risks, with the powerful charting tools.
            </Typography>
        </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        maxWidth="800px"
        margin="0 auto"
        gap={'20px'}
        >
        <Button
            variant="outlined"
            color="secondary"
            onClick={handleClick}
            style={{
              borderRadius: "50px",
              padding: "14px 40px",
              

            }}
          >
            Read Below
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={handleTableClick}
            endIcon={<ChevronRightIcon ></ChevronRightIcon>}
            style={{
              borderRadius: "50px",
              padding: "14px 40px",
            }}
          >
            Jump to Chart
        </Button>
        </Box>
    </Box>

  );
};

export default ChartsHero;