import React, { RefObject } from 'react';
import { Box, Button, Container, Typography } from "@mui/material";

interface DatatableHeroProps {
  targetRef: RefObject<HTMLDivElement>;
}
const DatatableHero = (targetRef : DatatableHeroProps) => {
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
      <img src="https://uploads-ssl.webflow.com/618ce467f09b34ebf2fdf6be/6277a3c2b1164c4122e45739_Doodle%2011.svg" alt="" />
      <Box>
          <Typography
            variant="h1"
            align="center"
            fontSize={'6rem'}
            color="text.primary"
            style={{ marginBottom: "20px" }}
          >
            RiskView
          </Typography>
          <Typography variant="h4" fontWeight={'light'} align="center" color="text.secondary">
            Be climate-ready. Use our categorized data to make financial decisions.
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
            learn More
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

export default DatatableHero;

