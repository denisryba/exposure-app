<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {
  Container,
  makeStyles
} from '@material-ui/core';

import exposureService from '../services/exposureService.js';
import loginService from '../services/loginService.js';
import AuthPage from './pages/AuthPage.js';
import PlanListPage from './pages/PlanListPage.js';

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
    const savedUser = window.localStorage.getItem('savedUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Container className={root}>
      <Router>
        <Route path='/login'>
          {(!user)
              ? <AuthPage
                  user={user}
                  setUser={setUser}
                  loginService={loginService} />
              : <Redirect to='/plans' />}
        </Route>
        <Route path='/plans/'>
          {user
            ? <PlanListPage exposureService={exposureService} />
            : <Redirect to='/login' />}
        </Route>
      </Router>
    </Container>  
  );
};

export default App
=======
import React from 'react';
import Header from './Header.js';
import AdaptationPlanCard from './AdaptationPlanCard/AdaptationPlanCard.js';
import TasksBlock from './TasksBlock/TasksBlock.js';

import { Grid } from '@material-ui/core';

const App = () => {
    return (
        <div className="main">
            <Header></Header>
            <Grid container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}>
                <AdaptationPlanCard></AdaptationPlanCard>
                <TasksBlock></TasksBlock>
            </Grid>

        </div>
    )

}

export default App;
>>>>>>> front
