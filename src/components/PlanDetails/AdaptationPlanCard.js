import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth.js';

import RateBlock from './RateBlock.js';
import ProgressBar from '../../reusable/ProgressBar.js';
import SelectUsers from '../../reusable/Select.js';
import formatService from '../../services/formatService.js'
import { useExpService } from '../../context/expService.js';
import ComponentAvailability from '../../reusable/ComponentAvailability.js';
import role from '../../utils/role.js';

import {
  Grid,
  Paper,
  Button,
  makeStyles,
  Typography,
  IconButton,
  Box,
  Collapse
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import CalendarSingle from '../../reusable/CalendarSingle.js';
import Loader from '../../reusable/Loader.js';
import CloseIcon from '@material-ui/icons/Close';
import { notify } from '../../reusable/Notification.js';


const useStyles = makeStyles((theme) => ({
  cardContainer: {
    position: 'relative',
    padding: theme.spacing(2),
  },
  editIcon: {
    marginLeft: 'auto',
    marginBottom: theme.spacing(1)
  },
  row: {
    minHeight: (40 + theme.spacing(1)),
    alignItems: 'center',
  },
  textEnd: {
    marginRight: theme.spacing(1),
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  planField :{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  bottomCreationDate: {
    textAlign: 'end',
    marginBottom: theme.spacing(1)
  },
  rateSelect: {
    width: '100%',
    padding: 0
  }
}));

const AdaptationPlanCard = ({ displayPlan, setDisplayPlan }) => {
  const expService = useExpService();
  const classes = useStyles();
  const history = useHistory();
  let spaces = useRef(3);
  const user = useAuth()

  const [editing, setEditMode] = useState(false);
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
    setDisplayPlan(prevData => {
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

  const handleBackIconClick = () => {
    history.replace('/plans/');
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
    setDisplayPlan(oldDisplayPlan);
    setEditMode(!editing);
  }

  const handleSaveBtnClick = () => {
    expService.update('plan', displayPlan.id, {
      ...displayPlan,
      employee: displayPlan.employee.id,
      hr: displayPlan.hr.id,
      supervisor: displayPlan.supervisor.id,
      employeePosition: displayPlan.employeePosition.id,
    })
      .then(() => {
        notify('success', 'Изменения сохранены.');
        spaces.current = editing ? 3 : 2;
        setEditMode(false);
        setOldDisplayPlan(displayPlan);
      }).catch(() => {
        notify('error', 'Возникла ошибка. Проверьте правильность заполнения полей.');
      });
  }

  return (
    <> 
      <Box className={classes.cardHeader}>
        <IconButton size='small' edge='end' color="inherit" onClick={handleBackIconClick}>
            <KeyboardBackspaceIcon />
        </IconButton>
        <Typography variant='h5'>
          Адаптационный план
        </Typography>
      </Box> 
      {displayPlan ?
        <Paper elevation={2} className={classes.cardContainer}>
          <Grid container>
            <ComponentAvailability
              stageRoleObj={stageRoleModel.editBtn}
              currentRole={user.role}
              currentStage={displayPlan.stage}
            >
              <IconButton
                size='small'
                className={classes.editIcon}
                onClick={handleEditIconClick}
              >
                { editing
                  ? <CloseIcon />
                  : <EditIcon />
                }
              </IconButton>
            </ComponentAvailability>
          </Grid>
          <Grid container direction='column' spacing={1}>
            <Grid item container className={classes.row} alignItems='center'>
              <Grid item container xs={4}>
                <Typography className={classes.textEnd}>
                  Сотрудник:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                {editing
                  ? <SelectUsers
                    label=''
                    size='small'
                    variant='outlined'
                    setValue={passUserObj}
                    path='users'
                    role='employee'
                    attached='false'
                    value={displayPlan.employee}
                  />
                  : <Typography className={classes.planField}>{displayPlan.employee.name} </Typography>
                }
              </Grid>
            </Grid>
              <Grid item container className={classes.row} >
                <Grid item container xs={4}>
                  <Typography className={classes.textEnd}>
                    Должность:
                  </Typography>
                </Grid>
                <Grid item xs={8}  sm={7}>
                  {editing
                    ? <SelectUsers
                      size='small'
                      variant='outlined'
                      label=''
                      setValue={passPositionId}
                      path='positions'
                      role='employeePosition'
                      value={displayPlan.employeePosition}
                    />
                    : <Typography className={classes.planField}>{displayPlan.employeePosition.name} </Typography>
                  }
                </Grid>
              </Grid>
              
            <Grid item container className={classes.row}>
              <Grid item container xs={4}>
                <Typography className={classes.textEnd}>
                  Руководитель:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                {editing
                    ? <SelectUsers
                      label=''
                      size='small'
                      variant='outlined'
                      setValue={passUserObj}
                      path='users'
                      role='supervisor'
                      value={displayPlan.supervisor}
                    />
                    : <Typography className={classes.planField}>
                      {displayPlan.supervisor.name}
                    </Typography>
                  }
              </Grid>
            </Grid>

            <Grid item container className={classes.row}>
              <Grid item container xs={4}>
                <Typography className={classes.textEnd}>
                  Начало исп. срока:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                {editing
                  ? <CalendarSingle
                    size='small'
                    passChanges={handleDataChange}
                    dateField='adaptationStart'
                    value={displayPlan.adaptationStart}
                  />
                  : <Typography className={classes.planField}>{formatService.setDate(displayPlan.adaptationStart)} </Typography>
                }
              </Grid>
            </Grid>
            <Grid item container className={classes.row}>
              <Grid item container xs={4}>
                <Typography className={classes.textEnd}>
                  Конец исп. срока:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                {editing
                  ? <CalendarSingle
                    size='small'
                    passChanges={handleDataChange}
                    dateField='adaptationEnd'
                    value={displayPlan.adaptationEnd}
                  />
                  : <Typography className={classes.planField}>{formatService.setDate(displayPlan.adaptationEnd)} </Typography>
                }
              </Grid>
            </Grid>
            <Grid item container className={classes.row}>
              <Grid item container xs={4}>
                <Typography className={classes.textEnd}>
                  Создан:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                <Typography className={classes.planField}>
                  {displayPlan.hr.name}
                </Typography>
              </Grid>
            </Grid>
            {(user.role !== role.employee) &&
              <RateBlock
                classes={classes}
                displayPlan={displayPlan}
                handleCompleteMarkChange={handleCompleteMarkChange}
                handleRateChange={handleRateChange}
              />
            }
          </Grid>
          <Grid item xs={12}>
            <ProgressBar stage={displayPlan.stage} />
          </Grid>
            <Typography color='textSecondary' variant="body2" className={classes.bottomCreationDate}>
              Создан {formatService.setDate(displayPlan.date)}
            </Typography>
          
          <Collapse in={editing} timeout="auto" unmountOnExit>
            <Grid xs={12} item container justify='flex-end'>
              <Button
                color="primary"
                type="Submit"
                onClick={handleSaveBtnClick}>
                Сохранить
              </Button>
            </Grid>
          </Collapse>
        </Paper>
        : <Loader size={200} />
      }
    </>
  )

}

export default AdaptationPlanCard;