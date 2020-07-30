import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth.js';

import ProgressBar from '../../reusable/ProgressBar.js';
import SelectUsers from '../../reusable/Select.js';
import formatService from '../../services/formatService.js'
import { useExpService } from '../../context/expService.js';
import ComponentAvailability from '../../reusable/ComponentAvailability.js';

import {
  Grid,
  Paper,
  Button,
  makeStyles,
  Typography,
  IconButton,
  Select,
  FormHelperText,
  MenuItem,
  FormControl,
  Box
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CalendarSingle from '../../reusable/CalendarSingle.js';
import Loader from '../../reusable/Loader.js';


const useStyles = makeStyles((theme) => ({
  cardContainer: {
    position: 'relative',
    padding: theme.spacing(3),
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1)
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
    alignItems: 'center',
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

  const handleStageChange = (e) => {
    editDisplayPlanField('stage', e.target.value);
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
        spaces.current = editing ? 3 : 2;
        setEditMode(false);
        setOldDisplayPlan(displayPlan);
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
        <Paper elevation={4} className={classes.cardContainer}>
          <ComponentAvailability
            stageRoleObj={stageRoleModel.editBtn}
            currentRole={user.role}
            currentStage={oldDisplayPlan.stage}
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
                    value={displayPlan.employee}
                  />
                  : <Typography>{displayPlan.employee.name} </Typography>
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
                    {displayPlan.supervisor.name}
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
                  : <Typography>{formatService.setDate(displayPlan.adaptationStart)} </Typography>
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
                  : <Typography>{formatService.setDate(displayPlan.adaptationEnd)} </Typography>
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
                  {displayPlan.hr.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ProgressBar stage={displayPlan.stage} />
          </Grid>
          <Grid item>
            <Typography color="secondary" variant="body2" className={classes.bottomCreationDate}>
              Создан {formatService.setDate(displayPlan.date)}
            </Typography>
          </Grid>
          {editing &&
            <Grid xs={12} item container className={classes.saveButtonContainer}>
              <FormControl>
                <Select
                  value={displayPlan.stage}
                  onChange={handleStageChange}
                >
                  <MenuItem value={0}>Заполнение</MenuItem>
                  <MenuItem value={1}>Согласование</MenuItem>
                  <MenuItem value={2}>Выполнение</MenuItem>
                  <MenuItem value={3}>Оценка</MenuItem>
                  <MenuItem value={4}>Завершение</MenuItem>
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
        : <Loader size={200} />
      }</>
  )

}

export default AdaptationPlanCard;