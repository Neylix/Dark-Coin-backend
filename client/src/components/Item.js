import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import ToolTip from '@mui/material/Tooltip';
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { deleteItem } from '../utils/backend'
import SnackAlert from './SnackAlert'
import useEvent from '../utils/eventContext'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width:'100%'
  },
  cardAction: {
    paddingLeft: '15%',
    paddingRight: '15%'
  },
  updateButton: {
    border: '1px solid',
    borderColor: theme.palette.warning.main
  },
  deleteButton: {
    border: '1px solid',
    borderColor: theme.palette.error.main,
    marginLeft: 'auto'
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  deleteItemName: {
    fontWeight: 'bold'
  },
  deleteWarningText: {
    color: theme.palette.warning.main
  }
}));

function Item({ item, handleDeleteItem }) {
  const classes = useStyles();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(undefined);
  const eventContext = useEvent();

  const cardTitle = (
    <>
      <Typography variant="h5" component="p" align="center" className={classes.title}>
        {item.name}
      </Typography>
      <Divider />
    </>
  )

  const delItem = () => {
    deleteItem(item.uniqueId).then(() => {
      setDeleteOpen(false);
      // Timeout to avoid dialog to display next item before closing
      setTimeout(() => {
        handleDeleteItem(item);
      }, 150)
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
    for (let role of eventContext.selectedEvent.roles) {
      if (role.items.find(itemId => itemId == item.uniqueId)) {
        text = 'Attention, cet article est associé à un role'
        break
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
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
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
          <Button variant='outlined' onClick={() => setDeleteOpen(false)}>Annuler</Button>
          <Button variant='outlined' color='error' onClick={delItem}>Supprimer</Button>
        </DialogActions>
      </Dialog>

      <SnackAlert
        open={snackOpen}
        severity="error"
        message={snackMessage}
        handleOnClose={handleCloseSnack}
      />

      <Card className={classes.card}>
        <CardHeader title={cardTitle} />

        <CardContent>
          <Typography variant="h6" component="p" align="center">
            {item.price + ' €'}
          </Typography>
        </CardContent>
        
        <CardActions disableSpacing className={classes.cardAction}>
          <ToolTip title="Modifier">
            <IconButton
              color='warning'
              className={classes.updateButton}
            >
              <CreateIcon />
            </IconButton>
          </ToolTip>

          <ToolTip title="Supprimer">
            <IconButton
              color="error"
              className={classes.deleteButton}
              onClick={() => setDeleteOpen(true)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </ToolTip>
        </CardActions>
      </Card>
    </>
  )
}

Item.propTypes = {
  item: PropTypes.object,
  handleDeleteItem: PropTypes.func
}

export default Item;