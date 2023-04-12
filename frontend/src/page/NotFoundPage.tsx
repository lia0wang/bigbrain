import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return <>
    <div className="bg-sky-100 w-full h-screen flex items-center justify-center px-8">
      <div className="bg-white border border-sky-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-nav-blue">404</p>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-black mt-4">Page Not Found</p>
        <p className="text-black mt-4 pb-4 border-b-2 text-center">Access denied, champ. Try another page. 🥶</p>
        <div className="flex items-center mt-4">
            <Button variant="contained"
            onClick={() => {
              navigate('/dashboard');
            }}>Return Home</Button>
        </div>
      </div>
    </div>
  </>;
};

export default NotFoundPage;
