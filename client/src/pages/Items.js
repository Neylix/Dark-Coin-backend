import React, { useState } from 'react'
import Divider from '@mui/material/Divider'
import Item from '../components/Item';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles'
import useEvent from '../utils/eventContext';
import SnackAlert from '../components/SnackAlert';
import SetItemDialog from '../components/SetItemDialog';
import modes from '../utils/dialogMode';

const useStyle = makeStyles(theme => ({
  newButton: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  }
}));

function Items() {
  const classes = useStyle();
  const eventContext = useEvent();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [snackParams, setSnackParams] = useState({
    open: false,
    message : undefined,
    severity: undefined
  });

  const handleDeleteItem = () => {
    setSnackParams({open: false});
    setSnackParams({
      open: true,
      message: 'Article supprimé !',
      severity: 'success'
    });
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackParams({open: false});
  }

  return (
    <>
      {/* Popup / Dialog and things depending user actions */}
      <SnackAlert
        open={snackParams.open}
        severity={snackParams.severity}
        message={snackParams.message}
        handleOnClose={handleCloseSnack}
      />

      <SetItemDialog
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
        mode={modes.CREATE}
        item={undefined}
      />

      {/* Constant page */}
      <Button
        color='success'
        className={classes.newButton}
        variant ='contained'
        onClick={() => setCreateDialogOpen(true)}
      >
        Créer un article
      </Button>

      <Divider />

      <Grid container spacing={1.5} marginTop={0}>
        {eventContext.items.map((item, index) => (
          <Grid item key={index} xs={12} sm={4} md={3} lg={2.4} xl={1.5}>
            <Item item={item} handleDeleteItem={handleDeleteItem} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Items;