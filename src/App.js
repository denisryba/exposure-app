import React, {useState, useEffect} from 'react';
import {
  Container,
  makeStyles
}  
from '@material-ui/core';
import ListOfPlans from './components/ListOfPlans';
import PlanCreationForm from './components/PlanCreationForm';
import exposureService from './services/exposureService.js';
import loginService from './services/loginService.js';
import LoginForm from './components/LoginForm.js';

const useStyles = makeStyles({
  root: {
    fontFamily: "Roboto",
    fontSize: 18
  }
});

const App = () => {
  const [ plans, setPlans ] =  useState([]);
  const [ user, setUser ] = useState(null);

  const { root } = useStyles();

  useEffect(() => {
    exposureService
      .getAll('plans')
      .then(plans => {
        setPlans(plans)
      })
  }, []);

  useEffect(() => {
    const savedUser = window.localStorage.getItem('savedUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => setIsShowing(!isShowing);

  const loginForm = user
    ? null
    : <LoginForm
        setUser={setUser}
        login={loginService.login} />;

  return (
    <Container className={root}>
      {loginForm}
      <ListOfPlans
        plans={plans}
        setPlans={setPlans}
      />
      <PlanCreationForm
        isShowing={isShowing}
        hide={toggle}
        plans={plans}
        setPlans={setPlans}
      />
      <button onClick={toggle}>создать план</button>
    </Container>  
  );
};



export default App
