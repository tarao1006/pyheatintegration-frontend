import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors';

const Copyright = () => {

  return (
    <Typography variant="caption" color="text.secondary" align="center"
      sx={{
        color: grey[600],
        pt: '6px',
      }}
    >
      {'Copyright © Taiga Katarao '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <AppBar position="static" elevation={0} color="inherit" sx={{ backgroundColor: 'transparent', position: 'absolute', bottom: 0 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '72px' }}>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ width: '100%' }}
        >
          <Button
            component="a"
            href="#"
            sx={{
              color: grey[600],
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                color: grey[900],
              }
            }}
          >
            Privacy Policy
          </Button>
        </Stack>
        <Copyright />
      </Container>
    </AppBar>
  )
}

export default Footer
