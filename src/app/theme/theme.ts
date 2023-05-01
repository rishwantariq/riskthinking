"use client";
import { createTheme, styled } from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { DataGrid } from "@mui/x-data-grid";

const palette = {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
        main: '#03dac5',
        black: '#000000',
    },
    secondary: {
        main: '#bb86fc', // a cyan shade
    },
    error: {
      main: '#e74c3c',
    },
    warning: {
      main: '#f1c40f',
    },
    info: {
      main: '#3498db',
    },
    success: {
      main: '#2ecc71',
    },
    text: {
      primary: '#ffffff',
      secondary: '#c8c6c4',
    },
    background: {
      default: '#000000',
      paper: '#000000',
      table: '#536878'
    },
    bar: {
      main: '#000000',
    },
  };

  export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[
        theme.palette.mode === "light" ? 100 : 800
      ],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#bb86fc" : "green",
    },
  }));
  
  // Define DataGrid styles
  export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-columnHeader': {
      '& .MuiDataGrid-columnHeaderTitle': {
        color: '#fff'
      },
      '& .MuiDataGrid-sortIcon': {
        color: '#fff'
      },
      '&.MuiDataGrid-iconSeparator': {
        color: '#fff'
      },
      '&.MuiDataGrid-columnHeaderMenuIcon': {
        color: '#fff'
      }
    },
  }));

export const darkTheme = createTheme({
    palette,
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontWeightLight: 100,
        fontWeightRegular: 300,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        
        h1: {
          fontSize: '4rem',
          fontWeight: 'regular',
          letterSpacing: '-0.01562em',
        },
        h2: {
          fontSize: '3rem',
          fontWeight: 'regular',
          letterSpacing: '-0.00833em',
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 'light',
            letterSpacing: '-0.00833em',
        },
        h4: {
            fontSize: '1rem',
            fontWeight: 'light',
            letterSpacing: '-0.00833em',
        },
        h5: {
            fontSize: '0.8rem',
            fontWeight: 'light',
            letterSpacing: '-0.00833em',
        },
        // other typography options
  },
      // other theme options
});