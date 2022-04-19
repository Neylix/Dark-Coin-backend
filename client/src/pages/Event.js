import React, {useState} from 'react'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import SetEventDialog from '../components/SetEventDialog'
import { makeStyles } from '@mui/styles'
import modes from '../utils/dialogMode'
import useEvent from '../utils/eventContext'

const useStyle = makeStyles(theme => ({
  updateButton: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  }
}));
function Event() {
  const classes = useStyle();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const eventContext = useEvent();

  return (
    <>
      <SetEventDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        mode={modes.UPDATE}
        event={eventContext.selectedEvent}
      />

      <Button
        color='primary'
        className={classes.updateButton}
        variant ='contained'
        onClick={() => setUpdateDialogOpen(true)}
      >
        {"Modifier l'événement"}
      </Button>

      <Divider />
    </>
  )
}

export default Event;