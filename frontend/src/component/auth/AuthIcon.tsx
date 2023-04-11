import React from 'react';

const AuthIcon: React.FC = () => {
  return (
    <div className="flex flex-row mx-[4%] mt-[20%] mb-[12%] ml-[10%]
    lg:mt-[5%] lg:mb-[6%] lg:ml-[10%]
    2xl:mt-[10%] 2xl:mb-[6%] 2xl:ml-[10%]">
      <img src="./asset/brain.png" className="w-[10%]
      lg:w-[15%]
      2xl:w-[20%]" alt="brain" />
      <h1 className="flex items-center text-xl font-bold mx-[2%]
      lg:text-2xl lg:mx-[3%]
      2xl:text-5xl">
        Big Brain
        <span className="bg-blue-100 text-blue-800 text-2xl font-semibold mx-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800
                         lg:text-3xl lg:px-2 lg:py-1 lg:mx-2
                         2xl:text-5xl 2xl:px-5 2xl:py-3 2xl:mx-4">
          PRO
        </span>
      </h1>
    </div>
  );
};

export default AuthIcon;
