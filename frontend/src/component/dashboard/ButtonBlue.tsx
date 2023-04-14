import React from 'react';

const ButtonBlue: React.FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mx-2
                w-[90px] lg:w-[120px] lg:h-[40px] xl:w-[150px] xl:h-[50px] 2xl:w-[200px] 2xl:h-[60px]
                rounded lg:rounded-lg
                text-[12px] lg:text-[16px] xl:text-[20px] 2xl:text-[24px]
                border-b-4 border-blue-800 hover:border-blue-700 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonBlue;
