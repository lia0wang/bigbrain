import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../util/api';
import AuthIcon from '../../component/auth/AuthIcon';
import AuthTitle from '../../component/auth/AuthTitle';
import AuthEmail from '../../component/auth/AuthEmail';
import AuthPassword from '../../component/auth/AuthPassword';
import AuthButton from '../../component/auth/AuthButton';
import AuthNavigator from '../../component/auth/AuthNavigator';
import AuthName from '../../component/auth/AuthName';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setLoading(false); // cancel any running tasks
    };
  }, []);

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    const payload = {
      email,
      password,
      name,
    };
    await apiRequest('POST', '/admin/auth/register', payload)
      .then(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('u_token', token);
          navigate('/');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
     <div className="text-black">
        <AuthIcon />
        <AuthTitle title="Sign Up" />
        <div className="flex flex-col justify-center items-center mt-[10%]">
          <AuthEmail email={email} setEmail={setEmail} />
          <span className="my-[4%]" />
          <AuthPassword password={password} setPassword={setPassword} />
          <span className="my-[4%]" />
          <AuthName name={name} setName={setName} />
          <span className="my-[4%]" />
          <AuthButton fn={register} email={email} password={password} innerText="Register" />
        </div>
        <AuthNavigator navPath="/login" navText="Login" navigate={navigate} />
      </div>
    </>
  );
};

export default RegisterPage;
