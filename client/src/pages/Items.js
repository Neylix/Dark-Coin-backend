import React, { useState } from 'react'
import Divider from '@mui/material/Divider'
import Item from '../components/Item';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles'
import useEvent from '../utils/eventContext';
import SnackAlert from '../components/SnackAlert';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { createItem } from '../utils/backend';

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
  const [itemPrice, setItemPrice] = useState('');
  const [snackParams, setSnackParams] = useState({
    open: false,
    message : undefined,
    severity: undefined
  });
  const [diagError, setDiagError] = useState({
    nameError: false,
    nameErrorText: '',
    priceError: false,
    priceErrorText: ''
  })

  const handleDeleteItem = (item) => {
    eventContext.deleteItem(item);

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

  const handleCloseCreateItem = () => {
    setCreateDialogOpen(false);
    setItemPrice('');
    setDiagError({
      nameError: false,
      nameErrorText: '',
      priceError: false,
      priceErrorText: ''
    })
  }

  const handlePriceChange = (event) => {
    const re = /^\d+(\.\d{0,2})?$/;
    if (re.test(event.target.value) || event.target.value.length === 0) {
      setItemPrice(event.target.value);
    }
  }

  const creItem = (event) => {
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

    const item = {
      eventId: eventContext.selectedEvent.uniqueId,
      name: event.target.name.value,
      price: event.target.price.value
    }

    createItem(item).then((itemId) => {
      item.uniqueId = itemId;
      item.itemStatistics = [];

      eventContext.createItem(item);

      setItemPrice('');

      setSnackParams({open: false});
      setSnackParams({
        open: true,
        message: 'Article créer !',
        severity: 'success'
      });

      setCreateDialogOpen(false);
    }).catch(() => {
      setSnackParams({open: false});
      setSnackParams({
        open: true,
        message: 'Erreur lors de la création de l\'article !',
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
        open={createDialogOpen}
        onClose={handleCloseCreateItem}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Créer un article
        </DialogTitle>
        <form id='alert-dialog-description' onSubmit={creItem} noValidate>
          <DialogContent>
            <TextField
              variant='outlined'
              label='Nom'
              id='name'
              fullWidth
              margin='dense'
              autoFocus
              required
              error={diagError.nameError}
              helperText={diagError.nameErrorText}
            />

            <TextField
              variant='outlined'
              label='Prix'
              id='price'
              type='number'
              fullWidth
              margin='dense'
              InputProps={{
                startAdornment: <InputAdornment position='start'>€</InputAdornment>
              }}
              onChange={handlePriceChange}
              value={itemPrice}
              required
              error={diagError.priceError}
              helperText={diagError.priceErrorText}
            />
          </DialogContent>

          <DialogActions>
            <Button
              variant='outlined'
              onClick={handleCloseCreateItem}
            >
              Annuler
            </Button>
            <Button
              variant='outlined'
              color='success'
              type='submit'
            >
              Créer
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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