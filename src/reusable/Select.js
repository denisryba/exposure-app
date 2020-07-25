import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import formatService from '../services/formatService.js';

const Select = ( { optionList, label, setValue} ) => {//не для должностей, пока:)
  const defaultProps = {
    options: optionList,
    getOptionLabel: (option) => typeof option.name === "string" ? option.name : formatService.setName(option.name),
  };

  return (
    <Autocomplete
    {...defaultProps}
    disableClearable
    onChange={(event, newValue) => {
      setValue(newValue.id);
    }}
    renderInput={(params) => <TextField {...params} label={label}/>}
  />
  )
};

export default Select;