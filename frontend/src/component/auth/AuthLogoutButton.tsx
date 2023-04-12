import React, { useEffect, useState } from 'react';
import apiRequest from '../../util/api';
import AuthErrorPopup from './AuthErrorPopup';
import NavGreenButton from '../dashboard/BlueButton';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../page/LoadingPage';

const AuthLogoutButton: React.FC = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setLoading(false); // cancel any running tasks
    };
  }, []);

  if (loading) return <LoadingPage />;

  const logout = async () => {
    setLoading(true);
    setError(undefined);
    const token = localStorage.getItem('token');
    await apiRequest('POST', '/admin/auth/logout', {}, token)
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem('token');
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
      <NavGreenButton text="Logout" onClick={logout} />
      {error && <AuthErrorPopup error={error} />}
    </>
  );
};

export default AuthLogoutButton;
