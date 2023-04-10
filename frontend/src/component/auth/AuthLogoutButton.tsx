import React from 'react';
import Button from '@mui/material/Button';
import apiRequest from '../../util/api';
const AuthLogoutButton: React.FC<{
  setLoading: (loading: boolean) => void;
  navigate: any;
}> = ({ setLoading, navigate }) => {
  const logout = async () => {
    setLoading(true);
    const token = localStorage.getItem('u_token');
    await apiRequest('POST', '/admin/auth/logout', {}, token)
      .then((res) => {
        localStorage.removeItem('u_token');
        navigate('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[10%]">
      <Button
        className="w-[80%] h-[55px]"
        onClick={() => logout()}
        variant="contained"
      >
        Logout
      </Button>
    </div>
  );
};

export default AuthLogoutButton;
