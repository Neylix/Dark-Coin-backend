import React from 'react'
import Divider from '@mui/material/Divider'
import useEvent from '../utils/eventContext'
// import { makeStyles } from '@mui/styles'

// const useStyle = makeStyles(() => ({
//   skeleton: {
//     display: 'inline-block'
//   }
// }))
function Event() {
  // const classes = useStyle();
  const eventContext = useEvent();
  return (
    <>
      <h1>Événement {eventContext.selectedEvent.name} </h1>
      <Divider />

    </>
  )
}

export default Event;