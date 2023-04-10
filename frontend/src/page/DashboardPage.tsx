import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import apiRequest from '../util/api';

const DashboardPage: React.FC = () => {
  if (!localStorage.getItem('u_token')) {
    return <Navigate to="/login" />;
  }

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setLoading(false); // cancel any running tasks
    };
  }, []);

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

  if (loading) return <div>Loading...</div>;

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
    </>
  );
};

export default DashboardPage;
