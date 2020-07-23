import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TaskComponent from './TaskComponent.js';
import expService from '../services/exposureService';

import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const useStyles = makeStyles(() => ({
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
      color: '#A6CE39'
    },
    '&:hover': {
      backgroundColor: '#eaeaea'
    }
  },
}));

const TasksBlock = () => {

  const classes = useStyles();
  const [taskArr, setTasks] = useState(null);
  let history = useHistory();

  useEffect(() => {
    console.log(history);
    console.log(history.pathname);
    const planId = history.location.pathname.slice(history.location.pathname.indexOf('/') + 1);
    expService.getAll('tasks/' + planId)
      .then(res => setTasks(res));
  }, [history])

  return (
    <Grid item xs={12} sm={6}>
      <Typography className={classes.header} variant='h6'>
        <Button
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
          return <TaskComponent expService={expService} taskObj={item}></TaskComponent>
        }) :
        <h1>Loading...</h1>
      }
    </Grid>

  )
}

export default TasksBlock;