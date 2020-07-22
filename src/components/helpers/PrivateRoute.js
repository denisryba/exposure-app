import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth.js';

const PrivateRoute = ({ children, ...rest }) => {
  const userData = useAuth();
  const location = useLocation();

  return (
    <Route {...rest}>
      {userData
        ? children
        : <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />}
    </Route>
  );
};

export default PrivateRoute;