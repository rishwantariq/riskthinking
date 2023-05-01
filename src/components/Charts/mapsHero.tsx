import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

const MapsHero = ({ targetRef }) => {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  const handleTableClick = () => {
    if (targetRef.current) {
      window.scrollTo({
          top: targetRef.current.offsetTop,
          behavior: 'smooth',
    });
  }
  };
  return (
    <Box
    style={{
      height: "90vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
      //backgroundImage: "url('')",
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
            fontSize={'6rem'}
            color="text.primary"
            style={{ marginBottom: "20px" }}
          >
            Geo Discoveries
          </Typography>
          <Typography variant="h4" fontWeight={'light'} align="center" color="text.secondary">
            Use geographical visualization to identify risk areas.
          </Typography>
        </Box>
        <Box mt={8} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClick}
            style={{
              borderRadius: "50px",
              padding: "14px 40px",
              marginRight: '20px'
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