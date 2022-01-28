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
import DeleteItemDialog from './DeleteItemDialog'
import SetItemDialog from './SetItemDialog'
import modes from '../utils/dialogMode'

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
  }
}));

function Item({ item, handleDeleteItem }) {
  const classes = useStyles();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const cardTitle = (
    <>
      <Typography variant="h5" component="p" align="center" className={classes.title}>
        {item.name}
      </Typography>
      <Divider />
    </>
  )

  return (
    <>
      <DeleteItemDialog
        item={item}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleDeleteItem={handleDeleteItem}
      />

      <SetItemDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        mode={modes.UPDATE}
        item={item}
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
              onClick={() => setUpdateDialogOpen(true)}
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