import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const EditFormControl: React.FC<{
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
  options: Map<string, string>;
}> = ({ select, setSelect, options }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id={select}>{select}</InputLabel>
      <Select
        labelId={select}
        id={select}
        value={select}
        label={select}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Array.from(options).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EditFormControl;
