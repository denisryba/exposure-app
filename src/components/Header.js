import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useAuth } from '../context/auth.js';
import storage from '../utils/storage.js';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  name: {
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1
  },
  userButton: {
    color: 'white'
  }
}));

const Header = ({ setUser }) => {
  const classes = useStyles();
  const userData = useAuth();
  const history = useHistory();

  const handleLogoutClick = () => {
    storage.remove('savedUser');
    setUser(null);
    history.replace('/login');
  };

  React.useEffect(()=>{
    console.log(userData);
  })

  return (
    <AppBar className={classes.root} color='primary' position='static'>
      <Toolbar>
        <EmojiPeopleIcon className={classes.logo} />
        <Typography className={classes.title} variant='h6'>
          Exposure App
        </Typography>
        <Button
          onClick={handleLogoutClick}
          className={classes.userButton}
          startIcon={<AccountCircle />}>
          {userData.name.first + ' ' + userData.name.last + ' (' + userData.role+ ')'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;