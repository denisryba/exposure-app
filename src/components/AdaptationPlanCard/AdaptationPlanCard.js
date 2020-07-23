import React, { useState, useEffect } from 'react';
import InputField from './CardInputField.js';
import ProgressBar from './ProgressBar.js';
import SelectStaff from '../../globalElements/SelectStaff.js'

import { Grid, Paper, Button, makeStyles, Typography } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles({
  title: {
    margin: '20px 0'
  },
  cardContainer: {
    position: 'relative',
    padding: '24px 10px 8px 9px',
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
  },
  button: {
    backgroundColor: '#A6CE39',
    fontSize: 10,
    '&:hover': {
      backgroundColor: '#99bd36',
    }
  }
});

const AdaptationPlanCard = ({ expService, planId }) => {

  planId = "5f189bb33d627606ecf25e8f";

  const classes = useStyles();

  const [editing, toggleEditMode] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    expService.get('plan', planId)
      .then(res => setData(res));
  }, [expService, planId])

  const convertDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  const changeField = (e) => {
    console.log(e.target.value);
  }

  // const nameChange = (e, fieldName) => {
  //   const [first, last, middle] = e.target.value.split(' ');
  //   const nameObj = {
  //     name: {
  //       first: first,
  //       last: last,
  //       middle: middle
  //     }
  //   };
  //   setData(prevData => {
  //     return {
  //       ...prevData,
  //       [fieldName]: nameObj
  //     }
  //   })
  // }
  // const nameChange = (e, personType, fieldName) => {
  //   setData(prevData => {
  //     console.log({
  //       ...prevData,
  //       [personType]: {
  //         ...prevData[personType],
  //         name: {
  //           ...prevData[personType].name,
  //           [fieldName]: e.target.value
  //         }
  //       }
  //     });
  //     return {
  //       ...prevData,
  //       [personType]: {
  //         ...prevData[personType],
  //         name: {
  //           ...prevData[personType].name,
  //           [fieldName]: e.target.value
  //         }
  //       }
  //     }
  //   },[e.target.value])
  //   console.log(data);
  // }

  const returnDataObj = ({ fieldType, position, nameType, value }) => {
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

  const passStaffObj = (staffObj)=>{
    console.log(staffObj);
  }

  if (!data) return <h1>Loading...</h1>
  return (
    <Grid item xs={12} sm={6}>
      <Typography className={classes.cardHeader} variant='h6'>
        <KeyboardBackspaceIcon />
        <div className={classes.title}>Адаптационный план сотрудника</div>
      </Typography>
      <Paper elevation={4} className={classes.cardContainer}>
        <div className={classes.editButtonContainer}>
          <EditIcon onClick={() => toggleEditMode(!editing)} />
        </div>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography className={classes.textEnd}>
              ФИО Сотрудника:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {editing
              ? <div>
                <SelectStaff
                  fetchFunc={() => expService.getAll('users')}
                  label="Cотрудник"
                  passStaffObj={passStaffObj}
                />
              </div>
              : <Typography>{data.employee.name.last + ' ' + data.employee.name.first + ' ' + data.employee.name.middle} </Typography>
            }
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.textEnd}>
              Должность:
                            </Typography>
          </Grid>
          <Grid item xs={6}>
            {editing
              ? <InputField
                value={data.employee.role}
                returnDataObj={returnDataObj}
                fieldType='role'
                position='role'
                nameType='role'
              />
              : <Typography>{data.employee.role} </Typography>
            }
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.textEnd}>
              ФИО Руководителя:
                            </Typography>
          </Grid>
          <Grid item xs={6}>
            {editing
              ? <div>
                <InputField
                  value={data.supervisor.name.last}
                  returnDataObj={returnDataObj}
                  fieldType='name'
                  position='supervisor'
                  nameType='last'
                />
                <InputField
                  value={data.supervisor.name.first}
                  returnDataObj={returnDataObj}
                  fieldType='name'
                  position='supervisor'
                  nameType='first'
                />
                <InputField
                  value={data.supervisor.name.middle}
                  returnDataObj={returnDataObj}
                  fieldType='name'
                  position='supervisor'
                  nameType='middle'
                />
              </div>
              : <Typography>{data.supervisor.name.last + ' ' + data.supervisor.name.first + ' ' + data.supervisor.name.middle} </Typography>
            }
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.textEnd}>
              Период испытательного срока:
                            </Typography>
          </Grid>
          <Grid item xs={6}>
            {editing
              ? <InputField value={convertDate(data.adaptationStart) + '-' + convertDate(data.adaptationEnd)} />
              : <Typography>{convertDate(data.adaptationStart) + '-' + convertDate(data.adaptationEnd)} </Typography>
            }
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.textEnd}>
              Создан HR-сотрудником:
                            </Typography>
          </Grid>
          <Grid item xs={6}>
            {editing
              ? <InputField
                value={'Jane Doe [hardcoded]'}
                returnDataObj={returnDataObj}
                fieldType='name'
                position='supervisor'
                nameType='middle'
              />
              : <Typography>{'Jane Doe [hardcoded]'} </Typography>
            }
          </Grid>
          <Grid item xs={12}>
            <ProgressBar stage={data.stage} />
          </Grid>
        </Grid>
        <Typography className={classes.bottomCreationDate}>
          Создан {convertDate(data.date)}
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
    </Grid>
  )

}

export default AdaptationPlanCard;