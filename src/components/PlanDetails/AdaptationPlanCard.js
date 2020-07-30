import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth.js';

import RateBlock from './RateBlock.js';
import ProgressBar from '../../reusable/ProgressBar.js';
import SelectUsers from '../../reusable/Select.js';
import formatService from '../../services/formatService.js'
import { useExpService } from '../../context/expService.js';
import ComponentAvailability from '../../reusable/ComponentAvailability.js';
import ErrorBoundary from '../../reusable/ErrorBoundary.js';
import role from '../../utils/role.js';

import {
  Grid,
  Paper,
  Button,
  makeStyles,
  Typography,
  IconButton,
  Box
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CalendarSingle from '../../reusable/CalendarSingle.js';
import Loader from '../../reusable/Loader.js';
import { notify } from '../../reusable/Notification.js';


const useStyles = makeStyles((theme) => ({
  cardContainer: {
    position: 'relative',
    padding: theme.spacing(3),
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
  rateSelect: {
    width: '100%'
  }
}));

const AdaptationPlanCard = ({ data: displayPlan, setDisplayPlan }) => {
  const expService = useExpService();
  const classes = useStyles();
  const history = useHistory();
  let spaces = useRef(3);
  const user = useAuth()

  const [editing, setEditMode] = useState(false);
  const [plan, setPlan] = useState(displayPlan);
  const [oldDisplayPlan, setOldDisplayPlan] = useState(displayPlan);

  const stageRoleModel = {
    editBtn: {
      supervisor: [1],
      employee: []
    },
    editSummary: {
      supervisor: [3],
      employee: []
    }
  }

  const editDisplayPlanField = (position, value) => {
    setPlan(prevData => {
      return {
        ...prevData,
        [position]: value
      }
    })
  }

  const passUserObj = (userObj, role) => {
    editDisplayPlanField(role, userObj);
  }

  const passPositionId = (positionObj, role) => {
    editDisplayPlanField(role, positionObj);
  }

  const handleDataChange = (dataField, value) => {
    editDisplayPlanField(dataField, value);
  }

  const handleCompleteMarkChange = (e) => {
    editDisplayPlanField('completed', e.target.value);
  }

  const handleRateChange = (e) => {
    editDisplayPlanField('rate', e.target.value);
  }

  const handleEditIconClick = () => {
    spaces.current = editing ? 3 : 2;
    setPlan(oldDisplayPlan);
    setEditMode(!editing);
  }

  const handleSaveBtnClick = () => {
    expService.update('plan', plan.id, {
      ...plan,
      employee: plan.employee.id,
      hr: plan.hr.id,
      supervisor: plan.supervisor.id,
      employeePosition: plan.employeePosition.id,
    })
      .then((res) => {
        notify('success', 'Изменения сохранены.');
        spaces.current = editing ? 3 : 2;
        setDisplayPlan(res);
        setEditMode(false);
        setOldDisplayPlan(res);
      }).catch(() => {
        notify('error', 'Возникла ошибка. Проверьте правильность заполнения полей.');
      });
  }

  return (
    <>
      <ErrorBoundary>
        <Paper elevation={4} className={classes.cardContainer}>
          <ComponentAvailability
            stageRoleObj={stageRoleModel.editBtn}
            currentRole={user.role}
            currentStage={plan.stage}
          >
            <IconButton
              color="inherit"
              className={classes.editButtonContainer}
              onClick={handleEditIconClick}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </ComponentAvailability>
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
                    attached='false'
                    value={plan.employee}
                  />
                  : <Typography>{plan.employee.name} </Typography>
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
                    value={plan.employeePosition}
                  />
                  : <Typography>{plan.employeePosition.name} </Typography>
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
                    value={plan.supervisor}
                  />
                  : <Typography>
                    {plan.supervisor.name}
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
                  : <Typography>{formatService.setDate(plan.adaptationStart)} </Typography>
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
                  : <Typography>{formatService.setDate(plan.adaptationEnd)} </Typography>
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
                  {plan.hr.name}
                </Typography>
              </Grid>
            </Grid>
            {(user.role !== role.employee) &&
              <RateBlock
                classes={classes}
                displayPlan={plan}
                handleCompleteMarkChange={handleCompleteMarkChange}
                handleRateChange={handleRateChange}
              />
            }
          </Grid>
          <Grid item xs={12}>
            <ProgressBar stage={plan.stage} />
          </Grid>
          <Grid item>
            <Typography color="secondary" variant="body2" className={classes.bottomCreationDate}>
              Создан {formatService.setDate(plan.date)}
            </Typography>
          </Grid>
          {editing &&
            <Grid xs={12} item container justify='flex-end'>
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
      </ErrorBoundary>
    </>
  )

}

export default AdaptationPlanCard;