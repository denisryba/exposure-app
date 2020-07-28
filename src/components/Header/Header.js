import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
  fade,
  InputBase} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useAuth } from '../../context/auth.js';
import storage from '../../utils/storage.js';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

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
  userButton: {
    marginLeft: 'auto',
    color: 'white'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(0, 2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}));

const Header = ({ setUser, setSearch }) => {
  const classes = useStyles();
  const userData = useAuth();
  const history = useHistory();
  const [isShowing, setIsShowing] = useState(history.location.pathname === '/plans/')
  history.listen((location) => setIsShowing(location.pathname  === '/plans/'))
  
  const handleLogoutClick = () => {
    storage.remove('savedUser');
    setUser(null);
    history.replace('/login');
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <AppBar className={classes.root} color='primary' position='static'>
      <Toolbar>
        <EmojiPeopleIcon className={classes.logo} />
          <Typography variant='h6' className={classes.title}>
            Exposure App
          </Typography>
          {isShowing ? 
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
            onChange={handleSearchChange}
            placeholder="Поиск"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
          />
          </div>
          : null}
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