import { useEffect, useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import EditIcon from '@mui/icons-material/Edit'
import HelpIcon from '@mui/icons-material/Help'
import StreamDialog from './StreamDialog'
import { streamStates, streamTypes, State, Stream } from './model'

interface StreamTableProps {
  streams: Stream[],
  handleJson: () => void
  enabledAutoSave: boolean;
  setState: (state: State) => void;
  setEnabledAutoSave: (enabled: boolean) => void;
}

const defaultStream: Stream = {
  id: '',
  inputTemperature: '',
  outputTemperature: '',
  heatLoad: '',
  type: '',
  state: '',
  cost: '',
  reboilerOrReactor: false
}

type Mode = 'Added' | 'Deleted' |'Edited' | 'Undone'

interface StreamState {
  stream: Stream;
  initial: Stream;
  i?: number;
  mode?: Mode;
}

export interface SnackbarMessage {
  message: string;
  key: number;
}

const StreamTable = ({
  streams,
  handleJson,
  enabledAutoSave,
  setState,
  setEnabledAutoSave,
}: StreamTableProps) => {
  const [streamState, setStreamState] = useState<StreamState>({ stream: defaultStream, initial: defaultStream, i: undefined, mode: undefined })
  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([])
  const [messageState, setMessageState] = useState<SnackbarMessage | undefined>(undefined)

  useEffect(() => {
    setOpenSnackbar(false)
  }, [streams])

  useEffect(() => {
    if (snackPack.length && !messageState) {
      // Set a new snack when we don't have an active one
      setMessageState({ ...snackPack[0] })
      setSnackPack(prev => prev.slice(1))
      setOpenSnackbar(true)
    } else if (snackPack.length && messageState && openSnackbar) {
      // Close an active snack when a new one is added
      setOpenSnackbar(false)
    }
  }, [snackPack, messageState, openSnackbar])

  useEffect(() => {
    if (openSnackbar) {
      setOpenSnackbar(false)
    }
  }, [streamState])

  const setStream = (stream: Stream) => {
    setStreamState({ ...streamState, stream })
  }

  const handleOpenDialog = (mode: Mode, stream: Stream, i?: number) => {
    setStreamState({ stream, i, mode, initial: stream })
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleAddOrSaveStream = () => {
    if (streamState.mode === 'Added') {
      setState({ isValidated: false, streams: [...streams, streamState.stream] })
    } else if (streamState.mode === 'Edited') {
      const newStreams = [...streams]
      newStreams[streamState.i as number] = streamState.stream
      setState({ isValidated: false, streams: newStreams })
    }
    setOpenDialog(false)
    setSnackPack(prev => [...prev, { message: streamState.mode as string, key: new Date().getTime() }]);
  }

  const handleDeleteStream = (stream: Stream, i: number) => {
    const mode = 'Deleted'
    setStreamState({ stream, i, mode, initial: stream })
    setState({ isValidated: false, streams: [...streams.filter((_, j) => i !== j)] })
    setSnackPack(prev => [...prev, { message: mode, key: new Date().getTime() }]);
  }

  const handleUndo = () => {
    if (streamState.mode === 'Added') {
      setState({ isValidated: false, streams: [...streams.filter(s => s.id !== streamState.stream.id)] })
    } else if (streamState.mode === 'Deleted') {
      const newStreams = [...streams]
      newStreams.splice(streamState.i as number, 0, streamState.stream)
      setState({ isValidated: false, streams: newStreams})
    } else if (streamState.mode === 'Edited') {
      setState({ isValidated: false, streams: [...streams.map(s => {
        if (s.id === streamState.stream.id) {
          return streamState.initial
        } else {
          return s
        }
      })]})
    }
    const mode = 'Undone'
    setStreamState({ stream: defaultStream, initial: defaultStream, i: undefined, mode })
    setSnackPack(prev => [...prev, { message: mode, key: new Date().getTime() }]);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnabledAutoSave(event.target.checked)
  }

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleExited = () => {
    setMessageState(undefined);
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
        <Tooltip title="Add stream">
          <IconButton onClick={() => handleOpenDialog('Added', defaultStream)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Box sx={{ flexGrow: 1}} />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography>
              Auto Save
            </Typography>
            <Tooltip title="Save streams to localStrage automatically.">
              <HelpIcon sx={{ fontSize: 16 }} />
            </Tooltip>
          </Box>
          <Switch
            checked={enabledAutoSave}
            onChange={handleChange}
          />
        </Box>
      </Box>

      <Paper>
        <TableContainer>
          <Table padding='normal' sx={{ minWidth: '1152px' }}>
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Input temp. [℃]</TableCell>
                <TableCell align="center">Output temp. [℃]</TableCell>
                <TableCell align="center">Heat load [W]</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">State</TableCell>
                <TableCell align="center">Cost [¥/W]</TableCell>
                <TableCell align="center">
                  High load
                  <Tooltip title="Check if used in reboiler or reactor.">
                    <HelpIcon sx={{ fontSize: 16 }} />
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {streams.map((stream, i) => (
                <TableRow key={i}>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton size='small' onClick={() => handleOpenDialog('Edited', stream, i)}>
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size='small' onClick={() => handleDeleteStream(stream, i)}>
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">{stream.id}</TableCell>
                  <TableCell align="center">{stream.inputTemperature}</TableCell>
                  <TableCell align="center">{stream.outputTemperature}</TableCell>
                  <TableCell align="center">{stream.heatLoad}</TableCell>
                  <TableCell align="center">{streamTypes.find(v => v.value === stream.type)?.displayValue}</TableCell>
                  <TableCell align="center">{streamStates.find(v => v.value === stream.state)?.displayValue}</TableCell>
                  <TableCell align="center">{stream.cost}</TableCell>
                  <TableCell align="center">
                    {stream.reboilerOrReactor && (<CheckIcon sx={{ fontSize: 16 }} />)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', py: 1 }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<DownloadIcon />}
          onClick={handleJson}
          sx={{ borderRadius: 4, paddingLeft: 8, paddingRight: 8 }}
          disabled={streams.length === 0}
        >
          JSON
        </Button>
      </Box>
      <StreamDialog
        open={openDialog}
        onClose={handleCloseDialog}
        stream={streamState.stream}
        i={streamState.i}
        streams={streams}
        setStream={setStream}
        onClick={handleAddOrSaveStream}
      />
      <Snackbar
        key={messageState?.key}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        TransitionProps={{ onExited: handleExited }}
        message={messageState?.message}
        action={<>
        {messageState?.message !== 'Undone' && (
          <Button
            sx={{
              color: '#aecbfa',
              py: 0,
              '&:hover' : {
                backgroundColor: 'rgba(107,165,237,.15)'
              },
            }}
            size="small"
            variant="text"
            color="secondary"
            onClick={handleUndo}
          >
            Undo
          </Button>
        )}
        <IconButton
          size="small"
          color="inherit"
          onClick={handleCloseSnackbar}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        </>}
      />
    </Box>
  )
}

export default StreamTable;
