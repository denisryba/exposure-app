import React from 'react';
import {
  Container
}  
from '@material-ui/core';
import ListOfPlans from './ListOfPlans'


const App = () => {

  return (
    <Container>
      <h1>exposure app</h1> 
      <ListOfPlans />
    </Container>  
  )
}



export default App
