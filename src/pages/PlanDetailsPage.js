import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import AdaptationPlanCard from '../components/PlanDetails/AdaptationPlanCard.js';
import TasksBlock from '../components/TaskBlock/TasksBlock.js';
import CommentBlock from '../components/CommentBlock/CommentBlock.js';


const PlanDetailsPage = () => {
  const [planId] = useState(useParams().id);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <AdaptationPlanCard
          planId={planId} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TasksBlock planId={planId} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CommentBlock planId={planId} />
      </Grid>
    </Grid>
  );
};

export default PlanDetailsPage;