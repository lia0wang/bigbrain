import React, { useState } from 'react';
import Button from '@mui/material/Button';
import apiRequest from '../../util/api';
import AuthErrorPopup from './AuthErrorPopup';
const AuthLogoutButton: React.FC<{
  setLoading: (loading: boolean) => void;
  navigate: (path: string) => void;
}> = ({ setLoading, navigate }) => {
  const [error, setError] = useState<string>();

  const logout = async () => {
    setLoading(true);
    setError(undefined);
    const token = localStorage.getItem('u_token');
    await apiRequest('POST', '/admin/auth/logout', {}, token)
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem('u_token');
          navigate('/login');
        } else {
          setError(res.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-[10%]">
        <Button
          className="w-[80%] h-[55px]"
          onClick={() => logout()}
          variant="contained"
        >
          Logout
        </Button>
      </div>
      {error && <AuthErrorPopup error={error} />}
    </>
  );
};

export default AuthLogoutButton;
