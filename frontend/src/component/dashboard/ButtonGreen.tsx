import React from 'react';

const ButtonGreen: React.FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <button
      className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 mx-2 w-[90px]
                 border-b-4 border-green-800 hover:border-green-700 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonGreen;
