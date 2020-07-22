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
  const { title, logo, userButton } = useStyles();
  const userData = useAuth();
  const history = useHistory();

  const handleLogoutClick = () => {
    storage.remove('savedUser');
    setUser(null);
    history.replace('/login');
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <EmojiPeopleIcon className={logo} />
        <Typography className={title} variant='h6'>
          Exposure App
        </Typography>
        <Button
          onClick={handleLogoutClick}
          className={userButton}
          startIcon={<AccountCircle />}>
          {userData.name.first + ' ' + userData.name.last}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;