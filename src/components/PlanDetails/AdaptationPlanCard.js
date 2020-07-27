import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import ProgressBar from '../../reusable/ProgressBar.js';
import SelectUsers from '../../reusable/Select.js';

import { Grid, Paper, Button, makeStyles, Typography, IconButton, Select, FormHelperText, MenuItem, FormControl } from '@material-ui/core';
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

const AdaptationPlanCard = ({ planId }) => {
  const expService = useExpService();
  const classes = useStyles();
  const history = useHistory();
  let spaces = useRef(3);;

  const [editing, setEditMode] = useState(false);
  const [plan, setPlan] = useState(null);
  const [oldPlan, setOldPlan] = useState(null);
  const [displayPlan, setDisplayPlan] = useState(null);
  const [oldDisplayPlan, setOldDisplayPlan] = useState(null);

  useEffect(() => {
    expService.get('plan', planId)
      .then(res => {
        setDisplayPlan(res);
        setOldDisplayPlan(res);
        setPlan({
          ...res,
          employeePosition: res.employeePosition.id,
          hr: res.hr.id,
          employee: res.employee.id,
          supervisor: res.supervisor.id,
        });
        setOldPlan({
          ...res,
          employeePosition: res.employeePosition.id,
          hr: res.hr.id,
          employee: res.employee.id,
          supervisor: res.supervisor.id,
        });
      });
  }, [expService, planId])

  const convertDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  const editPlanField = (position, value) => {
    console.log(plan);
    setPlan(prevData => {
      return {
        ...prevData,
        [position]: value
      }
    })
  }

  const editInitialPlanField = (position, value) => {
    setDisplayPlan(prevData => {
      return {
        ...prevData,
        [position]: value
      }
    })
  }

  const passUserObj = (userObj, role) => {
    editPlanField(role, userObj.id);
    editInitialPlanField(role, userObj);
  }

  const passPositionId = (positionObj, role) => {
    editPlanField(role, positionObj.id);
    editInitialPlanField(role, positionObj);
  }

  const handleBackIconClick = () => {
    history.replace('/plans/');
  }

  const handleDataChange = (dataField, value) => {
    editPlanField(dataField, value);
    editInitialPlanField(dataField, value);
  }

  const handleStageChange = (e) => {
    editPlanField('stage', e.target.value);
    editInitialPlanField('stage', e.target.value);
  }

  const handleEditIconClick = () => {
    spaces.current = editing ? 3 : 2;
    setDisplayPlan(oldDisplayPlan);
    setPlan(oldPlan);
    setEditMode(!editing);
  }

  const handleSaveBtnClick = () => {
    expService.update('plan', plan.id, plan)
      .then(() => {
        spaces.current = editing ? 3 : 2;
        setEditMode(false);
        setOldDisplayPlan(displayPlan);
        setOldPlan(plan);
      });
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
                ? <SelectUsers
                  label=''
                  variant="standard"
                  setValue={passUserObj}
                  path='users'
                  role='employee'
                  value={displayPlan.employee}
                />
                : <Typography>{displayPlan.employee.name.last + ' ' + displayPlan.employee.name.first + ' ' + displayPlan.employee.name.middle} </Typography>
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
                ? <SelectUsers
                  label=''
                  variant="standard"
                  setValue={passPositionId}
                  path='positions'
                  role='employeePosition'
                  value={displayPlan.employeePosition}
                />
                : <Typography>{displayPlan.employeePosition.name} </Typography>
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
                ? <SelectUsers
                  label=''
                  variant="standard"
                  setValue={passUserObj}
                  path='users'
                  role='supervisor'
                  value={displayPlan.supervisor}
                />
                : <Typography>
                  {displayPlan.supervisor.name.last + ' ' + displayPlan.supervisor.name.first + ' ' + displayPlan.supervisor.name.middle}
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
                  value={displayPlan.adaptationStart}
                />
                : <Typography>{convertDate(displayPlan.adaptationStart)} </Typography>
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
                  value={displayPlan.adaptationEnd}
                />
                : <Typography>{convertDate(displayPlan.adaptationEnd)} </Typography>
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
                {displayPlan.hr.name.last + ' ' + displayPlan.hr.name.first + ' ' + displayPlan.hr.name.middle}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ProgressBar stage={displayPlan.stage} />
        </Grid>
        <Grid item>
          <Typography color="secondary" variant="body2" className={classes.bottomCreationDate}>
            Создан {convertDate(displayPlan.date)}
          </Typography>
        </Grid>
        {editing &&
          <Grid xs={12} item container className={classes.saveButtonContainer}>
            <FormControl>
              <Select
                value={displayPlan.stage}
                onChange={handleStageChange}
              >
                <MenuItem value={"creation"}>Создание</MenuItem>
                <MenuItem value={"filling"}>Заполнение</MenuItem>
                <MenuItem value={"assigning"}>Согласование</MenuItem>
                <MenuItem value={"execution"}>Выполнение</MenuItem>
                <MenuItem value={"rating"}>Оценка</MenuItem>
                <MenuItem value={"completed"}>Завершение</MenuItem>
              </Select>
              <FormHelperText>Выберите стадию плана</FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="Submit"
              size='small'
              startIcon={<SaveIcon />}
              onClick={handleSaveBtnClick}
            >
              Сохранить
            </Button>
          </Grid>
        }
      </Paper>
    </>
  )

}

export default AdaptationPlanCard;