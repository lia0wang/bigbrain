import React from 'react';
import ButtonBlue from '../dashboard/ButtonBlue';
import { useNavigate } from 'react-router-dom';

const AuthLoginButton: React.FC = () => {
  const navigate = useNavigate();

  const toLoginPage = async () => {
    navigate('/login');
  };

  return (
    <>
      <ButtonBlue text="Login" onClick={toLoginPage} />
    </>
  );
};

export default AuthLoginButton;
