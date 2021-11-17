import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import DownloadIcon from '@mui/icons-material/Download'
import Footer from './Footer'
import Form from './Form'
import Gallery from './Gallery'
import Generator from './Generator'
import Header from './Header'
import StreamTable from './StreamTable'
import Uploader from './Uploader'
import Validator from './Validator'
import { download } from './download'
import { Images, Range, State } from './model'

const App = () => {
  const [state, setState] = useState<State>({ isValidated: false, streams:[] })
  const [tempRange, setTempRange] = useState<Range | undefined>(undefined)
  const [temp, setTemp] = useState<number | ''>('')
  const [zip, setZip] = useState<string | undefined>(undefined)
  const [images, setImages] = useState<Images | undefined>(undefined)
  const [enabledAutoSave, setEnabledAutoSave] = useState<boolean>(true)

  const [isValidForm, setIsValidForm] = useState(true)

  useEffect(() => {
    const savedState = localStorage.getItem('state')
    if (savedState !== null) {
      const parsedSavedState: State = JSON.parse(savedState)
      setState({isValidated: false, streams: parsedSavedState.streams})
    } else {
      localStorage.setItem('state', JSON.stringify(state))
    }

    const savedEnabled = localStorage.getItem('enabledAutoSave')
    if (savedEnabled !== null) {
      const parsedSavedEnabled: boolean = JSON.parse(savedEnabled)
      setEnabledAutoSave(parsedSavedEnabled)
    } else {
      localStorage.setItem('enabledAutoSave', JSON.stringify(enabledAutoSave))
    }
  }, [])

  useEffect(() => {
    if (enabledAutoSave) {
      localStorage.setItem('state', JSON.stringify(state))
    }
  }, [state])

  useEffect(() => {
    setTemp('')
    if (!state.isValidated) {
      setTempRange(undefined)
    }
  }, [state])

  useEffect(() => {
    localStorage.setItem('enabledAutoSave', JSON.stringify(enabledAutoSave))
    if (enabledAutoSave) {
      localStorage.setItem('state', JSON.stringify(state))
    } else {
      localStorage.removeItem('state')
    }
  }, [enabledAutoSave])

  const handleZip = () => {
    if (zip) {
      const source = `data:application/zip;base64,${zip}`
      download(source, 'data.zip')
    }
  }

  const handleJson = () => {
    if (state.streams.length !== 0) {
      const blob = new Blob([JSON.stringify({streams: state.streams}, null, ' ')], {type: 'application/json'})
      const source = URL.createObjectURL(blob)
      download(source, 'streams.json')
    }
  }

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
      <Box sx={{ mb: 2 }} />
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: 1 }}>
        <Uploader
          setState={setState}
          setTempRange={setTempRange}
          enabledAutoSave={enabledAutoSave}
        />

        <StreamTable
          streams={state.streams}
          handleJson={handleJson}
          enabledAutoSave={enabledAutoSave}
          setState={setState}
          setEnabledAutoSave={setEnabledAutoSave}
        />

        <Validator
          streams={state.streams}
          setState={setState}
          setTempRange={setTempRange}
          isValidated={state.isValidated}
        />

        <Form
          temp={temp}
          tempRange={tempRange}
          setTemp={setTemp}
          setIsValidForm={setIsValidForm}
          isValidated={state.isValidated}
        />

        <Generator
          streams={state.streams}
          temp={temp}
          setImages={setImages}
          setZip={setZip}
          isValidated={state.isValidated}
          isValidForm={isValidForm}
        />

        {zip && (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleZip}
            sx={{ borderRadius: 4, paddingLeft: 8, paddingRight: 8 }}
            disabled={!zip}
          >
            ZIP
          </Button>
        )}

        {images && (
          <Gallery images={images} />
        )}
      </Container>
      <Footer />
    </Box>
  )
}

export default App
