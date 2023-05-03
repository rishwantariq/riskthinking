import React, { RefObject } from 'react';
import { Box, Button, Container, Typography } from "@mui/material";

interface MapsHeroProps {
  targetRef: RefObject<HTMLDivElement>;
}

const MapsHero = (targetRef: MapsHeroProps) => {
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
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <img style={{width: '300px', height: '300px'}} src="https://imgtr.ee/images/2023/05/01/JCbzY.png" alt="" />
      <Box>
        <Typography
          variant="h1"
          align="center"
          fontSize={{ xs: "2rem", sm: "3rem", md: "6rem" }}
          color="text.primary"
          style={{ marginBottom: "20px" }}
        >
          Geo Discoveries
        </Typography>
        <Typography
          variant="h4"
          fontWeight="light"
          align="center"
          fontSize={{ xs: "0.7rem", sm: "0.9rem", md: "1rem" }}
          color="text.secondary"
          style={{ marginBottom: "40px" }}
        >
          Use geographical visualization to identify risk areas.
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        maxWidth="700px"
        margin="0 auto"
        gap={'30px'}
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
          Learn More
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleTableClick}
          style={{
            borderRadius: "50px",
            padding: "14px 40px",
          }}
        >
          Try Now
        </Button>
      </Box>
    </Box>

  );
};

export default MapsHero;