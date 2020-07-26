import React, {useState, useEffect} from 'react';
import { useExpService } from '../context/expService.js';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import formatService from '../services/formatService.js';

const AutocompleteStaff = ( {label, setValue, path, role} ) => {
  const [optionList, setOptionList] = useState([]);
  const exposureService = useExpService();
  
  useEffect(() => {
    exposureService
      .getAll(path, { role })
      .then(employees => setOptionList(employees))    
  }, [exposureService, role, path]);


  const defaultProps = {
    options: optionList,
    getOptionLabel: (option) => typeof option.name === "string" ? option.name : formatService.getName(option.name),
  };

  return (
    <Autocomplete
    {...defaultProps}
    disableClearable
    onChange={(e, newValue) => setValue(newValue.id)}
    renderInput={(params) => <TextField {...params} label={label} variant="outlined"/>}
  />
  )
};

export default AutocompleteStaff;