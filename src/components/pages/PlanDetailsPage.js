import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import AdaptationPlanCard from '../AdaptationPlanCard.js';
import TasksBlock from '../TasksBlock.js';
import exposureService from '../../services/exposureService.js';


const PlanDetailsPage = () => {
  const [planId] = useState(useParams().id);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <AdaptationPlanCard
          planId={planId}
          expService={exposureService} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TasksBlock planId={planId} />
      </Grid>
    </Grid>
  );
};

export default PlanDetailsPage;