import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
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
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'flex-start', minHeight: '72px' }}>
        <Box sx={{ mt: 1 }} />

        <StyledLink to="/">
          <Button startIcon={<ArrowBackIcon />} >
            Home
          </Button>
        </StyledLink>

        <ul>
          <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>

          <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>

          <li>Users may opt out of personalized advertising by visiting <OuterLink href="https://www.google.com/settings/ads" target="_blank">Ads Settings</OuterLink>. (Alternatively, you can direct users to opt out of a third-party vendor's use of cookies for personalized advertising by visiting <OuterLink href="http://www.aboutads.info/choices/" target="_blank">www.aboutads.info</OuterLink>.)</li>
        </ul>
      </Container>
    </Box>
  )
}

export default PrivacyPolicy