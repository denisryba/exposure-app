import React, { useState } from 'react';

import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  TextField
} from '@material-ui/core';
import Calendar from '../../reusable/Calendar.js'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiCheckbox-colorPrimary': {
      color: '#99bd36'
    },
    margin: theme.spacing(2)
  },
  content: {
    '& .MuiAccordionSummary-content': {
      display: 'block',
    },
    '& .MuiAccordionSummary-expandIcon': {
      display: 'block',
    },
    '& .Mui-expanded .makeStyles-taskArrowIcon-25': {
      transform: 'rotate(90deg)',
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    '& .makeStyles-taskArrowIcon-25': {
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
  },
  taskIconBlock: {
    float: 'right',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: '35%',
    '& span': {
      padding: '0'
    }
  },
  taskArrowIcon: {
    position: 'absolute',
    top: '0px',
    left: '-7px',
    color: '#ababab',
  },
  taskDate: {
    color: '#6b6b6b',
    display: 'inline-flex',
    fontSize: '14px',
    paddingTop: '4px',
  },
  taskHeader: {
    position: "relative"
  },
  heading: {
    paddingLeft: '24px',
  },
  headingInput: {
    marginLeft: '24px',
    width: '57%'
  },
  lowButtonsBlock: {
    position: 'relative',
    '& button': {
      float: 'right',
    }
  },
  button: {
    backgroundColor: '#A6CE39',
    width: "30%",
    fontSize: 10,
    marginTop: 15,
    '&:hover': {
      backgroundColor: '#99bd36',
    }
  },
}));

const TaskComponent = ({ taskObj, expService }) => {

  const classes = useStyles();

  const [editing, toggleEditMode] = useState(false);
  const [data, setData] = useState(taskObj);

  const convertDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  const handleEditIconClick = (e) => {
    e.stopPropagation();
    toggleEditMode(!editing);
  }

  const handleDeleteIconClick = (e) => {
    e.stopPropagation();
    expService.remove('task', data.id);
  }

  const handleInputChange = (e, fieldName) => {
    console.log(data);
    e.persist();
    e.stopPropagation();
    setData(prevData => {
      return {
        ...prevData,
        [fieldName]: e.target.value
      }
    })
  }

  const handleDataChange = (dataType, value) => {
    dataType = (dataType === 'dateStart') ? 'executionStart' : 'executionEnd';
    console.log(data);
    setData(prevData => {
      return {
        ...prevData,
        [dataType]: value.toJSON()
      }
    })
  }

  const handleSaveBtn = () => {
    expService.update('task', data.id, data);
  }

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          className={classes.content}
        >
          <div className={classes.taskHeader}>
            <div className={classes.taskIconBlock}>
              <Typography className={classes.taskDate}>
                до {convertDate(data.executionEnd).slice(0, 5)}
              </Typography>
              {/* <Checkbox color="primary" className={classes.root} onClick={(e) => e.stopPropagation()} /> */}
              <EditIcon onClick={(e) => handleEditIconClick(e)} />
              <DeleteIcon onClick={(e) => handleDeleteIconClick(e)} />
            </div>
            <ArrowForwardIosIcon className={classes.taskArrowIcon} />

            {editing ?
              <TextField
                className={classes.headingInput}
                label="Имя задачи"
                value={data.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
              : <Typography className={classes.heading}>{data.name}</Typography>}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {editing &&
              <Grid item xs={12}>
                <Calendar
                  passChanges={handleDataChange}
                  dateStart={data.executionStart}
                  dateStartLabel="Начало выполнения"
                  dateEnd={data.executionEnd}
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
                  value={data.description}
                  onChange={(e) => handleInputChange(e, "description")}
                />
                : <Typography color="textSecondary">
                  {data.description}
                </Typography>}
            </Grid>
            <Grid item xs={12} className={classes.lowButtonsBlock}>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  autoWidth
                  value={data.completed}
                  onChange={(e) => handleInputChange(e, "completed")}
                >
                  <MenuItem value={true}>Выполнена</MenuItem>
                  <MenuItem value={false}>Не выполнена</MenuItem>
                </Select>
                <FormHelperText>Результат выполнения задачи</FormHelperText>
              </FormControl>
              {editing &&
                <Button
                  variant="contained"
                  className={classes.button}
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