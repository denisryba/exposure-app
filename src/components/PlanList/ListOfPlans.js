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
import { useExpService } from '../../context/expService.js';
import formatService from '../../services/formatService.js';


const useStyles = makeStyles((theme)=> ({
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
  },
  planRow: {
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: "#f9f9f9"
    }
  }
}));

const ListOfPlans = ({ onPlanClicked, plans, setPlans }) => {
  const classes = useStyles();
  const exposureService = useExpService();

  const deletePlan = (id, event) => {
    exposureService.remove('plan', id)
      .then(res => setPlans(plans.filter(plan => plan.id !== id)));
    event.stopPropagation();
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
              <TableRow className={classes.planRow} onClick={() => onPlanClicked(plan.id)} key={plan.id}>
                <TableCell>{formatService.setName(plan.employee.name)}<div className={classes.subtitle}>{plan.employeePosition.name}</div></TableCell>
                <TableCell className={classes.highlightedText}>{plan.stage}</TableCell>
                <TableCell>{formatService.setName(plan.supervisor.name)}</TableCell>
                <TableCell>{formatService.setDate(plan.date)}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => deletePlan(plan.id, e)}>
                    <DeleteIcon />
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
