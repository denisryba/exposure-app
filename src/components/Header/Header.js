import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
  fade,
  InputBase,
  useScrollTrigger, 
  Slide,
  Popover } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UserCard from './UserCard.js';
import { useAuth } from '../../context/auth.js';
import storage from '../../utils/storage.js';
import SearchIcon from '@material-ui/icons/Search';
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(0, 2)

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

const Header = ({ setUser, setSearch }) => {
  const classes = useStyles();
  const userData = useAuth();
  const history = useHistory();
  const [isShowing, setIsShowing] = useState(history.location.pathname === '/plans/')
  history.listen((location) => setIsShowing(location.pathname  === '/plans/'))

  const [ anchorEl, setAnchorEl ] = useState(null);

  const handleNameClick = e => setAnchorEl(e.currentTarget);

  const handleCardClose = () => setAnchorEl(null);

  const popoverOpen = Boolean(anchorEl);

  const handleLogoutClick = () => {
    storage.remove('savedUser');
    setUser(null);
    history.replace('/login');
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
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
            onClick={handleNameClick}
            color='inherit'
            className={classes.button}
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