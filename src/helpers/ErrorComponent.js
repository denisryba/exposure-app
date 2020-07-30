import React from 'react';
import { Paper, Typography, makeStyles, Link } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1)
  },
  button: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  errorBoundary: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#c23934',
  },
  errorText:{
    color: 'white'
  }
}));

export default function ErrorComponent() {

  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.errorBoundary}>
      <Typography variant='h4' gutterBottom className={classes.errorText}>
        У нас произошла ошибка.
        </Typography>
      <Typography variant='h5' className={classes.errorText}>
        Пожалуйста, дайте <Link href="mailto:help@greenatom.ru" underline={'always'} className={classes.errorText}>нам</Link> знать об этом.
        </Typography>
    </Paper>
  )
}