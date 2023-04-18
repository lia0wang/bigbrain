import React from 'react';

interface ViewResultModalProps {
  onConfirm: () => void;
}

const ViewResultModal: React.FC<ViewResultModalProps> = ({ onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-1xl mb-4">Would you like to view the results?</h1>
        <div className="flex flex-row justify-around">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 w-[120px]
                    border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="submit"
            onClick={ onConfirm }
            >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewResultModal;
