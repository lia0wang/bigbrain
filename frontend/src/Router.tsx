import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './page/auth/LoginPage';
import RegisterPage from './page/auth/RegisterPage';
import DashboardPage from './page/DashboardPage';
import EditGamePage from './page/edit/EditGamePage';
import NotFoundPage from './page/NotFoundPage';
import GamePage from './page/game/GamePage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/session/" element={<GamePage />}>
          <Route path=":sessionId" />
          </Route>
        <Route path="/game/edit/" element={<EditGamePage />}>
          <Route path=":gameId" />
          <Route path=":gameId/:questionId" />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
