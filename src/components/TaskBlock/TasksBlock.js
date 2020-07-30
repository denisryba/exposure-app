import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.js';

import TaskComponent from './TaskComponent.js';
import TaskCreationForm from './TaskCreationForm.js';
import Loader from '../../reusable/Loader.js';
import ComponentAvailability from '../../reusable/ComponentAvailability.js';

import { Typography, Box, Button, makeStyles } from '@material-ui/core';
import { useExpService } from '../../context/expService.js';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1)
  },
  button: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  errorBoundary: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#c23934',
  },
  errorText: {
    color: 'white'
  }
}));

const TasksBlock = ({ planObj }) => {
  const expService = useExpService();
  const classes = useStyles();
  const [tasks, setTasks] = useState(null);
  const [onCreation, setOnCreation] = useState(false);
  const user = useAuth()

  const stageRoleModel = {
    createTaskBtn: {
      supervisor: [1],
      employee: [0]
    }
  }

  useEffect(() => {
    expService.getAllTasksFromPlan(planObj.id)
      .then(tasks => setTasks(tasks));
  }, [planObj, expService]);

  const toggleCreationForm = () => setOnCreation(onCreation => !onCreation);

  const removeTask = (i) => {
    setTasks(prevTasks => prevTasks.filter((item, indx) => indx !== i))
  }

  return (
    <React.Fragment>
        <Box className={classes.header}>
          <Typography variant='h5'>
            Задачи
          </Typography>
          <ComponentAvailability
            stageRoleObj={stageRoleModel.createTaskBtn}
            currentRole={user.role}
            currentStage={planObj.stage}
          >
            <Button
              onClick={toggleCreationForm}
              className={classes.button}>
              Создать
            </Button>
          </ComponentAvailability>
        </Box>
        {tasks ?
          tasks.map((item, index) => {
            return <TaskComponent key={item.id} expService={expService} taskObj={item} planStage={planObj.stage} removeTask={() => removeTask(index)} />
          })
          : <Loader size={200} />
        }
        <TaskCreationForm
          tasks={tasks}
          setTasks={setTasks}
          toggleCreationForm={toggleCreationForm}
          planId={planObj.id}
          open={onCreation} />
    </React.Fragment>
  )
}

export default TasksBlock;