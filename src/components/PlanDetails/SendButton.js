import React, { useState } from 'react';
import { Fab, makeStyles, useScrollTrigger } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {
  SpeedDial,
  SpeedDialAction
 } from '@material-ui/lab';
 import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  sendIcon: {
    marginRight: theme.spacing(1)
  },
  forwardFab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  backwardFab: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
  speedDial: {
    position: 'fixed',
    top: theme.spacing(10),
    right: theme.spacing(2),
  },
  tooltips: {
    whiteSpace: 'nowrap',
    
  },
  smallLabel: {
    whiteSpace: 'nowrap'
  }
}));

const SendButton = ({ type, handler, text }) => {
  const [ open, setOpen ] = useState(false);
  const classes = useStyles();
  const trigger = useScrollTrigger();

  const className = (type === 'forward')
    ? classes.forwardFab
    : classes.backwardFab;

  const icon = (type === 'forward')
    ? <ArrowForwardIcon className={classes.sendIcon} />
    : <ArrowBackIcon className={classes.sendIcon} />;
  
  const variant = trigger
    ? 'round'
    : 'extended';

  return (
    <>
    <Fab
      onClick={handler}
      className={className}
      color='secondary'
      variant={variant}>
      {icon}
      { !trigger
        ? text
        : null}
    </Fab>
      {/* <SpeedDial
        FabProps={{
          variant: 'extended',
          children: 'блаблабла',
        }}
        className={classes.speedDial}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        ariaLabel="send button"
        icon={<SendIcon />}>
      <SpeedDialAction
            className={classes.smallLabel}
            style={{whiteSpace: 'nowrap'}}
            tooltipTitle={'На заполнение'}
            icon={<ArrowBackIcon />}
            tooltipOpen />
      <SpeedDialAction
      
            style={{whiteSpace: 'nowrap'}}
            tooltipTitle='На выполнение'
            icon={<ArrowForwardIcon />}
            
            tooltipOpen />
    </SpeedDial> */}
    </>
  );
};

export default SendButton;