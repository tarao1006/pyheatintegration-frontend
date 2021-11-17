import { useEffect, useState, SyntheticEvent } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import IndicatorButton from './IndicatorButton'
import { Range, State, Stream, BACKEND_URL } from './model'

interface ValidatorProps {
  streams: Stream[],
  setState: (state: State) => void;
  setTempRange: (tempRange: Range) => void;
  isValidated: boolean;
}

const Validator = ({
  streams,
  setState,
  setTempRange,
  isValidated
}: ValidatorProps) => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessage('')
  }, [streams])

  const handleValidation = async () => {
    setMessage('')

    const response = await fetch(`${BACKEND_URL}/validate`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ streams }),
    })

    const data = await response.json()

    if (data.succeeded) {
      setState({ isValidated: true, streams: streams })
      setTempRange(data.minimumTempDiffRange as Range)
    } else {
      setMessage(data.message)
      setState({ isValidated: false, streams: streams })
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
          disabled={isValidated}
          onValidation={handleValidation}
        >
          Validate
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

export default Validator
