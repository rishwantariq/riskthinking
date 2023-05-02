import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { BorderLinearProgress } from '@/app/theme/theme';
import Tooltip from '@mui/material/Tooltip';

type AssetData = {
    assetName: string;
    latitude: number;
    longitude: number;
    risk: number;
};
  
type CardsProps = {
    data: AssetData[];
};
  

export default function Cards({ data }: CardsProps) {
    const theme = useTheme();

  const rows = Math.ceil(data.length / 3); // Calculate number of rows based on data length
  const cardData = []; // Initialize array to store data for each card

  // Divide data into groups of 3 for each row
  for (let i = 0; i < rows; i++) {
    const start = i * 3;
    const end = start + 3;
    cardData.push(data.slice(start, end));
  }

  return (
    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {cardData.map((rowData, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            maxWidth: '1000px',
            width: '100%',
            mt: '20px',
            '@media (max-width: 1000px)': {
              justifyContent: 'center',
            },
          }}
        >
          {rowData.map((item, i) => (
            <Card
              key={i}
              sx={{ display: 'flex', width: ['100%', '45%', '30%'], borderRadius: '20px', background: '#242F39', mb: '20px', border: '1px solid #495262' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent sx={{ flex: '1 0 auto', justifyContent: 'center' }}>
                    <Typography
                    align='left'
                    component="div"
                    mb={2}
                    variant="h3"
                    fontWeight="bold"
                    color="white"
                    sx={{
                        textWrap: 'none',
                        overflow: 'hidden',
                        cursor: 'pointer',
                    }}
                    >
                    <Tooltip title={item.assetName}>
                        <span>
                        {item.assetName.length > 10 ? item.assetName.slice(0, 12) + '...' : item.assetName}
                        </span>
                    </Tooltip>
                    </Typography>  
                  <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center', marginTop: '2%' }}>
                    <LocationOnOutlinedIcon />
                    <Typography variant="h4" align='left' color="white" component="div">
                      {item.latitude}, {item.longitude}
                    </Typography>  
                  </div>
                  <BorderLinearProgress
                    sx={{ marginTop: '20%' }}
                    variant="determinate"
                    value={Number((item.risk).toFixed(0))}
                  />
                </CardContent>
                  </Box>
                  <div style={{marginTop: 'auto', marginBottom: 'auto', margin: 'auto'}}>
                  <Typography variant="h2" align='left' mr={4} color="white" component="div">
                      {item.risk.toFixed(0)}%
                  </Typography>  
                  </div>
            </Card>
          ))}
        </Box>
      ))}
    </Box>
  );
}
