import React from 'react';

const AuthTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex flex-col m-[4%] ml-[10%]">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-[1%] text-md font-medium mb-[8%]">
        Who&apos;s the Smartest?
      </p>
    </div>
  );
};

export default AuthTitle;
