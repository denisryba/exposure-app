import React, { useState } from 'react';
import {
  Dialog,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem
}
  from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import locale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { useExpService } from '../../context/expService.js';
import Notification, { notify } from '../../reusable/Notification.js';

const TaskCreationForm = ({ tasks, setTasks, open, planId, toggleCreationForm }) => {
  const exposureService = useExpService();
  const [name, setName] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [description, setDescription] = useState('');
  const [executionStart, setExecutionStart] = useState(new Date());
  let day = new Date().getDate();
  const [executionEnd, setExecutionEnd] = useState(new Date().setDate(day + 7));

  const handleChangeName = event => setName(event.target.value);
  const handleChangeDescription = event => setDescription(event.target.value);
  const handleChangeExecutionStart = date => setExecutionStart(date);
  const handleChangeExecutionEnd = date => setExecutionEnd(date);

  const handleChangeIsCompleted = (event) => {
    setIsCompleted(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();
    const taskObject =
    {
      name,
      description,
      executionStart,
      executionEnd,
      plan: planId,
      completed: isCompleted
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
        notify('success', 'Задача была успешно создана.');
      })
      .catch(error => {
        notify('error', 'Ошибка при создании задачи.');
      });
  }

  return (
    <>
      <Dialog open={open} onClose={toggleCreationForm}>
        <Box p="2rem">
          <form onSubmit={addTask}>
            <Grid container spacing={2} justify='flex-end' >
              <Grid item xs={12} container justify='space-between'>
                <Typography variant="h6">Создание задачи</Typography>
                <IconButton size="small" onClick={toggleCreationForm} >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Название задачи'
                  variant="outlined"
                  value={name}
                  onChange={handleChangeName}
                  fullWidth
                  required
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
                <Grid item sm={6} xs={12}>
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
                <Grid item sm={6} xs={12}>
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
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <Select value={isCompleted} onChange={handleChangeIsCompleted}>
                    <MenuItem value={false}>Не выполнена</MenuItem>
                    <MenuItem value={true}>Выполнена</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
}

export default TaskCreationForm;