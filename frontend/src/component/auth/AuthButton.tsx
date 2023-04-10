import React from 'react';
import Button from '@mui/material/Button';

const AuthButton: React.FC<{
  fn: any;
  email: string;
  password: string;
  innerText: string;
}> = ({ fn, email, password, innerText }) => {
  return (
    <Button
      className="w-[80%] h-[55px]"
      onClick={() => fn(email, password)}
      variant="contained"
    >
      {innerText}
    </Button>
  );
};

export default AuthButton;
