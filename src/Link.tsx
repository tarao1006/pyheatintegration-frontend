import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Link as MuiLink } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { styled } from '@mui/material/styles'

const StyledLink = styled(Link)({
  textDecoration: 'none',
  '&:visited': {
    color: 'inherit',
  },
})

export const OuterLink = ({ href, children }: { href: string, children: ReactNode }) => {

  return (
    <MuiLink
      href={href}
      underline="hover"
      target="_blank"
      rel="noopener"
    >
      {children}
      <LaunchIcon sx={{ mx: 0.2, fontSize: 12 }} />
    </MuiLink>
  )
}

export default StyledLink
