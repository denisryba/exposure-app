import React, {useState, useEffect} from 'react';
import axios from 'axios'
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

const useStyles = makeStyles({
  root: {
    maxWidth: '80%',
    margin: 'auto',
    fontFamily: "Roboto",
    fontSize: 18
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

const ListOfPlans = () => {
  const [plans, setPlans] =  useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/plans')
      .then(res => {
        setPlans(res.data)
      })
  }, []);


  const classes = useStyles();
  

  const setName = name => name.first + ' ' + name.middle + ' ' + name.last;

  const formatDate = (planDate) => {
    const date = new Date(planDate);
    
    let dd = date.getDate();
    dd = (dd < 10) ? ('0' + dd) : dd;
    
    let mm = date.getMonth()  + 1;
    mm = (mm < 10) ? ('0' + mm): mm;
    
    
    let yy = date.getFullYear();
      return dd + "." + mm + "." + yy;
  };

  return (
      <Box className={classes.root}>
        <h1 className={classes.header}>Адаптационные планы</h1>
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
                <TableCell>{setName(plan.employee.name)}<div className={classes.subtitle}>стажер-разработчик</div></TableCell>
                <TableCell className={classes.highlightedText}>{plan.stage}</TableCell>
                <TableCell>{setName(plan.supervisor.name)}</TableCell>
                <TableCell>{formatDate(plan.date)}</TableCell>
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
