import React from 'react';
import {
  Button,
  Typography,
  makeStyles,
  Card,
  CardActions,
  CardContent
} from '@material-ui/core';
import format from '../../services/formatService.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto'
  },
  name: {
    fontWeight: 500
  },
  logoutBtn: {
    marginLeft: 'auto'
  }
}));

const UserCard = ({ user, handleLogoutClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.name} gutterBottom>
          {user.name}
        </Typography>
        <Typography className={classes.role} variant='subtitle1'>
          {format.capitalizeFirstLetter(format.getRole(user.role))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.logoutBtn}
          size='small'
          color='primary'
          onClick={handleLogoutClick}>
          Выйти
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;