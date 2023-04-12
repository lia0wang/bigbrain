import React from 'react';

const WhiteButton: React.FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <button
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold
                 py-2 px-4 border border-gray-400 rounded shadow"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default WhiteButton;
