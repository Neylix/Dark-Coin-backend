import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import SnackAlert from './SnackAlert'
import useEvent from '../utils/eventContext'

const useStyles = makeStyles(theme => ({
  deleteItemName: {
    fontWeight: 'bold'
  },
  deleteWarningText: {
    color: theme.palette.warning.main
  }
}));

function DeleteItemDialog({ item, open, setOpen, handleDeleteItem }) {
  const classes = useStyles();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(undefined);
  const eventContext = useEvent();

  const delItem = () => {
    eventContext.deleteItem(item).then(() => {
      setOpen(false);
      handleDeleteItem();
    }).catch(() => {
      setSnackOpen(false);
      setSnackMessage('Erreur lors de la suppression de l\'article !');
      setSnackOpen(true);
    })
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  }

  const deleteContentText = () => {
    let text = undefined
    // Test if this item is assoociated to a role
    if (eventContext.selectedEvent.roles.length > 0) {
      for (let role of eventContext.selectedEvent.roles) {
        if (role.items.find(itemId => itemId == item.uniqueId)) {
          text = 'Attention, cet article est associé à un role'
          break
        }
      }
    }

    if (item.itemStatistics.length > 0) {
      if (text) {
        text += ' et contient des statistiques'
      } else {
        text = 'Attention, cet article contient des statistiques'
      }
    }

    return (
      <>
        <span className={classes.deleteItemName}>{item.name}</span>
        {text ? (
          <>
            <br />
            <span className={classes.deleteWarningText}>{text}</span>
          </>
        ) : ''}
      </>
    )
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Voulez-vous supprimer cet article ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteContentText()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant='outlined' color='error' onClick={delItem}>Supprimer</Button>
        </DialogActions>
      </Dialog>

      <SnackAlert
        open={snackOpen}
        severity="error"
        message={snackMessage}
        handleOnClose={handleCloseSnack}
      />
    </>
  )
}

DeleteItemDialog.propTypes = {
  item: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleDeleteItem: PropTypes.func
}

export default DeleteItemDialog;