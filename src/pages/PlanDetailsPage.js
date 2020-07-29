import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import AdaptationPlanCard from '../components/PlanDetails/AdaptationPlanCard.js';
import TasksBlock from '../components/TaskBlock/TasksBlock.js';
import CommentBlock from '../components/CommentBlock/CommentBlock.js';
import SendButton from '../components/PlanDetails/SendButton.js';
import { useExpService } from '../context/expService.js';

const PlanDetailsPage = () => {
  const expService = useExpService();
  const [ planId ] = useState(useParams().id);
  const [ plan, setPlan ] = useState(null);

  useEffect(() => {
    expService
      .get('plan', planId)
      .then(plan => setPlan(plan));
  }, [expService, planId]);

  const getSendButtonText = (stage, direction) => {
    const maps = {
      0: 'на заполнение',
      1: 'на согласование',
      2: 'на выполнение',
      3: 'на оценку',
      4: 'завершить оценку'
    };

    const buttonText = (direction === 'backward')
      ? (`${maps[stage - 1]}`)
      : (`${maps[stage + 1]}`);

    return buttonText;
  };

  const handleForwardClick = async () => {
    const newPlan = {
      ...plan,
      employeePosition: plan.employeePosition.id,
      hr: plan.hr.id,
      employee: plan.employee.id,
      supervisor: plan.supervisor.id,
      stage: ++plan.stage
    };
    const updatedPlan =  await expService.update('plan', planId, newPlan);
    setPlan(updatedPlan);
  };
  
  const handleBackwardClick = async () => {
    const newPlan = {
      ...plan,
      employeePosition: plan.employeePosition.id,
      hr: plan.hr.id,
      employee: plan.employee.id,
      supervisor: plan.supervisor.id,
      stage: --plan.stage
    };
    const updatedPlan =  await expService.update('plan', planId, newPlan);
    setPlan(updatedPlan);
  };

  if (!plan) {
    return null
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AdaptationPlanCard
            displayPlan={plan}
            setDisplayPlan={setPlan} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TasksBlock planObj={plan} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CommentBlock planId={planId} />
        </Grid>
      </Grid>
      { plan.stage !== 4
        ? <SendButton
            type='forward'
            handler={handleForwardClick}
            text={getSendButtonText(plan.stage, 'forward')} />
        : null}
      {plan.stage !== 0
        ? <SendButton
            type='backward'
            handler={handleBackwardClick}
            text={getSendButtonText(plan.stage, 'backward')} />
        : null}
    </>
  );
};

export default PlanDetailsPage;