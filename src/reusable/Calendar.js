import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import locale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function Calendar({ passChanges, dateStart, dateEnd, dateStartLabel, dateEndLabel }) {

  const handleDateChange = (e, dateField) => {
    console.log(e);
    passChanges(dateField, e);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd.MM.yyyy"
        margin="normal"
        label={dateStartLabel}
        autoOk={true}
        value={dateStart}
        onChange={(e) => handleDateChange(e, 'dateStart')}
      />
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd.MM.yyyy"
        margin="normal"
        label={dateEndLabel}
        autoOk={true}
        value={dateEnd}
        onChange={(e) => handleDateChange(e, 'dateEnd')}
      />
    </MuiPickersUtilsProvider>)
}