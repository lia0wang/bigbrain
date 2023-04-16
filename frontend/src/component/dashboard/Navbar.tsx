// Navbar.tsx
import React, { useEffect, useState } from 'react';
import apiRequest from '../../util/api';
import AuthLogoutButton from '../auth/AuthLogoutButton';
import ButtonBlue from './ButtonBlue';
import CreateModal from '../../modal/CreateGameModal';
import AuthErrorPopup from '../auth/AuthErrorPopup';
import AuthLoginButton from '../auth/AuthLoginButton';

const Navbar: React.FC<{
  pageType?: string;
}> = ({ pageType }) => {
  const [name, setName] = useState('');
  const [isGameCreated, setIsGameCreated] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
  };

  const createGame = (name: string) => {
    apiRequest('POST', '/admin/quiz/new', { name })
    setName(name);
    setIsGameCreated(true);
  };

  // check if a user is logged in by checking if there is a token in local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="bg-white fixed w-full z-999 top-0 left-0 border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/dashboard" className="flex items-center">
          <img src="/asset/brain.png" className="h-8 mr-3" alt="Brain Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
            Big Brain
          </span>
        </a>
        <div className="flex md:order-2">
          {pageType === 'Dashboard' && isLoggedIn && (
            <ButtonBlue
              text="Create"
              onClick={openCreateModal}
            />
          )}
          {pageType !== 'None' && (isLoggedIn ? (<AuthLogoutButton />) : (<AuthLoginButton />))}
        </div>
      </div>
      {showCreateModal && (
        <CreateModal
          onClose={closeModal}
          onConfirm={createGame}
        />
      )}
      {isGameCreated && (
        <AuthErrorPopup error={`${name} created successfully`} />
      )}
    </nav>
  );
};

export default Navbar;
