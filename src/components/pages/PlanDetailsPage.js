import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import AdaptationPlanCard from '../AdaptationPlanCard.js';
import TasksBlock from '../TasksBlock.js';
import exposureService from '../../services/exposureService.js';
import TaskCreationForm from '../TaskCreationForm.js';


const PlanDetailsPage = () => {
  const [ planId ] = useState(useParams().id);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <AdaptationPlanCard
          planId={planId}
          expService={exposureService} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TasksBlock />
      </Grid>
      <Grid container justify='flex-end'>
      <Fab
        color='primary'>
        <AddIcon />
      </Fab>
      </Grid>
    <TaskCreationForm  
    />
    </Grid>
  );
};

export default PlanDetailsPage;