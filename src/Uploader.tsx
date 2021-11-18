import { useState, ChangeEvent, SyntheticEvent } from 'react';
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import { download } from './download'
import { Range, State, Stream, BACKEND_URL } from './model'

interface UploaderProps {
  setState: (state: State) => void;
  setTempRange: (tempRange: Range) => void;
  enabledAutoSave: boolean;
}

const Uploader = ({
  setState,
  setTempRange,
  enabledAutoSave
}: UploaderProps) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [showValidationSuccessIndicator, setShowValidationSuccessIndicator] = useState(false)
  const [showValidationErrorIndicator, setShowValidationErrorIndicator] = useState(false)

  const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setMessage('')

    if (!event.target.files) {
      setLoading(false)
      return false
    }

    const formData = new FormData()
    formData.append('file', event.target.files[0])

    const response = await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data.succeeded) {
      const newState: State = { isValidated: true, streams: data.streams as Stream[] }
      setState(newState)
      setTempRange(data.minimumTempDiffRange as Range)
      if (enabledAutoSave) {
        localStorage.setItem('state', JSON.stringify(newState))
      }
    } else {
      setMessage(data.message)
      setState({ isValidated: false, streams: [] })
      localStorage.removeItem('state')
    }
    return data.succeeded as boolean
  }

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)

    if (!event.target.files) {
      setLoading(false)
      return
    }

    const succeeded = await onUpload(event)
    setLoading(false)

    if (succeeded) {
      setShowValidationSuccessIndicator(true)
      setTimeout(() => {
        setShowValidationSuccessIndicator(false)
      }, 1000)
    } else {
      setShowValidationErrorIndicator(true)
      setTimeout(() => {
        setShowValidationErrorIndicator(false)
      }, 1000)
    }

    event.target.value = ''
  }

  const handleDownload = () => {
    const template = {
      'streams': [
        {
          "id": "a",
          "inputTemperature": 140.0,
          "outputTemperature": 90.0,
          "heatLoad": 150.0,
          "type": 1,
          "state": 1,
          "cost": 0.0,
          "reboilerOrReactor": false
        }
      ]
    }

    const blob = new Blob([JSON.stringify(template, null, ' ')], {type: 'application/json'})
    const source = URL.createObjectURL(blob)
    download(source, 'template.json')
  }

  const handleExample = () => {
    setState({
      isValidated: true,
      streams: [
        {
          "id": "a",
          "inputTemperature": 40.0,
          "outputTemperature": 90.0,
          "heatLoad": 150.0,
          "type": 1,
          "state": 1,
          "cost": 0.0,
          "reboilerOrReactor": false
        },
        {
          "id": "b",
          "inputTemperature": 80.0,
          "outputTemperature": 110.0,
          "heatLoad": 180.0,
          "type": 1,
          "state": 1,
          "cost": 0.0,
          "reboilerOrReactor": true
        },
        {
          "id": "A",
          "inputTemperature": 125.0,
          "outputTemperature": 80.0,
          "heatLoad": 180.0,
          "type": 2,
          "state": 1,
          "cost": 0.0,
          "reboilerOrReactor": false
        },
        {
          "id": "B",
          "inputTemperature": 100.0,
          "outputTemperature": 60.0,
          "heatLoad": 160.0,
          "type": 2,
          "state": 1,
          "cost": 0.0,
          "reboilerOrReactor": false
        }
      ]
    })
    setTempRange({ min: 6.25, max: 15 })
  }

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setMessage('')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label htmlFor="upload">
        <input
          accept="application/json"
          id="upload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleUpload}
        />
        <LoadingButton
          component="span"
          variant="contained"
          color="primary"
          loading={loading}
          sx={{ borderRadius: 4, paddingLeft: 8, paddingRight: 8, py: 1 }}
          disabled={showValidationSuccessIndicator || showValidationErrorIndicator}
        >
          <TaskAltOutlinedIcon
            color="success"
            fontSize="medium"
            sx={{
              position: 'absolute',
              bottom: '50%',
              right: '50%',
              transform: 'translate(50%, 50%)',
              opacity: showValidationSuccessIndicator ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: '250ms',
              transitionTimingFunction: 'linear',
            }}
          />
          <ErrorOutlineOutlinedIcon
            color="error"
            fontSize="medium"
            sx={{
              position: 'absolute',
              bottom: '50%',
              right: '50%',
              transform: 'translate(50%, 50%)',
              opacity: showValidationErrorIndicator ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: '250ms',
              transitionTimingFunction: 'linear',
            }}
          />
          <Box
            sx={{
              color: showValidationSuccessIndicator || showValidationErrorIndicator ? 'transparent': 'inherit',
              transitionProperty: 'color',
              transitionDuration: '250ms',
              transitionTimingFunction: 'linear',
            }}
          >
            Upload
          </Box>
        </LoadingButton>
      </label>
      or
      <Stack direction="column" spacing={1} alignItems="center">
        <Box>
          <Button
            variant="text"
            disabled={loading}
            onClick={handleDownload}
          >
            Download Template
          </Button>
        </Box>

        <Box>
          <Button
            variant="text"
            disabled={loading}
            onClick={handleExample}
          >
            Run Example
          </Button>
        </Box>
      </Stack>

      {message && (
        <Alert severity="warning" onClose={handleClose}>
          {message}
        </Alert>
      )}
      <Box sx={{ mb: 1 }} />
    </Box>
  )
}

export default Uploader;
