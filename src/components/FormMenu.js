import React from 'react';
import { 
  InputLabel, 
  MenuItem, 
  Select, 
  FormControl, 
  makeStyles,

 } 
from '@material-ui/core';

const secondaryColor = '#a6ce39';

const useStyles = makeStyles({
  label: {
    fontSize: 14,
    '&.Mui-focused': {
      color: secondaryColor ,
      borderColor:secondaryColor 
    }
  },
  select: {
      '&:after': {
        borderColor: secondaryColor ,
    }
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
    <FormControl className={classes.formControl}>
          <InputLabel className={classes.label}>{label}</InputLabel>
          <Select value={value} onChange={handleChange} className={classes.select}>
          {selectList.map(item => (
            <MenuItem value={item.id} key={item.id}>{setName(item.name)}</MenuItem>
          )
          )}    
        </Select>
    </FormControl>
  )
}

export default FormMenu;