import React from 'react';
import {
  Fab,
  makeStyles,
  useScrollTrigger,
  Box } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  btnText: {
    marginLeft: theme.spacing(1)
  },
  sendFab: {
    margin: theme.spacing(1),
    textTransform: 'none',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    transition: 'all .09s'
  }
}));

const ActionButton = ({ type, handler, text, innerIcon }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger();

  const icon = (type === 'forward')
    ? <ArrowForwardIcon />
    : <ArrowBackIcon />;
  
  const variant = trigger
    ? 'round'
    : 'extended';

  return (
    <Fab
      onClick={handler}
      className={classes.sendFab}
      variant={variant}>
      { type !== undefined
        ? icon
        : innerIcon }
      { !trigger

        ? <Box className={classes.btnText}>{text}</Box>
        : null }
    </Fab>
  );
};

export default ActionButton;