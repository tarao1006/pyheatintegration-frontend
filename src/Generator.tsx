import { useEffect, useState, SyntheticEvent } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import IndicatorButton from './IndicatorButton'
import { Images, Stream, BACKEND_URL } from './model'

interface GeneratorProps {
  streams: Stream[],
  temp: number | '',
  setImages: (images: Images) => void,
  setZip: (zip: string) => void,
  isValidated: boolean;
  isValidForm: boolean;
}

const Generator = ({
  streams,
  temp,
  setImages,
  setZip,
  isValidated,
  isValidForm
}: GeneratorProps) => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessage('')
  }, [streams])

  const handleGeneration = async () => {
    const response = await fetch(`${BACKEND_URL}/run`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        streams: streams,
        minimumTempDiff: temp,
      }),
    })

    const data = await response.json()

    if (data.succeeded) {
      setMessage('')
      setZip(data.zip)
      setImages(data.images)
    } else {
      setMessage(data.message)
    }

    return data.succeeded
  }

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setMessage('')
  }

  return (
    <Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 1 }}>
        <IndicatorButton
          disabled={!isValidated || !isValidForm || temp === ''}
          onValidation={handleGeneration}
        >
          Generate
        </IndicatorButton>
      </Box>
      {message && (
        <Alert severity="error" onClose={handleCloseAlert}>
          {message}
        </Alert>
      )}
    </Box>
  )
}

export default Generator
