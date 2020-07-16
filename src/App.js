import React from 'react';
import {
  Container
}  
from '@material-ui/core';
import ListOfPlans from './components/ListOfPlans'
import PlanCreationForm from './components/PlanCreationForm'


const App = () => {

  return (
    <Container>
      <h1>exposure app</h1> 
      <ListOfPlans />
      <PlanCreationForm />
    </Container>  
  )
}



export default App
