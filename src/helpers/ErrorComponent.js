import React from 'react';
import { Box, Typography, makeStyles, Link } from '@material-ui/core';


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
  },
  errorText:{
    color: '#c23934'
  }
}));

export default function ErrorComponent() {

  const classes = useStyles();

  return (
    <Box className={classes.errorBoundary}>
      <Typography variant='h5' gutterBottom className={classes.errorText}>
        Упс, произошла ошибка с:
        </Typography>
      <Typography variant='body2' className={classes.errorText}>
        Пожалуйста, дайте <Link href="mailto:help@greenatom.ru" underline={'always'} className={classes.errorText}>нам</Link> знать об этом.
        </Typography>
    </Box>
  )
}