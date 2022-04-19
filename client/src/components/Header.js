import React, { useState, useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import authContext from '../utils/authContext'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Hidden from '@mui/material/Hidden'
import Container from '@mui/material/Container'
import useEvent from '../utils/eventContext'
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up('md')] : {
      width: `calc(100% - 200px)`,
      marginLeft: 200
    }
  },
  endBar: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap'
  },
  grow: {
    flexGrow: 1
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '70%'
  },
  eventTitle: {
    fontWeight: 'bold'
  },
  titleSkeleton: {
    backgroundColor: theme.palette.primary.dark
  }
}))

function Header({ handleDrawerToggle }) {
  const classes = useStyle();
  const auth = useContext(authContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const eventContext = useEvent();

  const handleAccountClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const logout = () => {
    eventContext.cleanContext();
    auth.signout(() => {});
  }

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <ToolBar>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Container className={classes.titleWrapper} >
          <Typography 
            component='h3'
            variant='h5'
            align='center'
            className={classes.eventTitle}
            noWrap={true}
          >
            {eventContext.selectedEvent.name}
          </Typography>
        </Container>
        <div className={classes.endBar} >
          <Hidden mdDown>
            <Typography component='h2' variant='h6'>
              {auth.company.name}
            </Typography>
          </Hidden>
          <IconButton
            edge='end'
            color='inherit'
            aria-controls='account-menu'
            aria-haspopup='true'
            onClick={handleAccountClick}
            size="large">
            <AccountCircle fontSize='large' />
          </IconButton>
          <Menu
            id='account-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}>Se déconnecter</MenuItem>
          </Menu>
        </div>
      </ToolBar>
    </AppBar>
  );
}

Header.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired
}

export default Header