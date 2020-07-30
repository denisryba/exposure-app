import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText
}  
from '@material-ui/core';

const Confirmation = ({isOpen, setIsOpen, message, action, deletedId, buttonText}) => {
  const handleClose = () => setIsOpen(false);
  const takeAction = (id) => {
    if (id)
      action(id);
    else action();
    setIsOpen(false);
  }
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          {message} 
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отменить
        </Button>
        <Button onClick={() => takeAction(deletedId)} color="primary"> 
          {buttonText ? buttonText : 'Удалить'}
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default Confirmation;