import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthLogoutButton from '../component/auth/AuthLogoutButton';
import LoadingPage from './LoadingPage';

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

  if (loading) return <LoadingPage />;

  return (
    <>
      <AuthLogoutButton setLoading={setLoading} navigate={navigate} />
    </>
  );
};

export default DashboardPage;
