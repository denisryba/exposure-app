import React, { useState } from 'react';

import { useAuth } from '../../context/auth.js';
import Calendar from '../../reusable/Calendar.js';
import formatService from '../../services/formatService.js';
import ComponentAvailability from '../../reusable/ComponentAvailability.js';
import { notify } from '../../reusable/Notification.js';

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
  IconButton,
  Box,
  Collapse
} from '@material-ui/core';
import Confirmation from '../../reusable/Confirmation.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  accordionRoot: {
    '&.Mui-focused': {
      backgroundColor: theme.palette.common.white
    }
  },
  accordion: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    '& .arrow-icon': {
      transform: 'rotate(-90deg)',
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    '&.Mui-expanded .arrow-icon': {
      transform: 'rotate(0deg)',
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
  },
  taskHeader: {
    alignItems: 'center',
    display: 'flex',
    whiteSpace: 'nowrap'
  },
  additionalInfo: {
    alignItems: 'center',
    display: 'flex',
    whiteSpace: 'nowrap',
    justifyContent: 'space-between',
    marginRight: theme.spacing(1)
  },
  taskDescription : {
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: theme.spacing(2)
  },
  heading: {
    flex: 1,
    minWidth: 0,
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: theme.spacing(1),
  },
  headingInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  calendar: {
    display: 'flex'
  },
  deadlines: {
    minWidth: '100%'
  },
  createdDate: {
    marginLeft: 'auto'
  },
}));

const TaskComponent = ({ taskObj, expService, planStage, removeTask }) => {

  const classes = useStyles();

  const [confirmationOpen, setConfirmationOpen] = useState(false);
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

  const handleCheckbox = (e) => {
    expService.update('task', task.id, {
      ...task,
      completed: e.target.checked
    })
      .then(res => {
        res.completed
          ? notify('success', 'Задача отмечена как выполненная.')
          : notify('success', 'Задача отмечена как невыполненная.');
        updateTaskField('completed', res.completed);
      })
      .catch(() => {
        notify('error', 'Ошибка при изменении статуса задачи.');
      });
  }
  
  const handleEditIconClick = (e) => {
    e.stopPropagation();
    setTask(initialTask);
    setEditMode(!editing);
    setExpandAccordion(true);
  }

  
  const handleConfirmationOpen = (event) => {
    setConfirmationOpen(true);
    event.stopPropagation();
  };

  const deleteTask = id => {
    expService.remove('task', id)
      .then(() => {
        removeTask();
      })
      .catch(() => {
        notify('error', 'Ошибка при удалении задачи.');
      });
  }

  const handleInputChange = (fieldName, e) => {
    e.persist();
    e.stopPropagation();
    updateTaskField(fieldName, e.target.value);
  }

  const handleDateChange = (dateType, value) => {
    dateType = (dateType === 'dateStart') ? 'executionStart' : 'executionEnd';
    updateTaskField(dateType, value.toJSON());
  }

  const handleSaveBtn = () => {
    setEditMode(!editing);
    setInitialTask(task);
    expService.update('task', task.id, task)
      .then(() => {
        notify('success', 'Задача изменена.');
      })
      .catch(() => {
        notify('error', 'Ошибка при изменении задачи.');
      });
  }

  const handleAccordionHeadClick = () => {
    setExpandAccordion(!expandAccordion)
    setTask(initialTask);
    setEditMode(false);
  }

  return (
    <div className={classes.root}>
      <Confirmation 
        isOpen={confirmationOpen}
        setIsOpen={setConfirmationOpen}
        message='Вы уверены, что хотите удалить задачу?'
        deletedId={task.id}
        action={deleteTask}
      />
      <Accordion expanded={expandAccordion}>
        <AccordionSummary
          classes={{ content: classes.accordion, root: classes.accordionRoot }}
          onClick={handleAccordionHeadClick}
        >
          <div className={classes.taskHeader}>
            <Box color="text.secondary">
            <ExpandMoreIcon classes={{ root: classes.taskArrowIcon }} className="arrow-icon" />
            </Box>
            {editing ?
              <TextField
                multiline
                rowsMax={2}
                variant='outlined'
                size='small'
                className={classes.headingInput}
                value={task.name}
                onChange={(e) => handleInputChange("name", e)}
                onClick={(e) => e.stopPropagation()}
                fullWidth
              />
              : <Typography className={classes.heading}>{task.name}</Typography>}
              <ComponentAvailability
                stageRoleObj={stageRoleModel.checkBox}
                currentRole={user.role}
                currentStage={planStage}
              >
                <Checkbox
                  color="primary"
                  checked={task.completed}
                  onChange={handleCheckbox}
                  onClick={(e) => e.stopPropagation()}
                />
              </ComponentAvailability>
              <ComponentAvailability
                stageRoleObj={stageRoleModel.editBtn}
                currentRole={user.role}
                currentStage={planStage}
              >
                <IconButton onClick={(e) => handleEditIconClick(e)}>
                  {editing
                    ? <CloseIcon />
                    : <EditIcon />}
                </IconButton>
              </ComponentAvailability>
              <ComponentAvailability
                stageRoleObj={stageRoleModel.deleteBtn}
                currentRole={user.role}
                currentStage={planStage}
              >
                <IconButton  onClick={(e) => handleConfirmationOpen(e)}>
                  <DeleteIcon />
                </IconButton>
              </ComponentAvailability>
          </div>
          {!expandAccordion &&
            <Box className={classes.additionalInfo}>
              <Typography className={classes.taskDescription} color="textSecondary">
                {task.description}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                до {formatService.setDate(task.executionEnd).slice(0, 5)}
              </Typography>
            </Box>
          }
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction='row' justify='flex-end' alignItems='center' spacing={1}>
            <Grid item xs={12}>
                {editing
                  ? <TextField
                      variant='outlined'
                      fullWidth
                      multiline
                      rows={2}
                      rowsMax={5}
                      value={task.description}
                      onChange={(e) => handleInputChange("description", e)}
                    />
                  : <Typography flex={1} color="textSecondary" gutterBottom>
                      {task.description}
                    </Typography>}
              </Grid>
              {editing
                ? <Grid className={classes.deadlines} item xs={12}>
                <Box className={classes.calendar}>
                  <Calendar
                    passChanges={handleDateChange}
                    dateStart={task.executionStart}
                    dateStartLabel="С"
                    dateEnd={task.executionEnd}
                    dateEndLabel="До"
                  />
                </Box> 
              </Grid>
                : null
              }
              
              <Grid item xs={12} container justify='space-between'>
              {!editing
                ? <Grid item xs={12} sm={9}>
                    <Typography
                      color="textSecondary"
                      variant="body2" >
                      Срок: с {formatService.setDate(task.executionEnd)} до {formatService.setDate(task.executionEnd)}
                    </Typography>
                  </Grid>
                : null
              }
              <Grid className={classes.createdDate} xs={12} item sm={3}>
                <Typography
                  
                  color="textSecondary"
                  variant="body2">
                  Создана {formatService.setDate(task.date)}
                </Typography>
              </Grid>
              </Grid>
              
              <Collapse in={editing} >
                <Grid item container justify='flex-end' xs={12}>
                  <Button
                    color="primary"
                    type="Submit"
                    onClick={handleSaveBtn}
                  >
                    Сохранить
                  </Button>
                </Grid>
              </Collapse>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TaskComponent;