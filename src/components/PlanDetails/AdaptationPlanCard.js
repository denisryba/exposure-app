import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ProgressBar from '../../reusable/ProgressBar.js';
import SelectStaff from '../../reusable/SelectStaff.js'

import { Grid, Paper, Button, makeStyles, Typography, TextField } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Calendar from '../../reusable/Calendar.js';
import { useExpService } from '../../context/expService.js';
import formatService from '../../services/formatService.js';


const useStyles = makeStyles({
  title: {
    margin: '20px 0'
  },
  cardContainer: {
    position: 'relative',
    padding: '35px 29px 8px 9px',
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
    textAlign: 'end',
    color: '#6B6B6B',
    fontSize: '13px',
    padding: '12px 6px 0px 0px',
  },
  namesInput: {
    width: '15%'
  },
  fieldLabelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textEnd: {
    textAlign: 'end',
    marginBottom: '2px',
  },
  editButtonContainer: {
    position: 'absolute',
    top: '17px',
    right: '4%',
    '& svg': {
      fontSize: '20px',
    }
  },
  adaptationPlanSaveBtn: {
    position: 'relative',
    height: '30px',
    marginTop: '20px',
    '& button': {
      float: 'right',
    }
  }
});

const AdaptationPlanCard = ({ planId }) => {
  const expService = useExpService();
  const classes = useStyles();
  let history = useHistory();

  const [editing, toggleEditMode] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {

    expService.get('plan', planId)
      .then(res => setData(res));
  }, [expService, planId])

  const returnDataObj = (fieldType, position, nameType, value) => {
    console.log(data);
    if (fieldType === 'name') {
      setData(prevData => {
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
      setData(prevData => {
        return {
          ...prevData,
          employee: {
            ...prevData.employee,
            role: [value]
          }
        }
      })
    } else {
      setData(prevData => {
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

  const handleDataChange = (dataType, value) => {
    dataType = (dataType === 'dateStart') ? 'adaptationStart' : 'adaptationEnd';
    returnDataObj('data', dataType, 'data', value.toJSON());
  }

  const handleRoleChange = (e) => {
    console.log(e.taget);
    //returnDataObj('role', 'role', 'role', e.taget.value)
  }

  if (!data) return <h1>Loading...</h1>
  return (
    <>
      <Typography className={classes.cardHeader} variant='h6'>
        <KeyboardBackspaceIcon onClick={handleBackIconClick} />
        <div className={classes.title}>Адаптационный план сотрудника</div>
      </Typography>
      <Paper elevation={4} className={classes.cardContainer}>
        <div className={classes.editButtonContainer}>
          <EditIcon onClick={() => toggleEditMode(!editing)} />
        </div>
        <Grid container spacing={1}>
          <Grid className={classes.fieldLabelContainer} item xs={6}>
            <Typography className={classes.textEnd}>
              ФИО Сотрудника:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {editing
              ? 
              <SelectStaff
                value={data.employee}
                fetchFunc={() => expService.getAll('users')}
                label="Cотрудник"
                passStaffObj={passStaffObj}
              />
              : <Typography>{formatService.getName(data.employee.name)}</Typography>
            }
          </Grid>
          <Grid className={classes.fieldLabelContainer} item xs={6}>
            <Typography className={classes.textEnd}>
              Должность:
                            </Typography>
          </Grid>
          <Grid item xs={6}>
            {editing
              ? <TextField
                label="Должность"
                value={data.employee.role}
                onChange={handleRoleChange}
              />
              : <Typography>{data.employee.role} </Typography>
            }
          </Grid>
          <Grid className={classes.fieldLabelContainer} item xs={6}>
            <Typography className={classes.textEnd}>
              ФИО Руководителя:
                            </Typography>
          </Grid>
          <Grid item xs={6}>
            {editing
              ? <SelectStaff
                value={data.supervisor}
                fetchFunc={() => expService.getAll('users')}
                label="Руководитель"
                passStaffObj={passStaffObj}
              />
              : <Typography>{formatService.getName(data.supervisor.name)} </Typography>
            }
          </Grid>
          <Grid className={classes.fieldLabelContainer} item xs={6}>
            <Typography className={classes.textEnd}>
              Период испытательного срока:
                            </Typography>
          </Grid>
          <Grid item xs={6}>
            {editing
              ? <Calendar
                passChanges={handleDataChange}
                dateStart={data.adaptationStart}
                dateStartLabel="Начало испытательного срока"
                dateEnd={data.adaptationEnd}
                dateEndLabel="Конец испытательного срока"
              />
              : <Typography>{formatService.getDate(data.adaptationStart) + '-' + formatService.getDate(data.adaptationEnd)} </Typography>
            }
          </Grid>
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
          <Grid item xs={12}>
            <ProgressBar stage={data.stage} />
          </Grid>
        </Grid>
        <Typography className={classes.bottomCreationDate}>
          Создан {formatService.getDate(data.date)}
        </Typography>
        {editing &&
          <div className={classes.adaptationPlanSaveBtn}>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              type="Submit"
              startIcon={<SaveIcon />}
            >
              Сохранить
                            </Button>
          </div>
        }
      </Paper>
    </>
  )

}

export default AdaptationPlanCard;