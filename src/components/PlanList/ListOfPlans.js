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
  Typography,
  makeStyles,
  useMediaQuery
}  
from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useExpService } from '../../context/expService.js';
import formatService from '../../services/formatService.js';

const useStyles = makeStyles((theme)=> ({
  root: {
    margin: 'auto',
  },
  highlightedText: {
    color: '#a6ce39'
  },
  deleteColumn: {
    width: "5%"
  },
  planRow: {
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: "#f9f9f9"
    }
  },
  nameField: {
    whiteSpace: 'nowrap',
  }
}));


const ListOfPlans = ({ onPlanClicked, plans, setPlans, isHr }) => {

  const classes = useStyles();
  
  const NameField = ({name}) => {
    if (!useMediaQuery('(min-width:960px)')) 
      name = formatService.setShortName(name) 
    return <span className={classes.nameField}>{name}</span>;
  }
  const exposureService = useExpService();

  const deletePlan = (id, event) => {
    exposureService.remove('plan', id)
      .then(res => setPlans(plans.filter(plan => plan.id !== id)));
    event.stopPropagation();
  };

  return (
      <Box className={classes.root}>
        <Typography variant="h5">Адаптационные планы</Typography>
        <TableContainer component = {Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Сотрудник</TableCell>
                <TableCell>Статус</TableCell>
                {isHr && <TableCell>Руководитель</TableCell>}
                <TableCell>Дата создания</TableCell>
                {isHr && <TableCell className={classes.deleteColumn}></TableCell>}           
              </TableRow>
            </TableHead>
            <TableBody>
            {plans.map(plan => (
              <TableRow className={classes.planRow} onClick={() => onPlanClicked(plan.id)} key={plan.id}>
                <TableCell >
                  <NameField name={plan.employee.name} />
                  <Typography variant="subtitle1">{plan.employeePosition.name}</Typography>
                </TableCell>
                <TableCell><Typography variant="subtitle2">{formatService.getStage(plan.stage)}</Typography></TableCell>
                {isHr && <TableCell><NameField  name={plan.supervisor.name}/></TableCell>} 
                <TableCell>{formatService.setDate(plan.date)}</TableCell>
                {isHr && 
                  <TableCell>
                  <IconButton onClick={(e) => deletePlan(plan.id, e)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>} 
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
