import React from 'react';

const AuthNavigator: React.FC<{
  navPath: string;
  navText: string;
  navigate: (path: string) => void;
}> = ({ navPath, navText, navigate }) => {
  return (
    <div className="flex flex-col mt-[4%] ml-[10%] 2xl:mt-[2%]">
      <p className="text-sm font-normal text-gray-600 2xl:text-2xl">
        If you don&apos;t have an account.
      </p>
      <div className="flex flex-row">
        <p className="text-sm font-normal text-gray-600 2xl:text-2xl">You can</p>
        <span
          onClick={() => navigate(navPath)}
          className="text-lg font-semibold text-blue-500 cursor-pointer lg:text-lg 2xl:text-3xl"
        >
          &nbsp;{navText} Here!
        </span>
      </div>
    </div>
  );
};

export default AuthNavigator;
