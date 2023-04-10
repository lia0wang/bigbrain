import React from 'react';

const AuthNavigator: React.FC<{ navPath: string; navText: string; navigate: any }> = ({
  navPath,
  navText,
  navigate,
}) => {
  return (
    <div className="flex flex-col mt-[4%] ml-[10%]">
      <p className="text-sm font-normal text-gray-600">
        If you don&apos;t have an account.
      </p>
      <div className="flex flex-row">
        <p className="text-sm font-normal text-gray-600">You can</p>
        <span
          onClick={() => navigate(navPath)}
          className="text-sm font-semibold text-blue-500 lg:text-xl cursor-pointer"
        >
          &nbsp;{navText} Here!
        </span>
      </div>
    </div>
  );
};

export default AuthNavigator;
