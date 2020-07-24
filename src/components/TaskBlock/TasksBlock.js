import React, { useEffect, useState } from 'react';
import TaskComponent from './TaskComponent.js';
import TaskCreationForm from './TaskCreationForm.js';

import { Typography, Button, makeStyles } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { useExpService } from '../../context/expService.js';

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'relative'
  },
  title: {
    margin: '20px 0'
  },
  button: {
    float: 'right',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '30px',
    '& .MuiButton-startIcon': {
      color: '#5c6bc0'
    },
    '&:hover': {
      backgroundColor: '#eaeaea'
    }
  }
}));

const TasksBlock = ({ planId }) => {
  const expService = useExpService();
  const classes = useStyles();
  const [ tasks, setTasks ] = useState(null);
  const [ onCreation, setOnCreation ] = useState(false);

  useEffect(() => {
    expService.getAllTasksFromPlan(planId)
      .then(tasks => setTasks(tasks));
  }, [planId, expService]);

  const toggleCreationForm = () => setOnCreation(onCreation => !onCreation);

  return (
    <>
      <Typography className={classes.header} variant='h6'>
        <Button
          onClick={toggleCreationForm}
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<NoteAddIcon />}
        >
          Создать задачу
                </Button>
        <div className={classes.title}>Задачи</div>
      </Typography>
      {tasks ?
        tasks.map((item) => {
          return <TaskComponent key={item.id} expService={expService} taskObj={item} />
        }) :
        <h1>Loading...</h1>
      }
      <TaskCreationForm
        tasks={tasks}
        setTasks={setTasks}
        toggleCreationForm={toggleCreationForm}
        planId={planId}
        open={onCreation} />
    </>

  )
}

export default TasksBlock;