import React, { useContext, useEffect, useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import authContext, { PrivateRoute, AlreadyLogged } from './utils/authContext'
import Loading from './pages/Loading'
import { ProvideEvent } from './utils/eventContext'
import { 
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate
} from 'react-router-dom'

function App() {
  const auth = useContext(authContext);
  const [isLoading, setIsLoading] = useState(true);

  const checkLogin = () => {
    localStorage.getItem('xsrfToken') ? (
      auth.signin(() => {
        setIsLoading(false);
      })
    ) : (
      setIsLoading(false)
    )
  }

  useEffect(() => {
    checkLogin();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <Router>
      <Routes>
        <Route 
          path='/login' 
          element={
            <AlreadyLogged>
              <Login />
            </AlreadyLogged>
          }
        />
        <Route 
          path='/register' 
          element={
            <AlreadyLogged>
              <Register />
            </AlreadyLogged>
          }
        />
        <Route 
          exact path='/dashboard/*'
          element={
            <PrivateRoute>
              <ProvideEvent>
                <Dashboard />
              </ProvideEvent>
            </ PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
    </Router>
  );
}

export default App;
