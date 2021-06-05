import React from 'react';
import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core';

const DropMenu = ({title, items, value, setValue}) => {
  return(
    <FormControl style={{width: "90%", marginBottom: "1rem"}}>
      <InputLabel shrink id={title}>{title}</InputLabel>
      <Select 
        labelId={title}
        defaultValue=""
        displayEmpty
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        { 
          // Display the different elements for a dropdown menu given an array that includes
          // them
          items.map((item, index) => {
            return(
              <MenuItem key={index} value={item}>{item}</MenuItem>
            );
          })
        }
      </Select>
    </FormControl>
  );
}

export default DropMenu;