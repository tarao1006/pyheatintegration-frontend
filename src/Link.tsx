import { Link } from "react-router-dom"
import { styled } from '@mui/material/styles'

const StyledLink = styled(Link)({
  textDecoration: 'none',
  '&:visited': {
    color: 'inherit',
  },
})

const OuterLinkIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjEzIiBoZWlnaHQ9IjEzIiBmaWxsPSIjMWE3M2U4Ij48cGF0aCBkPSJNMTkgMTlINVY1aDdWM0g1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGMxLjEgMCAyLS45IDItMnYtN2gtMnY3ek0xNCAzdjJoMy41OWwtOS44MyA5LjgzIDEuNDEgMS40MUwxOSA2LjQxVjEwaDJWM2gtN3oiLz48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDBWMHoiLz48L3N2Zz4='

export const OuterLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
  '&:after': {
    content: '""',
    backgroundImage: `url(${OuterLinkIcon})`,
    backgroundRepeat: 'no-repeat',
    display: 'inline-block',
    height: '0.8rem',
    margin: '0 0.1rem',
    position: 'relative',
    top: '0.1rem',
    width: '0.8rem',
  },
}))

export default StyledLink
