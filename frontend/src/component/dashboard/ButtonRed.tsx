import React from 'react';

const RedButton: React.FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <button type="button"
    className="px-3 py-2 font-medium text-red-700 focus:outline-none bg-white
               hover:bg-sky-100 transition duration-500 ease-in-out
               text-base"
    onClick={onClick}>
    {text}
    </button>
  );
};

export default RedButton;
