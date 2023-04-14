import React from 'react';

const ButtonBlue: React.FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mx-2 w-[90px]
                 border-b-4 border-blue-800 hover:border-blue-700 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonBlue;
