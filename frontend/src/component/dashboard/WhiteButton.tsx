import React from 'react';

const WhiteButton: React.FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <button type="button"
    className="px-3 py-2 text-xs font-medium text-blue-700 focus:outline-none bg-white
               hover:bg-sky-100 transition duration-500 ease-in-out
               focus:z-10 focus:ring-1 focus:bg-sky-100"
    onClick={onClick}>
    {text}
    </button>
  );
};

export default WhiteButton;
