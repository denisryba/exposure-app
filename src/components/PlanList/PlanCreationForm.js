import React, { useState } from 'react';
import { useExpService } from '../../context/expService.js';
import { useAuth } from '../../context/auth.js';
import {
  Box,
  Dialog,
  Button,
  Grid,
  Typography,
  IconButton
 } 
from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import locale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import role from '../../utils/role.js';
import Select from '../../reusable/Select.js';
import Notification, { notify } from '../../reusable/Notification.js';


const PlanCreationForm = (
  {
    onCreation,
    toggleCreationMode,
    plans,
    setPlans,
    pageCount,
    setPageCount,
    currentPage,
    limit
  }
) => {
  const user = useAuth();
  let month = new Date().getMonth();
  const exposureService = useExpService();

  const [employeeObj, setEmployeeObj] = useState(null);
  const [positionObj, setPositionObj] = useState(null);
  const [supervisorObj, setSupervisorObj] = useState(null);
  const [adaptationStart, setAdaptationStart] = useState(new Date());
  const [adaptationEnd, setAdaptationEnd] = useState(new Date().setMonth(month + 3));

  const handleAdaptationStart = date => setAdaptationStart(date);
  const handleAdaptationEnd = date => setAdaptationEnd(date);

  const addPlan = (event) => {
    event.preventDefault()
    const planObject =
    {
      employeePosition: positionObj.id,
      employee: employeeObj.id,
      supervisor: supervisorObj.id,
      hr: user.id,
      stage: 0,
      adaptationStart: adaptationStart,
      adaptationEnd: adaptationEnd,
      completed: "false",
      rate: "A",
      tasks: []
    };


    exposureService
      .create('plan', planObject)
      .then(createdPlan => {
        if (currentPage === pageCount) {
          if (plans.length === limit)
            setPageCount(pageCount + 1);
          else
            setPlans(plans.concat(createdPlan));
        };
        setEmployeeObj(null);
        setSupervisorObj(null);
        setPositionObj(null);
        setAdaptationStart(new Date());
        setAdaptationEnd(new Date());
        toggleCreationMode()
        notify('success', 'План был успешно создан.');
      })
      .catch(error => {
        notify('error', 'Ошибка при создании плана.');
      });
  }

  return (
    <>
    <Dialog open={onCreation} onClose={toggleCreationMode} > 
      <Box p="1.5rem" maxWidth={400}>
        <form onSubmit={addPlan}>    
          <Grid container spacing={2} justify='flex-end'>
            <Grid item xs={12} container justify='space-between'>
              <Typography variant="h6">Создание плана</Typography> 
              <IconButton size="small" onClick={toggleCreationMode} >
                <CloseIcon />
              </IconButton> 
            </Grid>
            <Grid item xs={12}>
              <Select
                label='ФИО сотрудника'
                variant='outlined'
                setValue={setEmployeeObj}
                path='users'
                role={role.employee}
                attached={false}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label='Должность'
                variant='outlined'
                setValue={setPositionObj}
                path='positions'
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label='ФИО руководителя'
                variant='outlined'
                setValue={setSupervisorObj}
                path='users'
                role={role.supervisor}
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
              <Grid item xs={12} sm={6}>
                <KeyboardDatePicker  
                  inputVariant="outlined"           
                  disableToolbar        
                  variant="inline"
                  format="dd.MM.yyyy"
                  label="Начало адаптации"
                  autoOk={true}
                  fullWidth
                  required
                  value={adaptationStart}
                  onChange={handleAdaptationStart}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  inputVariant="outlined"
                  disableToolbar
                  variant="inline"
                  format="dd.MM.yyyy"
                  label="Конец адаптации"
                  required
                  autoOk={true}
                  fullWidth
                  value={adaptationEnd}
                  onChange={handleAdaptationEnd}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item xs={12} sm={3}>
              <Button 
                variant="contained" 
                color="primary"
                type="Submit"
                fullWidth>
                Создать
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Dialog>
    <Notification />
  </>
  )
};

export default PlanCreationForm;