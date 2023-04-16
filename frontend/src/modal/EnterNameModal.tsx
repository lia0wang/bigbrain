import React from 'react';

interface EnterNameModalProps {
  onConfirm: (name: string) => void;
}

const EnterNameModal: React.FC<EnterNameModalProps> = ({ onConfirm }) => {
  const [name, setName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    if (!name) { // Prevent empty name
      alert('Please enter a name');
      return;
    }
    onConfirm(name);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg">
        {/* <h2 className="text-2xl mb-4">Enter Your Name</h2> */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nickname"
            className="border border-gray-400 p-2 w-full rounded-md mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-row justify-around">
            <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 w-[120px]
                       border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="submit">
              OK, join!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterNameModal;
