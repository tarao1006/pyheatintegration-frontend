import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import GitHubIcon from '@mui/icons-material/GitHub'

const githubURL = "https://github.com/tarao1006/pyheatintegration"

const Header = () => {

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '64px' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="GitHub repository">
          <IconButton
            component="a"
            size="small"
            edge="start"
            color="inherit"
            href={githubURL}
          >
            <GitHubIcon
              sx={{ fontSize: 32 }}
            />
          </IconButton>
        </Tooltip>
      </Container>
    </AppBar>
  )
}

export default Header
