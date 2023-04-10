import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const AuthEmail: React.FC<{
  email: string;
  setEmail: (email: string) => void;
}> = ({ email, setEmail }) => {
  return (
    <FormControl className="w-[80%]" variant="outlined">
      <InputLabel htmlFor="email">Email</InputLabel>
      <OutlinedInput
        className="bg-blue-500 opacity-30"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        label="Email"
      />
    </FormControl>
  );
};

export default AuthEmail;
