// Navbar.tsx
import * as React from 'react';
import apiRequest from '../../util/api';
import AuthLogoutButton from '../auth/AuthLogoutButton';
import EditButtonDrawer from '../edit/EditButtonDrawer';
import NavGreenButton from './ButtonBlue';
import CreateModal from '../../modal/CreateGameModal';
import { Alert, Snackbar } from '@mui/material';

const Navbar: React.FC<{
  pageType?: string;
}> = ({ pageType }) => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState('');

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
  };

  const createGame = (name: string) => {
    console.log('Creating game with name: ', name);
    apiRequest('POST', '/admin/quiz/new', { name })
    setShowSnackbar(name);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar('');
  };

  return (
    <nav className="bg-white fixed w-full z-999 top-0 left-0 border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/dashboard" className="flex items-center">
          <img src="/asset/brain.png" className="h-8 mr-3" alt="Brain Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-nav-blue">
            Big Brain
          </span>
        </a>
        <div className="flex md:order-2">
          {pageType === 'Dashboard' && (
            <NavGreenButton
              text="Create"
              onClick={openCreateModal}
            />
          )}
          {pageType === 'EditQuestion' && (
            <EditButtonDrawer />
          )}
          <AuthLogoutButton />
        </div>
      </div>
      {showCreateModal && (
        <CreateModal
          onClose={closeModal}
          onConfirm={createGame}
        />
      )}
      <Snackbar
        open={showSnackbar !== ''}
        autoHideDuration={3500} // 3.5 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Game {showSnackbar} has been created!
        </Alert>
      </Snackbar>
    </nav>
  );
};

export default Navbar;
