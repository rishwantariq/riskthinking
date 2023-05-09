import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DatasetIcon from '@mui/icons-material/Dataset';
import FunctionsIcon from '@mui/icons-material/Functions';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

export default function HorizontalProgress() {
  const theme = useTheme();

  return (
        <Box
        sx={{
          display: 'flex',
          border: '1px solid #404040',
          borderRadius: '20px',
          padding: '40px',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: theme.spacing(20),
          [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            gap: theme.spacing(15),
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DatasetIcon color='primary' style={{fontSize: '5rem', fill: '#a8a8a8'}} />
          <Typography mt={2} color={'white'} fontWeight={'medium'} variant="h4" align="center">
            Raw Data
          </Typography>
        </Box>
        <ArrowRightAltOutlinedIcon color='inherit' style={{fontSize: '4rem', fill: "white"}} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FunctionsIcon style={{fontSize: '5rem', fill: '#a8a8a8'}}/>
          <Typography mt={2} color={'white'} fontWeight={'medium'} variant="h4" align="center">
            Data Aggregation
          </Typography>
        </Box>
        <ArrowRightAltOutlinedIcon color="primary" style={{fontSize: '4rem', fill: "white"}} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <WorkspacesIcon color='primary' style={{fontSize: '5rem', fill: '#a8a8a8'}}/>
          <Typography color={'white'} mt={2} fontWeight={'medium'} variant="h4" align="center">
            Display Result
          </Typography>
        </Box>
      </Box>
  );
}
