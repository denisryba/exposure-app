import React, { useState } from 'react';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import {
  Container,
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';

import exposureService from './services/exposureService.js';
import loginService from './services/loginService.js';
import storage from './utils/storage.js';
import role from './utils/role.js';
import { AuthContext } from './context/auth.js';
import { ExpServiceContext } from './context/expService.js';
import PrivateRoute from './helpers/PrivateRoute.js';
import Distributor from './helpers/Distributor.js';
import AuthPage from './pages/AuthPage.js';
import PlanListPage from './pages/PlanListPage.js';
import PlanDetailsPage from './pages/PlanDetailsPage.js';
import Header from './components/Header/Header.js';
import ErrorBoundary from './reusable/ErrorBoundary.js';


const useStyles = makeStyles({
  root: {
    fontFamily: 'Roboto',
    fontSize: 18
  }
});

const theme = createMuiTheme({
  palette: {
    common: {
      white: '#ffffff'
    },
    primary: {
      main: '#5c6bc0',
      contrastText: 'white'
    },
    secondary: {
      main: '#e63212'
    },
  },
  typography: {
    subtitle1: {
      color: '#838383',
      fontSize: 14,
    },
    h5: {
      paddingLeft: 15,
      fontWeight: 500,
      lineHeight: 2,
      fontSize: 18,
    }
  }
});

const App = () => {
  const [user, setUser] = useState(storage.get('savedUser'));
  const [search, setSearch] = useState('');

  const { root } = useStyles();

  return (
    <ExpServiceContext.Provider value={exposureService}>
      <ErrorBoundary>
        <AuthContext.Provider value={user}>
          <ThemeProvider theme={theme}>
            {user
              ? <Header
                setUser={setUser}
                setSearch={setSearch}
              />
              : null}
            <Container className={root}>
              <Switch>
                <Route path='/login'>
                  <AuthPage
                    setUser={setUser}
                    loginService={loginService} />
                </Route>
                <PrivateRoute exact path='/plans/' roles={[role.hr, role.supervisor]}>
                  <PlanListPage search={search} />
                </PrivateRoute>
                <PrivateRoute path='/plans/:id'>
                  <PlanDetailsPage />
                </PrivateRoute>
                <Route path='/'>
                  <Distributor />
                </Route>
                <Redirect to='/' />
              </Switch>
            </Container>
          </ThemeProvider>
        </AuthContext.Provider>
      </ErrorBoundary>
    </ExpServiceContext.Provider>
  );
};

export default App
