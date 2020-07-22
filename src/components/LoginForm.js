import React, { useState } from 'react';
import {
    Container,
    TextField,
    Grid,
    Button,  
    Typography,
    makeStyles} from '@material-ui/core';

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

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleLoginButtonClick = async () => {
      setUsername('');
      setPassword('');
      await login(username, password);
  };

  return (
    <Container className={container} maxWidth='xs'>
      <Grid container justify='flex-end' alignItems='center' spacing={2}>
        <Grid item xs={12}>
          <Typography className={title} variant='h4' gutterBottom>
            Exposure App
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Имя пользователя'
            variant='outlined'
            value={username}
            onChange={handleUsernameChange}
            required
            fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
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
            onClick={handleLoginButtonClick}
            variant='contained'
            color='primary'
            fullWidth>
              Войти
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;