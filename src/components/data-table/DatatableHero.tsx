import React, { RefObject } from 'react';
import { Box, Button, Container, Typography } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ArrowDownwardRounded';

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
      <img style={{width: '300px', height: '300px'}} src="https://imgtr.ee/images/2023/05/03/ao5vV.png" alt="" />

      <Box>
          <Typography
            variant="h1"
            align="center"
            fontSize={{ xs: "2rem", sm: "3rem", md: "6rem" }}
            color="text.primary"
            style={{ marginBottom: "20px" }}
          >
            RiskView
          </Typography>
          <Typography fontSize={{ xs: "0.7rem", sm: "0.9rem", md: "1rem" }} variant="h4" fontWeight={'light'} align="center" color="text.secondary">
            Be climate-ready. Use our categorized data to make financial decisions.
          </Typography>
        </Box>
        <Box flexDirection={{ xs: "column", sm: "row" }} sx={{gap: '20px'}} mt={8} display="flex" justifyContent="center">
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
            Jump to Table
        </Button>
      </Box>
    </Box>
  );
};

export default DatatableHero;

