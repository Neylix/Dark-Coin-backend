import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
// import { makeStyles } from '@mui/styles'
import useEvent from '../utils/eventContext';
import PropTypes from 'prop-types'
import SnackAlert from './SnackAlert';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import modes from '../utils/dialogMode';
import Stack from '@mui/material/Stack'

// const useStyle = makeStyles(theme => ({
//   newButton: {
//     marginTop: theme.spacing(1.5),
//     marginBottom: theme.spacing(1.5)
//   }
// }));

function SetItemDialog({ open, setOpen, mode, item }) {
  // const classes = useStyle();
  const eventContext = useEvent();
  const [itemPrice, setItemPrice] = useState(() => {
    if (mode === modes.UPDATE) {
      return item.price
    } else {
      return ''
    }
  });

  const [snackParams, setSnackParams] = useState({
    open: false,
    message: undefined,
    severity: undefined
  });
  const [diagError, setDiagError] = useState({
    nameError: false,
    nameErrorText: '',
    priceError: false,
    priceErrorText: ''
  })

  useEffect(() => {
    mode === modes.CREATE ? setItemPrice('') : setItemPrice(item.price);

    setDiagError({
      nameError: false,
      nameErrorText: '',
      priceError: false,
      priceErrorText: ''
    })
  }, [open])

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackParams({ open: false });
  }

  const handlePriceChange = (event) => {
    const re = /^\d+(\.\d{0,2})?$/;
    if (re.test(event.target.value) || event.target.value.length === 0) {
      setItemPrice(event.target.value);
    }
  }

  const setItem = (event) => {
    event.preventDefault();

    const nameError = event.target.name.value === ''
    const priceError = event.target.price.value === ''

    if (nameError || priceError) {
      setDiagError({
        nameError: nameError,
        nameErrorText: nameError ? 'Champ requis' : '',
        priceError: priceError,
        priceErrorText: priceError ? 'Champ requis' : ''
      })

      return;
    } else {
      setDiagError({
        nameError: false,
        nameErrorText: '',
        priceError: false,
        priceErrorText: ''
      })
    }

    const tempItem = {
      uniqueId: mode === modes.CREATE ? undefined : item.uniqueId,
      eventId: eventContext.selectedEvent.uniqueId,
      name: event.target.name.value,
      price: event.target.price.value
    }

    const prom = mode === modes.CREATE ? 
      eventContext.createItem(tempItem) : 
      eventContext.updateItem(tempItem)

    prom.then(() => {

      setSnackParams({ open: false });
      setSnackParams({
        open: true,
        message: mode === modes.CREATE ? 'Article créé !' : 'Article modifié !',
        severity: 'success'
      });

      setOpen(false);
    }).catch(() => {
      setSnackParams({ open: false });
      setSnackParams({
        open: true,
        message: mode === modes.CREATE ? 
          'Erreur lors de la création de l\'article !' : 
          'Erreur lors de la modification de l\'article !',
        severity: 'error'
      });
    })
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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {mode === modes.CREATE ? 'Créer un article' : 'Modification de l\'article ' + item.name}
        </DialogTitle>
        <form id='alert-dialog-description' onSubmit={setItem} noValidate>
          <DialogContent>
            <Stack spacing={3}>
              <TextField
                variant='outlined'
                label='Nom'
                id='name'
                fullWidth
                autoFocus
                required
                defaultValue={mode === modes.UPDATE ? item.name : ''}
                error={diagError.nameError}
                helperText={diagError.nameErrorText}
              />

              <TextField
                variant='outlined'
                label='Prix'
                id='price'
                type='number'
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position='start'>€</InputAdornment>
                }}
                onChange={handlePriceChange}
                value={itemPrice}
                required
                error={diagError.priceError}
                helperText={diagError.priceErrorText}
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button
              variant='outlined'
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant='outlined'
              color='success'
              type='submit'
            >
              {mode === modes.CREATE ? 'Créer' : 'Modifier'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

SetItemDialog.propTypes = {
  item: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleSet: PropTypes.func,
  mode: PropTypes.string
}

export default SetItemDialog;