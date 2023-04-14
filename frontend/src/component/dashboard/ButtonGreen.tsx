import React from 'react';

const ButtonGreen: React.FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <button
      className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 mx-2
                 w-[90px] lg:w-[120px] lg:h-[40px] xl:w-[150px] xl:h-[50px] 2xl:w-[200px] 2xl:h-[60px]
                 rounded lg:rounded-lg
                 text-[12px] lg:text-[16px] xl:text-[20px] 2xl:text-[24px]
                 border-b-4 border-green-800 hover:border-green-700"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonGreen;
