import React, { useState } from 'react';
import {
  Route,
  Redirect,
  Switch } from 'react-router-dom';
import {
  Container,
  makeStyles,
  createMuiTheme, 
  ThemeProvider} from '@material-ui/core';

import exposureService from '../services/exposureService.js';
import loginService from '../services/loginService.js';
import storage from '../utils/storage.js';
import { AuthContext } from '../context/auth.js';
import PrivateRoute from '../components/helpers/PrivateRoute.js';
import AuthPage from './pages/AuthPage.js';
import PlanListPage from './pages/PlanListPage.js';
import PlanDetailsPage from './pages/PlanDetailsPage.js';
import Header from './Header.js';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Roboto',
    fontSize: 18
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5c6bc0',
      contrastText: 'white'
    }
  }
});

const App = () => {
  const [ user, setUser ] = useState(storage.get('savedUser'));

  const { root } = useStyles();

  return (
    <AuthContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        {user
          ? <Header
            setUser={setUser} />
          : null}
        <Container className={root}>
          <Switch>
            <Route path='/login'>
              <AuthPage
                setUser={setUser}
                loginService={loginService} />
            </Route>
            <PrivateRoute exact path='/plans/'>
              <PlanListPage exposureService={exposureService} />
            </PrivateRoute>
            <PrivateRoute path='/plans/:id'>
              <PlanDetailsPage exposureService={exposureService} />
            </PrivateRoute>
            <Redirect to='/plans/' />
          </Switch>
        </Container>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App
