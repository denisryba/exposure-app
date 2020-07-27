import React, { useState } from 'react';
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
        setEmployeeObj(null);
        setSupervisorObj(null);
        setPositionObj(null);
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
                variant='outlined'
                setValue={setEmployeeObj}
                path='users'
                role={role.employee}
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