import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Footer from './Footer'
import Header from './Header'
import StyledLink, { OuterLink } from './Link'

const PrivacyPolicy = () => {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        pb: '80px',
        boxSizing: 'border-box',
      }}
    >
      <Header />
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'flex-start', minHeight: '72px' }}>
        <Box sx={{ mt: 1 }} />

        <StyledLink to="/">
          <Button startIcon={<ArrowBackIcon />} >
            Home
          </Button>
        </StyledLink>

        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4">
            Privacy Policy
          </Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">
            November 18, 2021
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h5">
            Google AdSense
          </Typography>
        </Box>

        <Box
          sx={{ mb: 1 }}
        >
          Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
        </Box>

        <Box
          sx={{ mb: 1 }}
        >
          Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
        </Box>

        <Box
          sx={{ mb: 1 }}
        >
        Users may opt out of personalized advertising by visiting <OuterLink href="https://www.google.com/settings/ads" target="_blank">Ads Settings</OuterLink>. (Alternatively, you can direct users to opt out of a third-party vendor's use of cookies for personalized advertising by visiting <OuterLink href="http://www.aboutads.info/choices/" target="_blank">www.aboutads.info</OuterLink>.)
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default PrivacyPolicy