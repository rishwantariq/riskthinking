import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', width: '25%', borderRadius: '20px', background: '#242F39' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography align='left' component="div" variant="h3" fontWeight="bold" color="white">
            Live From Space
          </Typography>
          <Typography variant="h4" align='left' color="white" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <Typography mb={4} align='left' variant="subtitle1" color="text.secondary" component="div">
            Album
          </Typography>
        </Box>
      </Box>
      <MusicNoteIcon />
    </Card>
  );
}
