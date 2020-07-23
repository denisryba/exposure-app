import React, {useState, useEffect} from 'react';
import exposureService from '../services/exposureService.js';
import { 
  makeStyles, 
  Box,
  FormGroup,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent
 } 
from '@material-ui/core';
import 'date-fns';
import FormMenu from "./FormMenu";
import Calendar from "../globalElements/Calendar.js";



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
    marginTop: 15
  }
});

const PlanCreationForm = ( 
{
  isShowing, 
  hide, 
  plans, 
  setPlans, 
  pageCount, 
  setPageCount, 
  currentPage, 
  limit
} 
) => {
  const classes = useStyles();
  let month = new Date().getMonth();
  
  const [employeeId, setEmployeeId] = useState('');
  const [positionId, setPositionId] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [supervisorList, setSupervisoreList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [adaptationStart, setAdaptationStart] = useState(new Date());
  // const [adaptationEnd, setAdaptationEnd] = useState(new Date());
  const [adaptationEnd, setAdaptationEnd] = useState(new Date().setMonth(month + 3));

  const handleChangeEmployeeName = event => setEmployeeId(event.target.value);
  const handleChangePosition = event => setPositionId(event.target.value);
  const handleChangeSupervisorName = event => setSupervisorId(event.target.value);

  useEffect(() => {
    exposureService
      .getAll('users')
      .then(users => {
        setEmployeeList(users.filter(user => user.role === "employee"))
        setSupervisoreList(users.filter(user => user.role === "supervisor"))
      })    
  }, []);

  useEffect(() => {
    exposureService
      .getAll('positions')
      .then(positions => {
        setPositionList(positions);
      }); 
  }, []);

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

    const planParam = {
      employeePosition: positionList.find(position => position.id === positionId),
      employee: employeeList.find(employee => employee.id === employeeId),
      supervisor: supervisorList.find(supervisor => supervisor.id === supervisorId),
    };

    exposureService
      .create('plan', planObject)
      .then(createdPlan => {
        if (currentPage === pageCount) {
          if (plans.length === limit)
            setPageCount(pageCount + 1);
          else 
            setPlans(plans.concat(Object.assign(createdPlan, planParam)));         
        };
        setEmployeeId('');
        setSupervisorId('');
        setPositionId('');
        setAdaptationStart(new Date());
        setAdaptationEnd(new Date());
      })
      .catch(error => hide());
  }

  return (
    <Dialog open={isShowing} onClose={hide} >      
      <Box className={classes.modal}  p="1rem" >
        <DialogTitle className={classes.header}>Создание плана адаптации</DialogTitle>
        <form onSubmit={addPlan}>
            <DialogContent>       
              <FormGroup >
                <FormMenu 
                  label='ФИО сотрудника' 
                  value={employeeId} 
                  handleChange={handleChangeEmployeeName} 
                  selectList={employeeList}
                />
                <FormMenu 
                  label='Должность' 
                  value={positionId} 
                  handleChange={handleChangePosition} 
                  selectList={positionList}
                />
                <FormMenu 
                  label='ФИО руководителя' 
                  value={supervisorId} 
                  handleChange={handleChangeSupervisorName} 
                  selectList={supervisorList}
                />  
                <Calendar
                  passChanges={setAdaptationStart}
                  dateStart={adaptationStart}
                  dateEnd={adaptationEnd}
                  dateStartLabel="Начало адаптации"
                  dateEndLabel="Конец адаптации"
                />         
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button 
                variant="contained" 
                onClick={hide} 
                className={classes.button}
                color="primary"
                type="Submit">
                Создать
              </Button>
            </DialogActions>
          </form>
      </Box>
    </Dialog>
  )
};

export default PlanCreationForm;