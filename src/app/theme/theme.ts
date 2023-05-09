"use client";
import { createTheme, styled } from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

const palette = {
    primary: {
        main: '#55cbcd',
    },
    secondary: {
        main: '#b28dff',
    },
    error: {
      main: '#e74c3c',
    },
    warning: {
      main: '#f1c40f',
    },
    info: {
      main: '#8fcaca',
    },
    success: {
      main: '#000000',
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
      '&.MuiDataGrid-columnHeaderMenuIcon': {
        color: '#fff'
      },
      border: 'none' // Remove border

    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      border: '1px solid #303030'
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: '1px solid #303030',
    },
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: '#1f1f1f' // Light grey background for even rows
    },
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: '#121212' // White background for odd rows
    }
  }));
  

export const darkTheme = createTheme({
    palette,
    typography: {
        fontFamily: 'Circular Std, Helvetica, Arial, sans-serif',
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