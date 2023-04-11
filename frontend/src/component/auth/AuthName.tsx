import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const AuthName: React.FC<{ name: string; setName: (name: string) => void }> = ({
  name,
  setName,
}) => {
  return (
    <FormControl className="w-[80%]" variant="outlined">
      <InputLabel htmlFor="name">Username</InputLabel>
      <OutlinedInput
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        label="Username"
      />
    </FormControl>
  );
};

export default AuthName;
