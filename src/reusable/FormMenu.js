import React from 'react';
import { 
  InputLabel, 
  MenuItem, 
  Select, 
  FormControl,
  makeStyles
 } 
from '@material-ui/core';

const useStyles = makeStyles({
  input: {
    marginBottom: 20
  }
});


const FormMenu = ( {label, value, handleChange, selectList} ) => {
  const classes = useStyles();
  const setName = name => {
    if (typeof name === "string")
      return name;
    return name.first + ' ' + name.middle + ' ' + name.last;
  };

  return (
    <FormControl>
          <InputLabel >{label}</InputLabel>
          <Select value={value} onChange={handleChange} className={classes.input}>
          {selectList.map(item => (
            <MenuItem value={item.id} key={item.id}>{setName(item.name)}</MenuItem>
          ))}    
        </Select>
    </FormControl>
  )
}

export default FormMenu;