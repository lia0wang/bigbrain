import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './page/adminAuth/LoginPage';
import RegisterPage from './page/adminAuth/RegisterPage';
import DashboardPage from './page/DashboardPage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
