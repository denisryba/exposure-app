import React, {useState} from 'react';
import { useExpService } from '../../context/expService.js';
import { 
  Box,
  Dialog,
  Button,
  Grid,
  Typography
 } 
from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import locale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import role from '../../utils/role.js';
import Select from '../../reusable/Select.js';


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
  let month = new Date().getMonth();
  const exposureService = useExpService();
  
  const [employeeId, setEmployeeId] = useState('');
  const [positionId, setPositionId] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  const [adaptationStart, setAdaptationStart] = useState(new Date());
  const [adaptationEnd, setAdaptationEnd] = useState(new Date().setMonth(month + 3));

  const handleAdaptationStart = date => setAdaptationStart(date);
  const handleAdaptationEnd = date => setAdaptationEnd(date);

  const addPlan = (event) => {
    event.preventDefault()
    const planObject = 
    {
      employeePosition: positionId,
      employee: employeeId,
      supervisor: supervisorId,
      hr: "5e680f360f94107d10acba1d",
      stage: "rated",
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
        setEmployeeId('');
        setSupervisorId('');
        setPositionId('');
        setAdaptationStart(new Date());
        setAdaptationEnd(new Date());
      })
      .catch(error => toggleCreationMode());
  }

  return (
    <Dialog open={onCreation} onClose={toggleCreationMode} >      
      <Box p="2rem" maxWidth={400}>
        <form onSubmit={addPlan}>    
          <Grid container spacing={2} justify='flex-end' >
            <Grid item xs={12}>
              <Typography variant="h6">Создание плана адаптации</Typography> 
            </Grid>
            <Grid item xs={12}>
              <Select 
                label='ФИО сотрудника'
                setValue={setEmployeeId} 
                path='users'
                role={role.employee}
              />
            </Grid>
            <Grid item xs={12}>
              <Select  
                label='Должность'
                setValue={setPositionId} 
                path='positions'
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label='ФИО руководителя'
                setValue={setSupervisorId} 
                path='users'
                role={role.supervisor}
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
              <Grid item xs={6}>
                <KeyboardDatePicker  
                  inputVariant="outlined"           
                  disableToolbar        
                  variant="inline"
                  format="dd.MM.yyyy"
                  label="Начало адаптации"
                  autoOk={true}
                  fullWidth
                  value={adaptationStart}
                  onChange={handleAdaptationStart}               
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  inputVariant="outlined"
                  disableToolbar
                  variant="inline"
                  format="dd.MM.yyyy"
                  label="Конец адаптации"
                  autoOk={true}
                  fullWidth
                  value={adaptationEnd}
                  onChange={handleAdaptationEnd}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item>
              <Button 
                variant="contained" 
                onClick={toggleCreationMode} 
                color="primary"
                type="Submit">
                Создать
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Dialog>
  )
};

export default PlanCreationForm;