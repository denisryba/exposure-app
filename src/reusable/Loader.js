import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

export default function Loader({size}) {

  return (
    <Grid container justify='center'>
      <CircularProgress size={size} />
    </Grid>
  )
}