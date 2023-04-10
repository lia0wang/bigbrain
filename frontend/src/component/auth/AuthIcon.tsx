import React from 'react';

const AuthIcon: React.FC = () => {
  return (
    <div className="flex flex-row mx-[4%] mt-[20%] mb-[12%] ml-[10%]">
      <img src="./asset/brain.png" className="w-[8%]" alt="brain" />
      <h1 className="flex items-center text-lg font-bold mx-[2%]">
        Big Brain
        <span className="bg-blue-100 text-blue-800 text-xl font-semibold mx-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800">
          PRO
        </span>
      </h1>
    </div>
  );
};

export default AuthIcon;
