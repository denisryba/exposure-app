import React, { useState } from 'react';
import {
  Route,
  Redirect,
  Switch } from 'react-router-dom';
import {
  Container,
  makeStyles } from '@material-ui/core';

import exposureService from '../services/exposureService.js';
import loginService from '../services/loginService.js';
import storage from '../utils/storage.js';
import { AuthContext } from '../context/auth.js';
import PrivateRoute from '../components/helpers/PrivateRoute.js';
import AuthPage from './pages/AuthPage.js';
import PlanListPage from './pages/PlanListPage.js';
import PlanDetailsPage from './pages/PlanDetailsPage.js';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Roboto',
    fontSize: 18
  }
});

const App = () => {
  const [ user, setUser ] = useState(storage.get('savedUser'));

  const { root } = useStyles();

  return (
    <AuthContext.Provider value={user}>
      <Container className={root}>
        <Switch>
          <Route path='/login'>
            <AuthPage
              setUser={setUser}
              loginService={loginService} />
          </Route>
          <PrivateRoute path='/plans/'>
            <PlanListPage exposureService={exposureService} />
          </PrivateRoute>
          <PrivateRoute path='/details'>
            <PlanDetailsPage exposureService={exposureService} />
          </PrivateRoute>
          <Redirect to='/plans' />
        </Switch>
      </Container>  
    </AuthContext.Provider>
  );
};

export default App
