import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DownloadIcon from '@mui/icons-material/Download'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { download } from './download'
import { Images } from './model'

interface GalleryProps {
  images: Images;
}

const base64source = (base64?: string) => {
  if (base64 === undefined) {
    return `https://picsum.photos/id/1024/210/120`
  }
  return `data:image/png;base64,${base64}`
}

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

const DownloadIconButton = styled(IconButton)({
  color: 'inherit',
  visibility: 'hidden',
  position: 'absolute',
  zIndex: 2,
  bottom: '5%',
  right: '5%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
})

const DownloadableImg = ({ src, filename }: { src: string, filename: string }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  const handleDownload = () => {
    download(src, filename)
  }

  return (
    <Box
      sx={{
        '&:hover button': {
          visibility: 'visible',
        },
      }}
    >
      <Img
        src={src}
      />
      <Tooltip title="Download">
        <DownloadIconButton
          onClick={handleDownload}
          sx={{
            border: 1,
            borderColor: 'gray',
            '&:hover': {
              border: 1,
              borderColor: 'gray',
            },
           }}
          disableFocusRipple
          disableRipple
        >
          <DownloadIcon
            fontSize={matches ? "medium" : "small"}
          />
        </DownloadIconButton>
      </Tooltip>
    </Box>
  )
}

const Gallery = ({
  images
}: GalleryProps) => {

  return (
    <Box>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item xs={8} md={3} sx={{ position: 'relative' }}>
          <DownloadableImg src={base64source(images.gcc)} filename="gcc.png" />
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item xs={8} md={3} sx={{ position: 'relative' }}>
          <DownloadableImg src={base64source(images.tq)} filename="tq.png" />
        </Grid>
        <Grid item xs={8} md={3} sx={{ position: 'relative' }}>
          <DownloadableImg src={base64source(images.tq_separated)} filename="tq_separated.png" />
        </Grid>
        <Grid item xs={8} md={3} sx={{ position: 'relative' }}>
          <DownloadableImg src={base64source(images.tq_split)} filename="tq_split.png" />
        </Grid>
        <Grid item xs={8} md={3} sx={{ position: 'relative' }}>
          <DownloadableImg src={base64source(images.tq_merged)} filename="tq_merged.png" />
        </Grid>
        <Grid item xs={8} md={3} sx={{ position: 'relative' }}>
          <DownloadableImg src={base64source(images.tq_with_vlines)} filename="tq_with_vlines.png" />
        </Grid>
        <Grid item xs={8} md={3} sx={{ position: 'relative' }}>
          <DownloadableImg src={base64source(images.tq_separated_with_vlines)} filename="tq_separated_with_vlines.png" />
        </Grid>
        <Grid item xs={8} md={3} sx={{ position: 'relative' }}>
          <DownloadableImg src={base64source(images.tq_split_with_vlines)} filename="tq_split_with_vlines.png" />
        </Grid>
        <Grid item xs={8} md={3} sx={{ position: 'relative' }}>
          <DownloadableImg src={base64source(images.tq_merged_with_vlines)} filename="tq_merged_with_vlines.png" />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Gallery
