import React, {useState, useEffect} from 'react';
import {
  Container
}  
from '@material-ui/core';
import ListOfPlans from './components/ListOfPlans';
import PlanCreationForm from './components/PlanCreationForm';
import exposureService from './services/exposureService.js';


const App = () => {
  const [plans, setPlans] =  useState([]);

  useEffect(() => {
    exposureService
      .getAll('plans')
      .then(plans => {
        setPlans(plans)
      })
  }, []);

  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => setIsShowing(!isShowing);

  return (
    <Container>
      <h1>exposure app</h1> 
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
  )
}



export default App
