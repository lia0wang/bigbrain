import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../util/api';
import AuthIcon from '../../component/auth/AuthIcon';
import AuthTitle from '../../component/auth/AuthTitle';
import AuthEmail from '../../component/auth/AuthEmail';
import AuthPassword from '../../component/auth/AuthPassword';
import AuthButton from '../../component/auth/AuthButton';
import AuthNavigator from '../../component/auth/AuthNavigator';
import AuthThirdParty from '../../component/auth/AuthThirdParty';
import { isMobileWidth, isDesktopWidth } from '../../util/media';
import LoadingPage from '../LoadingPage';
import AuthErrorPopup from '../../component/auth/AuthErrorPopup';
import Image from 'mui-image';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [deviceType, setDeviceType] = useState('');
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setLoading(false); // cancel any running tasks
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isMobileWidth()) setDeviceType('mobile');
      else if (isDesktopWidth()) setDeviceType('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(undefined);
    const payload = {
      email,
      password,
    };
    await apiRequest('POST', '/admin/auth/login', payload)
      .then((res) => {
        const token = res.token;
        if (token) {
          localStorage.setItem('token', String(token));
          navigate('/');
        } else {
          const error = res.error;
          setError(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <LoadingPage />;

  // eslint-disable-next-line no-return-assign
  return (
    <>
      {deviceType === 'mobile' && (
        <div className="text-black">
          <AuthIcon />
          <AuthTitle title="Sign In" />
          <form className="flex flex-col justify-center items-center mt-[10%]">
            <AuthEmail email={email} setEmail={setEmail} />
            <span className="my-[4%]" />
            <AuthPassword password={password} setPassword={setPassword} />
            <span className="my-[4%]" />
            <AuthButton
              fn={login}
              email={email}
              password={password}
              innerText="Login"
            />
          </form>
          <AuthNavigator
            navPath="/register"
            navText="Register"
            navigate={navigate}
          />
          <AuthThirdParty />
        </div>
      )}
      {deviceType === 'desktop' && (
      <>
        <div className="h-screen w-screen flex flex-row place-content-end bg-sky-100">
          <Image src="./asset/auth.webp"
          className='h-[95%] px-[2%] py-[2%] drop-shadow-2xl ml-[4%]'
          style={{ borderRadius: '3%' }}
          alt="Auth" />
          <div className="w-[60%] h-[80%] bg-sky-100 my-[5%] mr-[8%] ml-[5%] rounded-[2%] shadow-2xl
          lg:h-[85%] lg:my-[4%] lg:mr-[10%] lg:ml-[10%]
          md:h-[90%] md:my-[3%] md:mr-[8%] md:ml-[8%]">
              <AuthIcon />
              <AuthTitle title="Sign In" />
              <form className="flex flex-col justify-center items-center mt-[10%] 2xl:mt-[8%] lg:mt-[5%]">
                <AuthEmail email={email} setEmail={setEmail} />
                <span className="my-[4%] lg:my-[3%]" />
                <AuthPassword password={password} setPassword={setPassword} />
                <span className="my-[4%] lg:my-[3%]" />
                <AuthButton
                  fn={login}
                  email={email}
                  password={password}
                  innerText="Login"
                />
              </form>
              <AuthNavigator
                navPath="/register"
                navText="Register"
                navigate={navigate}
              />
              <AuthThirdParty />
          </div>
        </div>
      </>
      )}
      {error && <AuthErrorPopup error={error} />}
    </>
  );
};

export default LoginPage;
