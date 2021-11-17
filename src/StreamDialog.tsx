import { useEffect, useState, ChangeEvent, SyntheticEvent } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { isEmpty, isValid, streamStates, streamTypes, PropertyError, Stream } from './model'

interface StreamDialogProps {
  open: boolean;
  onClose: () => void;
  stream: Stream;
  streams: Stream[];
  i?: number;
  setStream: (stream: Stream) => void;
  onClick: () => void;
}

const StreamDialog = ({
  open,
  onClose,
  stream,
  streams,
  i,
  setStream,
  onClick
}: StreamDialogProps) => {
  const [emptyErrors, setEmptyErrors] = useState<PropertyError[]>([])
  const [modelError, setModelError] = useState<{ message: string, fields: string[]} | undefined>(undefined)

  useEffect(() => {
    if (open) {
      setEmptyErrors([])
      setModelError(undefined)
    }
  }, [open])

  const handleChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    setStream({ ...stream, id: event.target.value })
    setEmptyErrors([...emptyErrors.filter(e => e.property !== 'id')])

    if (modelError?.fields.includes('id')) {
      setModelError(undefined)
    }
  }

  const handleChangeInputTemperature = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setStream({ ...stream, inputTemperature: newValue === '' ? newValue : Number(newValue) })
    setEmptyErrors([...emptyErrors.filter(e => e.property !== 'inputTemperature')])

    if (modelError?.fields.includes('inputTemperature')) {
      setModelError(undefined)
    }
  }

  const handleChangeOutputTemperature = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setStream({ ...stream, outputTemperature: newValue === '' ? newValue : Number(newValue) })
    setEmptyErrors([...emptyErrors.filter(e => e.property !== 'outputTemperature')])

    if (modelError?.fields.includes('outputTemperature')) {
      setModelError(undefined)
    }
  }

  const handleChangeHeatLoad = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setStream({ ...stream, heatLoad: newValue === '' ? newValue : Number(newValue) })
    setEmptyErrors([...emptyErrors.filter(e => e.property !== 'heatLoad')])

    if (modelError?.fields.includes('heatLoad')) {
      setModelError(undefined)
    }
  }

  const handleChangeCost = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setStream({ ...stream, cost: newValue === '' ? newValue : Number(newValue) })
    setEmptyErrors([...emptyErrors.filter(e => e.property !== 'cost')])

    if (modelError?.fields.includes('cost')) {
      setModelError(undefined)
    }
  }

  const handleChangeType = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string
    setStream({ ...stream, type: newValue === '' ? newValue : Number(newValue) })
    setEmptyErrors([...emptyErrors.filter(e => e.property !== 'type')])

    if (modelError?.fields.includes('type')) {
      setModelError(undefined)
    }
  }

  const handleChangeState = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string
    setStream({ ...stream, state: newValue === '' ? newValue : Number(newValue) })
    setEmptyErrors([...emptyErrors.filter(e => e.property !== 'state')])

    if (modelError?.fields.includes('state')) {
      setModelError(undefined)
    }
  }

  const handleChangeReboilerOrReactor = (event: ChangeEvent<HTMLInputElement>) => {
    setStream({ ...stream, reboilerOrReactor: event.target.checked })
  }

  const handleClick = () => {
    const emptyErrors = isEmpty(stream)

    if (emptyErrors.length !== 0) {
      setEmptyErrors(emptyErrors)
      return
    }

    if (streams.some((s, j) => s.id === stream.id && i !== j)) {
      setModelError({
        message: 'This id is already used.',
        fields: ['id'],
      })
      return
    }

    const newModelError = isValid(stream)
    if (newModelError !== undefined) {
      setModelError(newModelError)
      return
    }

    onClick()
  }

  const handleClose = () => {
    onClose()
  }

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    if (modelError) {
      setModelError({ ...modelError, message: '' })
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
    >
      <DialogTitle>
        {stream ? "Edit stream" : "Add stream"}
      </DialogTitle>
      <Grid container spacing={1} sx={{ px: 2, boxSizing: 'border-box' }} alignItems="center">
        {modelError?.message && (
          <Grid item xs={12} sm={12}>
            <Alert severity="error" onClose={handleCloseAlert}>
              {modelError.message}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={12}>
          <TextField
            label="ID"
            required
            sx={{ width: '100%' }}
            variant="standard"
            value={stream.id}
            onChange={handleChangeId}
            error={emptyErrors.some(e => e.property === 'id') || modelError?.fields.includes('id')}
            helperText={emptyErrors.find(e => e.property === 'id')?.message || ' '}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Input temp. [℃]"
            sx={{ width: '100%' }}
            variant="standard"
            type="number"
            value={stream.inputTemperature}
            onChange={handleChangeInputTemperature}
            error={emptyErrors.some(e => e.property === 'inputTemperature') || modelError?.fields.includes('inputTemperature')}
            helperText={emptyErrors.find(e => e.property === 'inputTemperature')?.message || ' '}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Output temp. [℃]"
            sx={{ width: '100%' }}
            variant="standard"
            type="number"
            value={stream.outputTemperature}
            onChange={handleChangeOutputTemperature}
            error={emptyErrors.some(e => e.property === 'outputTemperature') || modelError?.fields.includes('outputTemperature')}
            helperText={emptyErrors.find(e => e.property === 'outputTemperature')?.message || ' '}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Heat load [W]"
            sx={{ width: '100%' }}
            variant="standard"
            type="number"
            value={stream.heatLoad}
            onChange={handleChangeHeatLoad}
            error={emptyErrors.some(e => e.property === 'heatLoad') || modelError?.fields.includes('heatLoad')}
            helperText={emptyErrors.find(e => e.property === 'heatLoad')?.message || ' '}
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <FormControl
            required
            variant="standard"
            sx={{ width: '100%' }}
            error={emptyErrors.some(e => e.property === 'type') || modelError?.fields.includes('type')}
          >
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              value={stream.type.toString()}
              onChange={handleChangeType}
            >
              {streamTypes.map((v, i) => (<MenuItem key={i} value={v.value}>{v.displayValue}</MenuItem>))}
            </Select>
            <FormHelperText>{emptyErrors.find(e => e.property === 'type')?.message || ' '}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={10}>
          <FormControl
            required
            variant="standard"
            sx={{ width: '100%' }}
            error={emptyErrors.some(e => e.property === 'state') || modelError?.fields.includes('state')}
          >
            <InputLabel>State</InputLabel>
            <Select
              label="State"
              value={stream.state.toString()}
              onChange={handleChangeState}
            >
              {streamStates.map((v, i) => (<MenuItem key={i} value={v.value}>{v.displayValue}</MenuItem>))}
            </Select>
            <FormHelperText>{emptyErrors.find(e => e.property === 'state')?.message || ' '}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            label="Cost [¥/W]"
            sx={{ width: '100%' }}
            variant="standard"
            type="number"
            value={stream.cost}
            onChange={handleChangeCost}
            error={emptyErrors.some(e => e.property === 'cost') || modelError?.fields.includes('cost')}
            helperText={emptyErrors.find(e => e.property === 'cost')?.message || ' '}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={<Checkbox
              onChange={handleChangeReboilerOrReactor}
            />}
            label="High load"
            checked={stream.reboilerOrReactor}
          />
        </Grid>
      </Grid>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          {stream ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StreamDialog