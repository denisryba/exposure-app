import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
  let location = useLocation();

  useEffect(() => {
    expService.getAll(location.pathname.slice(1) + '/tasks')
      .then(res => setTasks(res));
  }, [location])

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