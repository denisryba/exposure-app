import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer, 
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Box,
  makeStyles
}  
from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const ListOfPlans = () => {

  const useStyles = makeStyles({
    root: {
      maxWidth: '80%',
      margin: 'auto',
      fontFamily: "Roboto"
    },
    highlightedText: {
      color: '#a6ce39'
    },
    subtitle: {
      color: '#838383',
      fontSize: 14,
    },
    header: {
      fontSize: 18,
      paddingLeft: 15
    },
    deleteColumn: {
      width: "5%"
    }
  });
  
  const classes = useStyles();
  
  const plans = [
    {
    "id": "5e680f360f94107d10acba1d",
    "position": "стажер-разработчик",
    "employeeId": "5e680f360f94107d10acba1d",
    "supervisorId": "5e680f360f94107d10acba1d",
    "hrId": "5e680f360f94107d10acba1d",
    "stage": "На выполнении",
    "adaptationStart": "2020-03-10T22:05:42.004+00:00",
    "adaptationEnd": "2020-03-10T22:05:42.004+00:00",
    "result": "completed",
    "rate": "A",
    "tasks": ["5e680f360f94107d10acba1d", "5e680f360f94107d10acba1d", "5e680f360f94107d10acba1d"],
    "date": "2020-03-10T22:05:42.004+00:00"
    },
    {
      "id": "5e680f360f94107d10acba2d",
      "position": "стажер-разработчик",
      "employeeId": "5e680f360f94107d10acba1d",
      "supervisorId": "5e680f360f94107d10acba1d",
      "hrId": "5e680f360f94107d10acba1d",
      "stage": "На выполнении",
      "adaptationStart": "2020-03-10T22:05:42.004+00:00",
      "adaptationEnd": "2020-03-10T22:05:42.004+00:00",
      "result": "completed",
      "rate": "A",
      "tasks": ["5e680f360f94107d10acba1d", "5e680f360f94107d10acba1d", "5e680f360f94107d10acba1d"],
      "date": "2020-03-10T22:05:42.004+00:00"
      }
  ];
  const users = [
    {
    "id": "5e680f360f94107d10acba1d",
    "name": {
    "first": "Иван Иванович",
    "last": "Иванов"
    },
    "permission": "5e680f360f94107d10acba1d",
    "email": "qwerty@gmail.com"
    }
  ];     

const setUserName = userId => {
  const name = users.find(user => user.id === userId).name;
    return name.first + ' ' + name.last;
};

const formatDate = (planDate) => {
  const date = new Date(planDate);
  
  let dd = date.getDay();
  dd = (dd < 10) ? ('0' + dd) : dd;
  
  let mm = date.getMonth();
  mm = (mm < 10) ? ('0' + mm) : mm;
  
  let yy = date.getFullYear();
    return dd + "." + mm + "." + yy;
};

return (
    <Box className={classes.root}>
      <h1 className={classes.header}>Адапционные планы</h1>
      <TableContainer component = {Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Сотрудник</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Руководитель</TableCell>
              <TableCell>Дата создания</TableCell>
              <TableCell className={classes.deleteColumn}></TableCell>             
            </TableRow>
          </TableHead>
          <TableBody>
          {plans.map(plan => (
            <TableRow key={plan.id}>
              <TableCell>{setUserName(plan.employeeId)}<div className={classes.subtitle}>{plan.position}</div></TableCell>
              <TableCell className={classes.highlightedText}>{plan.stage}</TableCell>
              <TableCell>{setUserName(plan.supervisorId)}</TableCell>
              <TableCell>{formatDate(plan.adaptationStart)}</TableCell>
              <TableCell>
                <IconButton>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
            ))
          }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>   
  )
}



export default ListOfPlans;
