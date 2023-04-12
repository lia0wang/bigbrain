import React, { useEffect, useState } from 'react';
import apiRequest from '../../util/api';
import AuthErrorPopup from './AuthErrorPopup';
import ButtonBlue from '../dashboard/ButtonBlue';
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
      <ButtonBlue text="Logout" onClick={logout} />
      {error && <AuthErrorPopup error={error} />}
    </>
  );
};

export default AuthLogoutButton;
