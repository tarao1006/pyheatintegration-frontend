import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Footer from './Footer'
import Header from './Header'
import StyledLink, { OuterLink } from './Link'

const Terms = () => {

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
            Terms of Service
          </Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">
            November 18, 2021
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h5">
            1. Introduction
          </Typography>
        </Box>

        <Box
          sx={{ mb: 1 }}
        >
          The Heat Integration ("Site") is a website for <OuterLink href="https://en.wikipedia.org/wiki/Pinch_analysis" target="_blank">pinch analysis</OuterLink>,
          owned by Taiga Katarao ("I").
          Please read the terms of this entire document ("Terms") carefully because it explains your
          rights and responsibilities when you visit this site.
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h5">
            2. Use of Image
          </Typography>
        </Box>

        <Box
          sx={{ mb: 1 }}
        >
          The images generated by this Site can be used without approval, but this Site does not guarantee the accuracy.
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h5">
            3. Disclaimer
          </Typography>
        </Box>

        <Box
          sx={{ mb: 1 }}
        >
          THIS SITE IS PROVIDED "AS IS" WITH ALL FAULTS. TO THE EXTENT PERMITTED BY LAW, THIS SITE DISCLAIMS ALL WARRANTIES AND REPRESENTATIONS OF ANY KIND, INCLUDING WITHOUT LIMITATION WARRANTIES OF FITNESS FOR PARTICULAR PURPOSE, WHETHER EXPRESS OR IMPLIED.
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h5">
            4. Modification
          </Typography>
        </Box>

        <Box
          sx={{ mb: 1 }}
        >
          I may update these Terms from time to time to address a new feature or to clarify a provision.
          The updated Terms will be posted online.
          Your continued use of this Site after the effective date of such changes constitutes your acceptance of such changes.
          To make your review more convenient, I wil post an effective date at the top of this page.
        </Box>

      </Container>
      <Footer />
    </Box>
  )
}

export default Terms