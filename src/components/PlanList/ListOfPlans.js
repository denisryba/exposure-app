import React, { useState } from 'react';
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
import Confirmation from '../../reusable/Confirmation.js';

const useStyles = makeStyles((theme)=> ({
  root: {
    margin: 'auto',
  },
  title: {
    marginBottom: theme.spacing(1)
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


const ListOfPlans = ({ onPlanClicked, plans, isHr, setPlanDeleted }) => {
  const NameField = ({name}) => {
    if (!useMediaQuery('(min-width:960px)')) 
      name = formatService.setShortName(name) 
    return <span className={classes.nameField}>{name}</span>;
  }
 
  const classes = useStyles();
  const exposureService = useExpService();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [planId, setPlanId] = useState(null);

  const handleConfirmationOpen = (id, event) => {
    setPlanId(id);
    setConfirmationOpen(true);
    event.stopPropagation();
  };

  const deletePlan = id => {
    exposureService.remove('plan', id)
      .then(res => {
        setPlanDeleted(true);
      });
  };

  return (
      <Box className={classes.root}>
        <Typography className={classes.title} variant="h5">Адаптационные планы</Typography>
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
                <TableCell>{formatService.getStage(plan.stage)}</TableCell>
                {isHr && <TableCell><NameField  name={plan.supervisor.name}/></TableCell>} 
                <TableCell>{formatService.setDate(plan.date)}</TableCell>
                {isHr && 
                  <TableCell>
                  <IconButton onClick={(e) => handleConfirmationOpen(plan.id, e)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>} 
              </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </TableContainer>
        <Confirmation 
          isOpen={confirmationOpen}
          setIsOpen={setConfirmationOpen}
          message='Вы уверены, что хотите удалить план?'
          deletedId={planId}
          action={deletePlan}
          />
      </Box>   
    )
  }



export default ListOfPlans;
