import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function ColorPalette() {
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
      <div
        style={{
          backgroundColor: '#A0E5A5',
          borderRadius: '50%',
          width: theme.spacing(8),
          height: theme.spacing(8),
        }}
      />
        <Typography mt={2} fontWeight={'regular'} variant="h4" align="center">
          Low Risk
        </Typography>
        </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
        style={{
          backgroundColor: '#F0A565',
          borderRadius: '50%',
          width: theme.spacing(8),
          height: theme.spacing(8),
        }}
      />
        <Typography mt={2} fontWeight={'regular'} variant="h4" align="center">
          Medium Risk
        </Typography>
      </Box>
        
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          backgroundColor: '#F78F8F',
          borderRadius: '50%',
          width: theme.spacing(8),
          height: theme.spacing(8),
        }}
      />
        <Typography mt={2} fontWeight={'regular'} variant="h4" align="center">
          High Risk
        </Typography>
      </Box>
    </Box>
  );
}
