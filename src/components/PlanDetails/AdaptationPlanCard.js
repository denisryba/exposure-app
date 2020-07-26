import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import ProgressBar from '../../reusable/ProgressBar.js';
import SelectStaff from '../../reusable/SelectStaff.js'

import { Grid, Paper, Button, makeStyles, Typography, TextField, IconButton } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CalendarSingle from '../../reusable/CalendarSingle.js';
import { useExpService } from '../../context/expService.js';


const useStyles = makeStyles((theme) => ({
  title: {
    margin: '20px 0'
  },
  cardContainer: {
    position: 'relative',
    padding: theme.spacing(3),
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    '& h4': {
      display: 'inline',
      marginLeft: '9px',
      fontWeight: '500',
    }
  },
  bottomCreationDate: {
    textAlign: 'end'
  },
  fieldLabelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  editButtonContainer: {
    position: 'absolute',
    zIndex: '2',
    top: '5px',
    right: '3%',
  },
  saveButtonContainer: {
    position: 'relative',
    '& button': {
      float: 'right'
    }
  }
}));

const AdaptationPlanCard = ({ planId }) => {
  const expService = useExpService();
  const classes = useStyles();
  const history = useHistory();
  let spaces = useRef(3);;

  const [editing, setEditMode] = useState(false);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    expService.get('plan', planId)
      .then(res => setPlan(res));
  }, [expService, planId])

  const convertDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  const editPlanField = (fieldType, position, nameType, value) => {
    console.log(plan);
    if (fieldType === 'name') {
      setPlan(prevData => {
        return {
          ...prevData,
          [position]: {
            ...prevData[position],
            name: {
              ...prevData[position].name,
              [nameType]: value
            }
          }
        }
      })
    } else if (fieldType === 'role') {
      setPlan(prevData => {
        return {
          ...prevData,
          employee: {
            ...prevData.employee,
            role: [value]
          }
        }
      })
    } else {
      setPlan(prevData => {
        return {
          ...prevData,
          [position]: value
        }
      })
    }
  }

  const passStaffObj = (staffObj) => {
    console.log(staffObj);
  }

  const handleBackIconClick = () => {
    history.replace('/plans/');
  }

  const handleDataChange = (dataField, value) => {
    editPlanField('date', dataField, 'data', value);
  }

  const handleRoleChange = (e) => {
    console.log(e.taget);
    //returnDataObj('role', 'role', 'role', e.taget.value)
  }

  const handleEditIconClick = ()=>{
    spaces.current = editing ? 3 : 2;
    setEditMode(!editing);
  }

  if (!plan) return <h1>Loading...</h1>
  return (
    <>
      <Typography className={classes.cardHeader} variant='h6'>
        <IconButton color="inherit" onClick={handleBackIconClick}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <div className={classes.title}>Адаптационный план сотрудника</div>
      </Typography>
      <Paper elevation={4} className={classes.cardContainer}>
        <IconButton
          color="inherit"
          className={classes.editButtonContainer}
          onClick={handleEditIconClick}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <Grid container spacing={spaces.current}>
          <Grid item container spacing={2}>
            <Grid className={classes.fieldLabelContainer} item xs={6}>
              <Typography className={classes.textEnd}>
                ФИО Сотрудника:
          </Typography>
            </Grid>
            <Grid item xs={6}>
              {editing
                ? <SelectStaff
                  value={plan.employee}
                  fetchFunc={() => expService.getAll('users')}
                  passStaffObj={passStaffObj}
                />
                : <Typography>{plan.employee.name.last + ' ' + plan.employee.name.first + ' ' + plan.employee.name.middle} </Typography>
              }
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid className={classes.fieldLabelContainer} item xs={6}>
              <Typography className={classes.textEnd}>
                Должность:
          </Typography>
            </Grid>
            <Grid item xs={6}>
              {editing
                ? <TextField
                  value={plan.employee.role}
                  onChange={handleRoleChange}
                />
                : <Typography>{plan.employee.role} </Typography>
              }
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid className={classes.fieldLabelContainer} item xs={6}>
              <Typography className={classes.textEnd}>
                ФИО Руководителя:
          </Typography>
            </Grid>
            <Grid item xs={6}>
              {editing
                ? <SelectStaff
                  value={plan.supervisor}
                  fetchFunc={() => expService.getAll('users')}
                  passStaffObj={passStaffObj}
                />
                : <Typography>
                  {plan.supervisor.name.last + ' ' + plan.supervisor.name.first + ' ' + plan.supervisor.name.middle}
                </Typography>
              }
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid className={classes.fieldLabelContainer} item xs={6}>
              <Typography className={classes.textEnd}>
                Начало испытательного срока:
          </Typography>
            </Grid>
            <Grid item xs={6}>
              {editing
                ? <CalendarSingle
                  passChanges={handleDataChange}
                  dateField='adaptationStart'
                  value={plan.adaptationStart}
                />
                : <Typography>{convertDate(plan.adaptationStart)} </Typography>
              }
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid className={classes.fieldLabelContainer} item xs={6}>
              <Typography className={classes.textEnd}>
                Конец испытательного срока:
          </Typography>
            </Grid>
            <Grid item xs={6}>
              {editing
                ? <CalendarSingle
                  passChanges={handleDataChange}
                  dateField='adaptationEnd'
                  value={plan.adaptationEnd}
                />
                : <Typography>{convertDate(plan.adaptationEnd)} </Typography>
              }
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid className={classes.fieldLabelContainer} item xs={6}>
              <Typography className={classes.textEnd}>
                Создан HR-сотрудником:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {'Смирнова Елена Владимировна'}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ProgressBar stage={plan.stage} />
          </Grid>
        </Grid>
        <Grid item>
          <Typography color="secondary" variant="body2" className={classes.bottomCreationDate}>
            Создан {convertDate(plan.date)}
          </Typography>
        </Grid>
        <Grid item className={classes.saveButtonContainer}>
          {editing &&
            <Button
              variant="contained"
              className={classes.saveButton}
              color="primary"
              type="Submit"
              startIcon={<SaveIcon />}
            >
              Сохранить
            </Button>
          }
        </Grid>
      </Paper>
    </>
  )

}

export default AdaptationPlanCard;