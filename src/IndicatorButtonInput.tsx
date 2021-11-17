import { useState, ReactNode } from 'react'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'

const IndicatorButtonInput = ({
  onValidation,
  children
}: {
  onValidation?: () => Promise<boolean>,
  children: ReactNode
}) => {
  const [loading, setLoading] = useState(false)

  const [showValidationSuccessIndicator, setShowValidationSuccessIndicator] = useState(false)
  const [showValidationErrorIndicator, setShowValidationErrorIndicator] = useState(false)

  const handleValidation = async () => {
    if (onValidation) {
      setLoading(true)
      const succeeded = await onValidation()
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
    }
  }

  return (
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
        {children}
      </Box>
    </LoadingButton>
  )
}

export default IndicatorButtonInput
