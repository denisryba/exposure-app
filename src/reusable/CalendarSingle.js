import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import locale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function Calendar({ passChanges, value, dateField }) {

  const handleDateChange = (e) => {
    const convertedDate = e.toJSON();
    passChanges(dateField, convertedDate);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd.MM.yyyy"
        autoOk={true}
        value={value}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>)
}