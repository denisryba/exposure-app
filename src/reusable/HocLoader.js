import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';


function loaderHoc(View, data) {
  return function (props) {

      if (!data) {
        return (
          <Grid container justify='center'>
            <CircularProgress size={200} />
          </Grid>
        );
      }

      return (<View data={data} {...props} />)
  }
}

export default loaderHoc;