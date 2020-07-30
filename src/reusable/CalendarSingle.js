import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import locale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function Calendar({ passChanges, value, dateField, size }) {

  const handleDateChange = (e) => {
    const convertedDate = e.toJSON();
    passChanges(dateField, convertedDate);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
      <KeyboardDatePicker
        inputVariant="outlined"
        disableToolbar
        variant="inline"
        format="dd.MM.yyyy"
        size={size}
        autoOk={true}
        value={value}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>)
}