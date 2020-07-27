import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
  useScrollTrigger, 
  Slide,
  Popover } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UserCard from './UserCard.js';
import { useAuth } from '../../context/auth.js';
import storage from '../../utils/storage.js';
import { useHistory, Link } from 'react-router-dom';
import format from '../../services/formatService.js';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  toolbar: {
    justifyContent: 'space-between' 
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  name: {
    marginLeft: theme.spacing(1),
  },
  appName: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.primary.contrastText
  }
}));

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
};

const Header = ({ setUser }) => {
  const classes = useStyles();
  const userData = useAuth();
  const history = useHistory();

  const [ anchorEl, setAnchorEl ] = useState(null);

  const handleNameClick = e => setAnchorEl(e.currentTarget);

  const handleCardClose = () => setAnchorEl(null);

  const popoverOpen = Boolean(anchorEl);

  const handleLogoutClick = () => {
    storage.remove('savedUser');
    setUser(null);
    history.replace('/login');
  };

  return (
    <HideOnScroll>
      <AppBar elevation={1} className={classes.root} color='primary' position='sticky'>
        <Toolbar className={classes.toolbar}>
          <Link to='/' className={classes.appName}>
            <EmojiPeopleIcon className={classes.logo} />
            <Typography variant='h6'>
              Exposure App
            </Typography>
          </Link>
          <Button
            onClick={handleNameClick}
            color='inherit'
            startIcon={<AccountCircle />}>
            {format.setShortName(userData.name)}
          </Button>
          <Popover
            elevation={2}
            anchorEl={anchorEl}
            open={popoverOpen}
            onClose={handleCardClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <UserCard handleLogoutClick={handleLogoutClick} user={userData} />
          </Popover>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;