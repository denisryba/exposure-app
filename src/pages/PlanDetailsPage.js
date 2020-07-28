import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Fab, makeStyles } from '@material-ui/core';

import AdaptationPlanCard from '../components/PlanDetails/AdaptationPlanCard.js';
import TasksBlock from '../components/TaskBlock/TasksBlock.js';
import CommentBlock from '../components/CommentBlock/CommentBlock.js';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useExpService } from '../context/expService.js';


const useStyles = makeStyles(theme => ({
  sendIcon: {
    marginRight: theme.spacing(1)
  },
  forwardFab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  backwardFab: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
}));

const PlanDetailsPage = () => {
  const expService = useExpService();
  const classes = useStyles();
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
    ? (`Вернуть ${maps[stage - 1]}`)
    : (`Отправить ${maps[stage + 1]}`);

    return buttonText;
  };

  const sendButton = (type, handler) => {
    const className = (type === 'forward')
      ? classes.forwardFab
      : classes.backwardFab;

    const icon = (type === 'forward')
      ? <ArrowForwardIcon className={classes.sendIcon} />
      : <ArrowBackIcon className={classes.sendIcon} />;

    return (
      <Fab
        onClick={handler}
        className={className}
        color='secondary'
        variant='extended'>
        {icon}
        {getSendButtonText(plan.stage, type)}
      </Fab>
    );
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
            planId={planId}
            displayPlan={plan}
            setDisplayPlan={setPlan} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TasksBlock planId={planId} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CommentBlock planId={planId} />
        </Grid>
      </Grid>
      { plan.stage !== 4
        ? sendButton('forward', handleForwardClick)
        : null}
      {plan.stage !== 0
        ? sendButton('backward', handleBackwardClick)
        : null}
    </>
  );
};

export default PlanDetailsPage;