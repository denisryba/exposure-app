import React, {useState, useEffect} from 'react';
import {
  Container
}  
from '@material-ui/core';
import ListOfPlans from './components/ListOfPlans';
import PlanCreationForm from './components/PlanCreationForm';
import axios from 'axios';


const App = () => {
  const [plans, setPlans] =  useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/plans')
      .then(res => {
        setPlans(res.data)
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
