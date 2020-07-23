import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TaskComponent from './TaskComponent.js';
import TaskCreationForm from './TaskCreationForm.js';
import expService from '../services/exposureService';

import { Typography, Button, makeStyles } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

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

  const classes = useStyles();
  const [taskArr, setTasks] = useState(null);
  const [ onCreation, setOnCreation ] = useState(false);
  let location = useLocation();

  useEffect(() => {
    expService.getAll(location.pathname.slice(1) + '/tasks')
      .then(res => setTasks(res));
  }, [location]);

  const toggleCreationForm = () => setOnCreation(!onCreation);

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
      {taskArr ?
        taskArr.map((item) => {
          return <TaskComponent key={item.id} expService={expService} taskObj={item} />
        }) :
        <h1>Loading...</h1>
      }
      <TaskCreationForm
        tasks={taskArr}
        setTasks={setTasks}
        toggleCreationForm={toggleCreationForm}
        planId={planId}
        open={onCreation} />
    </>

  )
}

export default TasksBlock;