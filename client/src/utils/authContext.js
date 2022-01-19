import React, { useContext, useState, createContext } from 'react'
import PropTypes from 'prop-types'
import { getCompany } from './backend'
import {
  Navigate,
  useLocation
} from 'react-router-dom'

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

export function ProvideAuth({ children }) {
  const [company, setCompany] = useState(null);

  const signin = cb => {
    getCompany().then(tempCompany => {
      setCompany(tempCompany);
      cb();
    }).catch(err => cb(err))
  };

  const signout = cb => {
    setCompany(null);
    localStorage.removeItem('xsrfToken');
    cb();
  };

  const auth = {
    company,
    signin,
    signout
  };

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

ProvideAuth.propTypes = {
  children: PropTypes.object
}

export function PrivateRoute( {children} ) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.company ? (
      children
    ) : (
      <Navigate
        to='/login'
        state={{ from: location}}
        replace
      />
    )
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.object
}

export function AlreadyLogged( {children} ) {
  let auth = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard'

  return (
    auth.company ? (
      <Navigate
        to={from}
        replace
      />
    ) : (
      children
    )
  );
}

AlreadyLogged.propTypes = {
  children: PropTypes.object
}

export default authContext;