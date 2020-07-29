import React from 'react';
import {
  Fab,
  makeStyles,
  useScrollTrigger } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  extendedSendIcon: {
    marginRight: theme.spacing(1)
  },
  sendFab: {
    margin: theme.spacing(1),
    textTransform: 'none',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    transition: 'all .09s'
  }
}));

const SendButton = ({ type, handler, text }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger();

  const iconClassName = trigger ? '' : classes.extendedSendIcon;

  const icon = (type === 'forward')
    ? <ArrowForwardIcon
        className={iconClassName} />
    : <ArrowBackIcon
        className={iconClassName} />;
  
  const variant = trigger
    ? 'round'
    : 'extended';

  return (
    <Fab
      onClick={handler}
      className={classes.sendFab}
      variant={variant}>
      {icon}
      { !trigger
        ? text
        : null}
    </Fab>
  );
};

export default SendButton;