import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.js';

import TaskComponent from './TaskComponent.js';
import TaskCreationForm from './TaskCreationForm.js';
import Loader from '../../reusable/Loader.js';
import ComponentAvailability from '../../reusable/ComponentAvailability.js';

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
      <Typography className={classes.header} variant='h6'>
        <ComponentAvailability
          stageRoleObj={stageRoleModel.createTaskBtn}
          currentRole={user.role}
          curentStage={planObj.stage}
        >
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
        </ComponentAvailability>
        <div className={classes.title}>Задачи</div>
      </Typography>
      {tasks ?
        tasks.map((item, index) => {
          return <TaskComponent key={item.id} expService={expService} taskObj={item} planStage={planObj.stage} removeTask={() => removeTask(index)} />
        }) :
        <Loader size={200} />
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