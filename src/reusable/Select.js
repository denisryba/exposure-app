import React, {useState, useEffect} from 'react';
import { useExpService } from '../context/expService.js';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import formatService from '../services/formatService.js';

const AutocompleteStaff = ( {variant, label, setValue, path, role, value} ) => {
  const [optionList, setOptionList] = useState([]);
  const exposureService = useExpService();
  
  useEffect(() => {
    exposureService
      .getAll(path, { role })
      .then(employees => setOptionList(employees))    
  }, [exposureService, role, path]);


  const defaultProps = {
    options: optionList,
    getOptionLabel: (option) => typeof option.name === "string" ? option.name : formatService.setName(option.name),
  };

  return (
    <Autocomplete
    {...defaultProps}
    value={value}
    getOptionSelected={(option, value)=> JSON.stringify(option) === JSON.stringify(value)}
    disableClearable
    onChange={(e, newValue) => setValue(newValue, role)}
    renderInput={(params) => <TextField {...params} label={label} variant={variant}/>}
  />
  )
};

export default AutocompleteStaff;