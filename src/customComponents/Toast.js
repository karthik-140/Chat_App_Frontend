import { Box, IconButton, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'

const Toast = ({ message, severity }) => {
  const icon = severity === 'success' ? <CheckCircleIcon /> : <ErrorIcon />
  const bgColor = severity === 'success' ? 'bg-green-500' : 'bg-red-500'
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
  }

  return (
    <Box
      className={`flex gap-2 fixed bottom-10 right-10 p-2 rounded-lg ${bgColor} text-white`}
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s' }}
      display="flex"
      alignItems="center"
    >
      {icon}
      <Typography className="ml-4">{message}</Typography>
      <IconButton className="ml-auto" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

export default Toast
