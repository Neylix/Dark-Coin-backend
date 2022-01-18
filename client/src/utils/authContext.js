import React, { useContext, useState, createContext } from 'react'
import PropTypes from 'prop-types'
import { getCompany } from './backend'
import {
  Navigate
} from 'react-router-dom'

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
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

  return {
    company,
    signin,
    signout
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

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
  let auth = useAuth();
  return (
    auth.company ? (
      children
    ) : (
      <Navigate
        to='/login'
        state={{ from: location}}
      />
    )
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.object
}

export function AlreadyLogged( {children} ) {
  let auth = useAuth();
  return (
    auth.company ? (
      <Navigate
        to='/dashboard'
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