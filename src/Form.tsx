import { useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Range } from './model'

interface FormProps {
  temp: number | string;
  tempRange?: Range;
  setTemp: (temp: number | '') => void;
  setIsValidForm: (valid: boolean) => void;
  isValidated: boolean;
}

const Form = ({
  temp,
  tempRange,
  setTemp,
  setIsValidForm,
  isValidated
}: FormProps) => {
  const [error, setError] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (tempRange !== undefined) {
      if (event.target.value === '') {
        setTemp('')
      } else {
        const newValue = Number(event.target.value)
        setTemp(newValue)
        if (newValue < tempRange.min || newValue > tempRange.max) {
          setError(true)
          setIsValidForm(false)
        } else {
          setError(false)
          setIsValidForm(true)
        }
      }
    }
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            color: isValidated ? 'black' : 'gray'
          }}
        >
          <Typography
            sx={{ fontWeight: 800, mr: { xs: 0, md: 1 }}}
          >
            Minimum approach temperature
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              error={error}
              variant="outlined"
              type="number"
              size="small"
              margin="dense"
              value={temp}
              onChange={handleChange}
              disabled={tempRange === undefined || !isValidated}
            />
            <Typography
              sx={{ mx: 1 }}
            >
              ℃
            </Typography>

            {tempRange !== undefined && (
              <Typography>
                ({tempRange.min} - {tempRange.max}℃)
              </Typography>
            )}
          </Box>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            color: 'gray',
            visibility: isValidated ? "hidden" : "visible",
          }}
        >
          <InfoOutlinedIcon
            sx={{
              fontSize: 16,
              mr: 1,
            }}
          />
          <Typography
            variant="body2"
          >
            Click validate button above to ensure streams are valid before input.
          </Typography>
        </Stack>
    </Box>
  )
}

export default Form;
