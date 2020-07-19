import React, { useState } from 'react';
import {
    Container,
    TextField,
    Grid,
    Button,  
    Typography,
    makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
    fontWeight: 600
  },
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center'
  }
});

const LoginForm = () => {
  const { title, container } = useStyles();

  return (
    <Container className={container} maxWidth='xs'>
      <Grid container justify='flex-end' alignItems='center' spacing={2}>
        <Grid item xs='12'>
          <Typography className={title} variant='h4' gutterBottom>
            Exposure App
          </Typography>
        </Grid>
        <Grid item xs='12'>
          <TextField
            label='Имя пользователя'
            variant='filled'
            required
            fullWidth />
        </Grid>
        <Grid item xs='12'>
          <TextField
            label='Пароль'
            type='password'
            variant='filled'
            autoComplete='current-password'
            required
            fullWidth />
        </Grid>
        <Grid item xs='12' sm='3'>
          <Button
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