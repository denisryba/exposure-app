import React, { useEffect, useState } from 'react';
import TaskComponent from './TaskComponent.js';

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

const TasksBlock = ({ expService }) => {
  const planId = '5f134c874b785238441eb954';

  const classes = useStyles();
  const [taskArr, setTasks] = useState(null);

  useEffect(() => {
    expService.getAll('tasks')
      .then(res => setTasks(res));
  }, [expService])

  const sampleArr = [{
    name: "Сделать скринкаст",
    description: "В пятницу будет обзор сделанного за неделю.",
    executionStart: '2020-07-16T00:00:00.000+00:00',
    executionEnd: '2020-07-17T00:00:00.000+00:00',
    completed: 'false',
    plan: '5f0f2000a2aa6b13ec894503',
    date: '2020-07-16T16:33:02.033+00:00',
  }]

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