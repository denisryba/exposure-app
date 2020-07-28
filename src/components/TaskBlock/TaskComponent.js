import React, { useState } from 'react';

import { useAuth } from '../../context/auth.js';
import Calendar from '../../reusable/Calendar.js';
import formatService from '../../services/formatService.js';
import ComponentAvailability from '../../reusable/ComponentAvailability.js';

import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
  TextField,
  Checkbox,
  IconButton
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1)
  },
  accordion: {
    display: 'block',
    '& .arrow-icon': {
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    '&.Mui-expanded .arrow-icon': {
      transform: 'rotate(90deg)',
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
  },
  taskIconBlock: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: '35%',
    '& span': {
      padding: '3px'
    }
  },
  taskArrowIcon: {
    position: 'absolute',
    top: '0px',
    left: '-7px'
  },
  taskHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  taskTitle: {
    position: 'relative'
  },
  heading: {
    paddingLeft: '24px',
  },
  headingInput: {
    marginLeft: '24px',
    width: '127%'
  },
  lowButtonsBlock: {
    position: 'relative',
    '& button': {
      float: 'right',
    }
  },
}));

const TaskComponent = ({ taskObj, expService, removeTask }) => {

  const classes = useStyles();

  const [editing, setEditMode] = useState(false);
  const [expandAccordion, setExpandAccordion] = useState(false);
  const [task, setTask] = useState(taskObj);
  const [initialTask, setInitialTask] = useState(taskObj);
  const user = useAuth()

  const stageRoleModel = {
    checkBox: {
      supervisor: [1, 3],
      employee: [2]
    },
    editBtn: {
      supervisor: [1],
      employee: [0]
    },
    deleteBtn: {
      supervisor: [1],
      employee: [0]
    },
  }

  const updateTaskField = (fieldName, value) => {
    setTask(prevData => {
      return {
        ...prevData,
        [fieldName]: value
      }
    })
  }

  const handleEditIconClick = (e) => {
    e.stopPropagation();
    setTask(initialTask);
    setEditMode(!editing);
    setExpandAccordion(true);
  }

  const handleDeleteIconClick = (e) => {
    e.stopPropagation();
    expService.remove('task', task.id)
      .then(res => {
        if (res.status < 300) removeTask();
      });
  }

  const handleInputChange = (fieldName, e) => {
    e.persist();
    e.stopPropagation();
    updateTaskField(fieldName, e.target.value);
  }

  const handleDateChange = (dateType, value) => {
    console.log(task);
    dateType = (dateType === 'dateStart') ? 'executionStart' : 'executionEnd';
    updateTaskField(dateType, value.toJSON());
  }

  const handleSaveBtn = () => {
    setEditMode(!editing);
    setInitialTask(task);
    expService.update('task', task.id, task);
  }

  const handleCheckbox = (e) => {
    expService.update('task', task.id, {
      ...task,
      completed: e.target.checked
    })
      .then(res => {
        updateTaskField('completed', res.completed);
      });
  }

  const handleAccordionHeadClick = () => {
    setExpandAccordion(!expandAccordion)
    setTask(initialTask);
    setEditMode(false);
  }

  const formatBriefDescription = (description) => {
    if (description.length > 35) {
      return description.slice(0, 35) + '...';
    }
    return description;
  }

  return (
    <div className={classes.root}>
      <Accordion expanded={expandAccordion}>
        <AccordionSummary
          classes={{ content: classes.accordion }}
          onClick={handleAccordionHeadClick}
        >
          <div className={classes.taskHeader}>
            <div className={classes.taskTitle}>
              <ArrowForwardIosIcon color='secondary' classes={{ root: classes.taskArrowIcon }} className="arrow-icon" />
              {editing ?
                <TextField
                  className={classes.headingInput}
                  label="Имя задачи"
                  value={task.name}
                  multiline
                  rows={1}
                  rowsMax={2}
                  onChange={(e) => handleInputChange("name", e)}
                  onClick={(e) => e.stopPropagation()}
                />
                : <Typography className={classes.heading}>{task.name}</Typography>}
              {!expandAccordion &&
                <Typography color="textSecondary">
                  {formatBriefDescription(task.description)}
                </Typography>}
            </div>
            <div className={classes.taskIconBlock}>
              <Typography
                color="textSecondary"
                className={classes.taskDate}
                variant="body2"
              >
                до {formatService.setDate(task.executionEnd).slice(0, 5)}
              </Typography>
              {/* <ComponentAvailability
                stageRoleObj={stageRoleModel.editBtn}
                currentRole={user.role}
                curentStage={oldDisplayPlan.stage}
              >
                <Checkbox
                  color="primary"
                  checked={task.completed}
                  onChange={handleCheckbox}
                  onClick={(e) => e.stopPropagation()}
                />
              </ComponentAvailability> */}
              <IconButton size="small" color="inherit" onClick={(e) => handleEditIconClick(e)}>
                <EditIcon />
              </IconButton>
              <IconButton size="small" color="inherit" onClick={(e) => handleDeleteIconClick(e)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {editing &&
              <Grid item xs={12}>
                <Calendar
                  passChanges={handleDateChange}
                  dateStart={task.executionStart}
                  dateStartLabel="Начало выполнения"
                  dateEnd={task.executionEnd}
                  dateEndLabel="Конец выполнения"
                />
              </Grid>
            }
            <Grid item xs={12}>
              {editing
                ? <TextField
                  label="Описание задачи"
                  variant="filled"
                  fullWidth
                  multiline
                  rows={2}
                  rowsMax={5}
                  value={task.description}
                  onChange={(e) => handleInputChange("description", e)}
                />
                : <Typography color="textSecondary">
                  {task.description}
                </Typography>}
            </Grid>
            <Grid item xs={12} className={classes.lowButtonsBlock}>
              {editing &&
                <Button
                  variant="contained"
                  className={classes.button}
                  size={"small"}
                  color="primary"
                  type="Submit"
                  onClick={handleSaveBtn}
                >
                  Сохранить
                </Button>
              }
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TaskComponent;