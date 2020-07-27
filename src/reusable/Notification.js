import React, { useState, useEffect } from 'react';
import {
  Snackbar
} from '@material-ui/core';
import {
  Alert
} from '@material-ui/lab';

export const notify = (type, message) => {
  const event = new CustomEvent('notification', {
    detail: {
      type,
      message 
    }
  });
  document.dispatchEvent(event);
};

const Notification = () => {
  const [ open, setOpen ] = useState(false);
  const [ notification, setNotification ] = useState({});

  useEffect(() => {
    const notificationListener = ({ detail }) => {
      setNotification(detail);
      setOpen(true);
    };

    document.addEventListener('notification', notificationListener);

    return () => {
      document.removeEventListener('notification', notificationListener);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}>
      <Alert
        elevation={2}
        onClose={handleClose}
        severity={notification.type}>

        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;