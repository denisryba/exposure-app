import React from 'react';
import { 
  InputLabel, 
  MenuItem, 
  Select, 
  FormControl
 } 
from '@material-ui/core';

const FormMenu = ( {label, value, handleChange, selectList} ) => {
  const setName = name => {
    if (typeof name === "string")
      return name;
    return name.first + ' ' + name.middle + ' ' + name.last;
  };

  return (
    <FormControl >
          <InputLabel >{label}</InputLabel>
          <Select value={value} onChange={handleChange} >
          {selectList.map(item => (
            <MenuItem value={item.id} key={item.id}>{setName(item.name)}</MenuItem>
          ))}    
        </Select>
    </FormControl>
  )
}

export default FormMenu;