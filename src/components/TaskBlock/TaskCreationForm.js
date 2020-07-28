import React, {useState} from 'react';
import { 
  Dialog,
  Grid,
  TextField,
  Button,
  Box,
  Typography
 } 
from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import locale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { useExpService } from '../../context/expService.js';

const TaskCreationForm = ({ tasks, setTasks, open, planId, toggleCreationForm }) => {
  const exposureService = useExpService();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [executionStart, setExecutionStart] = useState(new Date());
  let day = new Date().getDate();
  const [executionEnd, setExecutionEnd] = useState(new Date().setDate(day + 7));

  const handleChangeName = event => setName(event.target.value);
  const handleChangeDescription = event => setDescription(event.target.value);
  const handleChangeExecutionStart = date => setExecutionStart(date);
  const handleChangeExecutionEnd = date => setExecutionEnd(date);

  const addTask = (event) => {
    event.preventDefault();
    const taskObject = 
    {
      name,
      description,
      executionStart,
      executionEnd,
      plan: planId
    };

    exposureService
      .create('task', taskObject)
      .then(createdTask => {
        setName('');
        setDescription('');
        setExecutionStart(new Date());
        setExecutionEnd(new Date());
        setTasks(tasks.concat(createdTask));
        toggleCreationForm();
      });
  }

  return (
    <Dialog open={open} onClose={toggleCreationForm}>
      <Box  p="2rem">
        <form onSubmit={addTask}>
          <Grid container spacing={2} justify='flex-end' >
            <Grid item xs={12}>
             <Typography variant="h6">Создание задачи</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Название задачи' 
                variant="outlined"
                value={name} 
                onChange={handleChangeName} 
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Описание задачи' 
                variant="outlined"
                value={description} 
                onChange={handleChangeDescription} 
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
              <Grid item xs={6}>
                <KeyboardDatePicker             
                  disableToolbar        
                  variant="inline"
                  format="dd.MM.yyyy"
                  label="Дата начала"
                  value={executionStart}
                  onChange={handleChangeExecutionStart}
                  autoOk={true} 
                  fullWidth    
                  inputVariant="outlined"     
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd.MM.yyyy"
                  label="Дата окончания"
                  value={executionEnd}
                  onChange={handleChangeExecutionEnd}
                  autoOk={true}
                  inputVariant="outlined"
                  fullWidth
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
  )
}

export default TaskCreationForm;