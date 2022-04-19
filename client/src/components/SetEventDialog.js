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
import modes from '../utils/dialogMode';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import frLocale from 'date-fns/locale/fr';
import Stack from '@mui/material/Stack'
import Hidden from '@mui/material/Hidden'

// const useStyle = makeStyles(theme => ({
//   newButton: {
//     marginTop: theme.spacing(1.5),
//     marginBottom: theme.spacing(1.5)
//   }
// }));

function SetEventDialog({ open, setOpen, mode, event }) {
  // const classes = useStyle();
  const eventContext = useEvent();
  let dateError = false

  const [beginingDate, setBeginingDate] = useState(() => {
    if (mode === modes.UPDATE) {
      return new Date(event.beginingDate)
    } else {
      return new Date(Date.now())
    }
  });

  const [endingDate, setEndingDate] = useState(() => {
    if (mode === modes.UPDATE) {
      return new Date(event.endingDate)
    } else {
      return new Date(Date.now())
    }
  });

  const [snackParams, setSnackParams] = useState({
    open: false,
    message: undefined,
    severity: undefined
  });
  const [diagError, setDiagError] = useState({
    nameError: false,
    nameErrorText: ''
  })

  useEffect(() => {
    if (event) {
      setBeginingDate(new Date(event.beginingDate))
      setEndingDate(new Date(event.endingDate))
    } else {
      setBeginingDate(new Date(Date.now()))
      setEndingDate(new Date(Date.now()))
    }

    setDiagError({
      nameError: false,
      nameErrorText: ''
    })
  }, [open])

  const handleBeginingDateChange = (newDate) => {
    setBeginingDate(newDate)
  }

  const handleEndingDateChange = (newDate) => {
    setEndingDate(newDate)
  }

  const handleCloseSnack = (ev, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackParams({ open: false });
  }

  const handleClose = (ev, reason) => {
    if (reason != 'backdropClick') {
      setOpen(false);
    }
  }

  const controlDate = (params) => {
    params.required = true

    if (params.error) {
      params.helperText = 'La date est incorrecte'
      dateError = true
    } else if (endingDate && beginingDate) {
      const dif = endingDate.getTime() - beginingDate.getTime()
      if (dif < 0) {
        params.error = true
        params.helperText = "La date de début de peut pas être supérieur à la date de fin"
        dateError = true
      } else {
        dateError = false
      }
    } else if (params.inputProps.value == '') {
      dateError = true
      params.error = true
      params.helperText = "Champs requis"
    }

    return <TextField {...params} />
  }

  const setEvent = (ev) => {
    ev.preventDefault();

    if (!dateError) {

      if (ev.target.name.value === '') {
        setDiagError({
          nameError: true,
          nameErrorText: 'Champ requis'
        })

        return;
      } else {
        setDiagError({
          nameError: false,
          nameErrorText: ''
        })
      }

      const tempEvent = {
        uniqueId: mode === modes.CREATE ? undefined : event.uniqueId,
        name: ev.target.name.value,
        beginingDate: beginingDate.getTime(),
        endingDate: endingDate.getTime()
      }

      const prom = mode === modes.CREATE ? 
        eventContext.createEvent(tempEvent) : 
        eventContext.updateEvent(tempEvent)

      prom.then(() => {

        setSnackParams({ open: false });
        setSnackParams({
          open: true,
          message: mode === modes.CREATE ? 'Événement créé !' : 'Événement modifié !',
          severity: 'success'
        });

        setOpen(false);
      }).catch(() => {
        setSnackParams({ open: false });
        setSnackParams({
          open: true,
          message: mode === modes.CREATE ? 
            'Erreur lors de la création de l\'événement !' : 
            'Erreur lors de la modification de l\'événement !',
          severity: 'error'
        });
      })
    }
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
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {mode === modes.CREATE ? 'Créer un événement' : 'Modification de l\'événement ' + event.name}
        </DialogTitle>
        <form id='alert-dialog-description' onSubmit={setEvent} noValidate>
          <DialogContent>
            <Stack spacing={3}>
              <TextField
                variant='outlined'
                label='Nom'
                id='name'
                fullWidth
                autoFocus
                required
                defaultValue={mode === modes.UPDATE ? event.name : ''}
                error={diagError.nameError}
                helperText={diagError.nameErrorText}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>

                <Hidden mdUp>
                  <MobileDatePicker
                    label="Date de début"
                    inputFormat="dd/MM/yyyy"
                    value={beginingDate}
                    onChange={handleBeginingDateChange}
                    renderInput={(params) => controlDate(params)}
                  />

                  <MobileDatePicker
                    label="Date de fin"
                    inputFormat="dd/MM/yyyy"
                    value={endingDate}
                    onChange={handleEndingDateChange}
                    renderInput={(params) => controlDate(params)}
                  />
                </Hidden>

                <Hidden mdDown>
                  <DesktopDatePicker
                    label="Date de début"
                    inputFormat="dd/MM/yyyy"
                    value={beginingDate}
                    onChange={handleBeginingDateChange}
                    renderInput={(params) => controlDate(params)}
                  />
                  
                  <DesktopDatePicker
                    label="Date de fin"
                    inputFormat="dd/MM/yyyy"
                    value={endingDate}
                    onChange={handleEndingDateChange}
                    renderInput={(params) => controlDate(params)}
                  />
                </Hidden>
              </LocalizationProvider>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button
              variant='outlined'
              onClick={handleClose}
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

SetEventDialog.propTypes = {
  event: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleSet: PropTypes.func,
  mode: PropTypes.string
}

export default SetEventDialog;