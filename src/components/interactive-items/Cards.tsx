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
import InfoIcon from '@mui/icons-material/Info';

type AssetData = {
    assetName: string;
    latitude: number;
    longitude: number;
    risk: number;
};
  
type CardsProps = {
    data: AssetData[];
    subheading: string;
    info: string;
};
  

export default function Cards({ data, subheading, info }: CardsProps) {
    const theme = useTheme();
    const filtered = data.map(item => {
      if (item.assetName === 'extremecold') {
        return { ...item, assetName: 'Extreme Cold' };
      } else if (item.assetName === 'extremeheat') {
        return { ...item, assetName: 'Extreme Heat' };
      } else if (item.assetName === 'sealevelrise') {
        return { ...item, assetName: 'Sea Level Rise' };
      } else {
        return item;
      }
    });
  
  const rows = Math.ceil(filtered.length / 3); // Calculate number of rows based on data length
  const cardData = []; // Initialize array to store data for each card

  // Divide data into groups of 3 for each row
  for (let i = 0; i < rows; i++) {
    const start = i * 3;
    const end = start + 3;
    cardData.push(filtered.slice(start, end));
  }

  return (
    <Box
      sx={{
        position: 'relative',
        background: '#222222',
        borderRadius: '20px',
        marginBottom: '5%',
        width: '100%',
        height: '100%',
        margin: '0 auto',
        border: '1px solid #404040',
        maxWidth: '1200px',
      }}
    >
      <Typography
        align='left'
        component="div"
        mt={{ xs: '30px', sm: '30px', md: '30px' }}
        mb={{ xs: '10px', sm: '20px', md: '-10px' }}
        ml={{ xs: '10px', sm: '8px', md: '30px' }}
        variant="h2"
        fontWeight="bold"
        fontSize={{ xs: '2rem', sm: '2rem', md: '2.5rem' }}
        color="#F5F5F5"
        sx={{
          textWrap: 'none',
          overflow: 'hidden',
          cursor: 'pointer',
          textTransform: 'capitalize',
          position: 'relative',
          width: '100%',
        }}
      >
        {subheading}
      </Typography>
      <Box  mt={{ xs: '0', sm: '30px', md: '20px' }} ml={{ xs: '0', sm: '30px', md: '30px' }} sx={{ display: 'flex', gap: '4px', justifyContent: 'start', alignItems: 'center', alignContent: 'center', marginBottom: '5%', marginTop: '-3%'}}>
          <InfoIcon sx={{ fill: "white", fontSize: { xs: "16px", md: "24px" }, marginLeft: { xs: '10px', sm: '30px', md: '0px' }}}/>
        <Typography color={"white"} align='left' variant='h4' fontWeight={'regular'}>{info}</Typography>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2%'  }}>
        {cardData.map((rowData, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              maxWidth: '1100px',
              width: '100%',
              gap: '30px',
              mt: '20px',
              '@media (max-width: 1000px)': {
                justifyContent: 'center',
              },
            }}
          >
            {rowData.map((item, i) => (
              <Card
                key={i}
                sx={{ display: 'flex', width: 'fit-content', borderRadius: '20px', background: '#363636', mb: '20px', border: '2px solid #404040' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '200px', margin: '2%' }}>
                  <CardContent sx={{ flex: '1 0 auto', justifyContent: 'center' }}>
                      <Typography
                      align='left'
                      component="div"
                      mb={2}
                      variant="h3"
                      fontSize={'1.5rem'}
                      fontWeight="bold"
                      color="white"
                      sx={{
                          textWrap: 'none',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          textTransform: 'capitalize'
                      }}
                      >
                      <Tooltip title={item.assetName}>
                          <span>
                          {item.assetName.length > 10 ? item.assetName.slice(0, 8) + '...' : item.assetName}
                          </span>
                      </Tooltip>
                      </Typography>  
                      {item.latitude !== 0 && item.longitude !== 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center', marginTop: '2%' }}>
                          <LocationOnOutlinedIcon />
                          <Typography variant="h4" align='left' color="white" component="div">
                            {item.latitude}, {item.longitude}
                          </Typography>  
                        </div>
                      ) : null}
                    <BorderLinearProgress
                      sx={{ marginTop: '20%' }}
                      variant="determinate"
                      value={Number((item.risk).toFixed(0))}
                    />
                  </CardContent>
                    </Box>
                    <div style={{marginTop: 'auto', marginBottom: 'auto', margin: 'auto'}}>
                    <Typography variant="h2" align='left' mr={4} color={"text.primary"}component="div">
                        {item.risk.toFixed(0)}%
                    </Typography>  
                    </div>
              </Card>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
