import { Grid, Link, Paper, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Paper style={{ marginTop: '2%', backgroundColor: "#222222", position: 'static', bottom: 0, width: '100%', padding: '20px 20px 0px 0px' }}>
         
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <Link href="#">
            <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="text.secondary">
            &copy; 2023 Made for RiskThinking.AI
          </Typography>
        </Grid>
        <Grid item>
          <Link href="#">Privacy Policy</Link>
        </Grid>
        <Grid item>
          <Link href="#">Terms of Service</Link>
        </Grid>
        <Grid item>
          <Link target='_blank' href="riskthinking.ai">Data Provider</Link>
        </Grid>
       </Grid>
       <Box>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '2%', paddingBottom: '50px'}}>
            <img src={"https://s12.gifyu.com/images/vercel.png"} alt="vercel logo" style={{ width: '110px', height: '28px', opacity: '0.8' }} />
        </div>
      </Box>   
    </Paper>
  );
};

export default Footer;
