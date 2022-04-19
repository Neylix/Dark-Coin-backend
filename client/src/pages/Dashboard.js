import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Event from './Event';
import Items from './Items';
import useEvent from '../utils/eventContext';
import Backdrop from '@mui/material/Backdrop';
import Loading from './Loading';
import CircularProgress from '@mui/material/CircularProgress';
import { 
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  content:  {
    display: 'flex',
    flex: '1',
    paddingTop: 64,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 200
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  },
}));

const menuList = [
  {
    title: 'Événement',
    path: 'evenement',
    component: <Event />
  },
  {
    title: 'Articles',
    path: 'articles',
    component: <Items />
  },
  {
    title: 'Rôles',
    path: 'roles',
    component: <h1>Rôles</h1>
  },
  {
    title: 'Satistiques',
    path: 'stats',
    component: <h1>Satistiques</h1>
  }
]

function Dashboard() {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const eventContext = useEvent();

  useEffect(async () => {
    eventContext.loadEvents().then(events => {
      eventContext.selectEvent(events[0]).then(() => {
        setIsLoadingEvents(false);
      })
    })
  }, []);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSelectedEvent = async (event) => {
    setIsLoading(true);
    eventContext.selectEvent(event).then(() => {
      setIsLoading(false);
    })
  }

  if (isLoadingEvents) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Backdrop open={isLoading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <SideBar
        mobileOpen={sidebarOpen}
        handleDrawerToggle={handleDrawerToggle}
        menuList={menuList}
        handleSelectedEvent={handleSelectedEvent}
      />
      <Header
        handleDrawerToggle={handleDrawerToggle}
      />
      <div className={classes.content} >
        <Routes>
          {menuList.map(({ path, component }, index) => (
            <Route 
              key={index}
              path={path}
              element={
                <Container maxWidth={false}>
                  {React.cloneElement(component)}
                </Container>
              }
            />
          ))}
          <Route path='*' element={
            <Navigate to={menuList[0].path} />
          } />
        </Routes>
      </div>
    </>
  )
}

export default Dashboard;