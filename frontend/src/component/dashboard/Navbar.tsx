import * as React from 'react';
import AuthLogoutButton from '../auth/AuthLogoutButton';
import EditButtonDrawer from '../edit/EditButtonDrawer';
import NavGreenButton from './ButtonBlue';

const Navbar: React.FC<{
  isDashboard: boolean;
  isEditQuestionPage: boolean;
}> = ({ isDashboard, isEditQuestionPage }) => {
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
          {isDashboard && (
            <NavGreenButton
              text="Create"
              onClick={() => {
                // put your code here
              }}
            />
          )}
          {isEditQuestionPage && (
            <EditButtonDrawer />
          )}
          <AuthLogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
