import React, { useState } from 'react';
import {
    Container,
    TextField,
    Grid,
    Button,  
    Typography,
    makeStyles } from '@material-ui/core';
import Notification, { notify } from '../../reusable/Notification.js';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontWeight: 600
  },
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center'
  }
}));

const LoginForm = ({ login }) => {
  const { title, container } = useStyles();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(false);
  const [ errorText, setErrorText ] = useState('');

  const handleUsernameChange = ({ target }) => {
    setError(false);
    setErrorText('');
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setError(false);
    setErrorText('');
    setPassword(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    }
    catch (e) {
      notify('error', 'Ошибка при входе')
      setError(true);
      setErrorText('Неверное имя пользователя или пароль')
    }
  };

  return (
    <Container className={container} maxWidth='xs'>
      <form onSubmit={handleSubmit}>
        <Grid container justify='flex-end' alignItems='center' spacing={2}>
          <Grid item xs={12}>
            <Typography className={title} variant='h4' gutterBottom>
              Exposure App
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error}
              label='Имя пользователя'
              variant='outlined'
              value={username}
              onChange={handleUsernameChange}
              required
              fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              helperText={errorText}
              error={error}
              label='Пароль'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              variant='outlined'
              autoComplete='current-password'
              required
              fullWidth />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth>
                Войти
            </Button>
          </Grid>
        </Grid>
      </form>
      <Notification />
    </Container>
  );
};

export default LoginForm;