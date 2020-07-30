import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import locale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  startDate: {
    marginRight: theme.spacing(2)
  }
}));

export default function Calendar({ passChanges, dateStart, dateEnd, dateStartLabel, dateEndLabel }) {
  const classes = useStyles();

  const handleDateChange = (e, dateField) => {
    passChanges(dateField, e);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
      <KeyboardDatePicker
        className={classes.startDate}
        inputVariant="outlined" 
        disableToolbar
        variant="inline"

        format="dd.MM.yyyy"
        margin="normal"
        label={dateStartLabel}
        autoOk={true}
        value={dateStart}
        fullWidth
        onChange={(e) => handleDateChange(e, 'dateStart')}
      />
      <KeyboardDatePicker
        inputVariant="outlined" 

        disableToolbar
        variant="inline"
        format="dd.MM.yyyy"
        margin="normal"
        label={dateEndLabel}
        autoOk={true}
        value={dateEnd}
        fullWidth
        onChange={(e) => handleDateChange(e, 'dateEnd')}
      />
    </MuiPickersUtilsProvider>)
}