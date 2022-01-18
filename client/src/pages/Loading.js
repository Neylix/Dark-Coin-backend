import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Logo from '../assets/logo.png'

const useStyles = makeStyles(() => ({
  avatar: {
    width: 250,
    height: 250
  },
  loader: {
    position: 'absolute'
  }
}));

function Loading() {
  const classes = useStyles();
  return (
    <Box
      display="flex" 
      height='100%'
      width='100%'
      alignItems="center"
      justifyContent="center"
      position='fixed'
    >
      <CircularProgress
        size={200}
        className={classes.loader}
        thickness={1}
        color='inherit'
      />
      <Avatar
        className={classes.avatar}
        src={Logo}
      />
    </Box>
  )
}

export default Loading;