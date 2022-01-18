import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import PropTypes from 'prop-types'

export default function SnackAlert({ open, message, severity, handleOnClose}) {

  return(
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleOnClose}
    >
      <Alert
        variant='filled'
        onClose={handleOnClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

SnackAlert.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string,
  handleOnClose: PropTypes.func
}