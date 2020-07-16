import React, {useState, useEffect} from 'react';
import { 
  makeStyles, 
  Box,
  FormGroup,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  createMuiTheme,
  ThemeProvider
 } 
from '@material-ui/core';
import axios from 'axios';
import FormMenu from "./FormMenu"
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const secondaryColor = '#a6ce39';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#a6ce39',
    }
  },
});

const useStyles = makeStyles({
  modal: {
    minWidth: 400
  },
  header: {
    paddingBottom: 0
  },
  button: {
    color: '#ffffff',
    width: "30%",
    fontSize: 10,
    marginTop: 15
  },
  datePickerInput: {
    '&:after': {
      borderColor: secondaryColor,
  }
  }
});

const PlanCreationForm = () => {
  const classes = useStyles();
  const [employeeName, setEmployeeName] = useState('');
  const [position, setPosition] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [supervisorList, setSupervisoreList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [adaptationStart, setAdaptationStart] = useState(new Date());
  const [adaptationEnd, setAdaptationEnd] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);

  const handleChangeEmployeeName = event => setEmployeeName(event.target.value);
  const handleChangePosition = event => setPosition(event.target.value);
  const handleChangeSupervisorName = event => setSupervisorName(event.target.value);
  const handleAdaptationStart = (date) => setAdaptationStart(date);
  const handleAdaptationEnd = (date) => setAdaptationEnd(date);

  // const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/users')
      .then(res => {
        setEmployeeList(res.data.filter(user => user.role === "employee"))
        setSupervisoreList(res.data.filter(user => user.role === "supervisor"))
      })
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/positions')
      .then(res => {
        setPositionList(res.data)
      })
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleClose} >      
      <Box className={classes.modal}  p="1rem" >
      <ThemeProvider theme={theme}>
        <DialogTitle className={classes.header}>Создание плана адаптации</DialogTitle>
          <DialogContent>
          
            <FormGroup>
            <FormMenu 
              label='ФИО сотрудника' 
              value={employeeName} 
              handleChange={handleChangeEmployeeName} 
              selectList={employeeList}
            />
            <FormMenu 
              label='Должность' 
              value={position} 
              handleChange={handleChangePosition} 
              selectList={positionList}
            />
            <FormMenu 
              label='ФИО руководителя' 
              value={supervisorName} 
              handleChange={handleChangeSupervisorName} 
              selectList={supervisorList}
            />
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker  
              
                disableToolbar        
                variant="inline"
                format="dd.MM.yyyy"
                margin="normal"
                label="Начало адаптации"
                value={adaptationStart}
                onChange={handleAdaptationStart}
                
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd.MM.yyyy"
                margin="normal"
                label="Конец адаптации"
                value={adaptationEnd}
                onChange={handleAdaptationEnd}
              />
            </MuiPickersUtilsProvider>
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button 
            variant="contained" 
            onClick={handleClose} 
            className={classes.button}
            color="primary"
            
            >
            Создать
          </Button>
        </DialogActions>
        </ThemeProvider>
      </Box>
    </Dialog>
  )
};



export default PlanCreationForm;