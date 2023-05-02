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
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(10),
        flexDirection: 'row',
      }}
    >
     
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <DatasetIcon color='primary' style={{fontSize: '4rem'}} />
        <Typography mt={2} fontWeight={'regular'} variant="h4" align="center">
          Raw Data
        </Typography>
      </Box>
      <ArrowRightAltOutlinedIcon color='inherit' style={{fontSize: '4rem'}} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FunctionsIcon color='primary' style={{fontSize: '4rem'}}/>
        <Typography mt={2} fontWeight={'regular'} variant="h4" align="center">
          Data Aggregation
        </Typography>
      </Box>
      <ArrowRightAltOutlinedIcon color='inherit' style={{fontSize: '4rem'}} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <WorkspacesIcon color='primary' style={{fontSize: '4rem'}}/>

        <Typography mt={2} fontWeight={'regular'} variant="h4" align="center">
          Display Result
        </Typography>
      </Box>
    </Box>
  );
}
