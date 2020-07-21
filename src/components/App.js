import React, { useState, useEffect } from 'react';
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
import AuthPage from './pages/AuthPage.js';
import PlanListPage from './pages/PlanListPage.js';
import PlanDetailsPage from './pages/PlanDetailsPage.js';

const useStyles = makeStyles({
  root: {
    fontFamily: "Roboto",
    fontSize: 18
  }
});

const App = () => {
  const [ user, setUser ] = useState(null);

  const { root } = useStyles();

  useEffect(() => {
    const savedUser = storage.get('savedUser');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  console.log(user)

  return (
    <Container className={root}>
      <Switch>
        <Route path='/login'>
          <AuthPage
            user={user}
            setUser={setUser}
            loginService={loginService} />
        </Route>
        <Route path='/plans/'>
          <PlanListPage exposureService={exposureService} />
        </Route>
        <Route path='/details'>
          <PlanDetailsPage exposureService={exposureService} />
        </Route>
        <Redirect to='/plans' />
      </Switch>
    </Container>  
  );
};

export default App
