import React, {useState} from 'react'
import { makeStyles } from '@mui/styles'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Logo from '../assets/logo.png'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Hidden from '@mui/material/Hidden'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import useEvent from '../utils/eventContext'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 200,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: 200
  },
  toolbar: theme.mixins.toolbar,
  toolbarWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  avatar: {
    width: '25%'
  },
  list: {
    paddingTop: 0
  },
  eventSelect: {
    maxWidth: '150px'
  },
  newButton: {
    border: '1px solid',
    borderColor: theme.palette.success.main,
    color: theme.palette.success.main,
    margin: '5px'
  }
}))

function SideBar({ mobileOpen, handleDrawerToggle, menuList, handleSelectedEvent }) {
  const classes = useStyles();
  const location = useLocation();
  const eventContext = useEvent();
  const [listSelected, setListSelected] = useState(eventContext.events[0]);

  const handleChange = (event) => {
    setListSelected(event);
    handleSelectedEvent(event);
  }

  const content = (
    <>
      <div className={classes.toolbar}>
        <div className={classes.toolbarWrapper}>
          <Avatar src={Logo} className={classes.avatar} />
          <Typography component='h1' variant='h5'>
            Dark Coin
          </Typography>
        </div>
      </div>

      <Divider />

      {/* Event selection */}
      <div>
        <IconButton variant='contained' className={classes.newButton} size='small'>
          <AddIcon />
        </IconButton>
        <TextField
          className={classes.eventSelect}
          select
          SelectProps={{
            renderValue: (function title(evt) {
              return <Typography 
                component='h4'
                variant='subtitle1'
                align='center'
                noWrap={true}
              >
                {evt.name}
              </Typography>
            })
          }}
          value={listSelected}
          onChange={event => handleChange(event.target.value)}
          variant='standard'
          fullWidth={true}
        >
          {eventContext.events.map((evt, index) => (
            <MenuItem value={evt} key={index}>
              {evt.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <Divider />
      <br />
      <Divider />

      {/* Menu list */}
      <List className={classes.list}>
      {menuList.map(({ title, path }, index) => (
        <ListItem 
          component={RouterLink}
          to={path}
          key={index}
          button 
          selected={'/dashboard/' + path === location.pathname}
          divider
        >
          <ListItemText>{title}</ListItemText>
        </ListItem>
      ))}
      </List>
    </>
  )

  return <>
    <nav className={classes.drawer}>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor='left'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onClick={() => setTimeout(() => handleDrawerToggle(),200)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {content}
        </Drawer>
      </Hidden>
    </nav>
  </>;
}

SideBar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  menuList: PropTypes.array.isRequired,
  handleSelectedEvent: PropTypes.func.isRequired
}

export default SideBar