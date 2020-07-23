import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth.js';

const PrivateRoute = ({ children, roles, ...rest }) => {
  const userData = useAuth();
  const location = useLocation();

  const getChildren = () => {
    if (!userData) {
      return (<Redirect to={{
        pathname: '/login',
        state: { from: location }
      }} />);
    }

    if (roles && !roles.includes(userData.role)) {
      return <Redirect to='/' />;
    }

    return children;
  };

  return (
    <Route {...rest}>
      {getChildren()}
    </Route>
  )
};

export default PrivateRoute;