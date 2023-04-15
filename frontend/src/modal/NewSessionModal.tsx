import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FRONT_END_URL } from '../config';
import { useNavigate } from 'react-router-dom';

interface NewGameModalProps {
  gameTitle: string;
  onClose: () => void;
  sessionId: string;
}

const NewGameModal: React.FC<NewGameModalProps> = ({ gameTitle, onClose, sessionId }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const navigate = useNavigate();
  // Navigate to page admin/session/:sessionId
  const goToSessionAdminPage = () => {
    navigate(`/admin/session/${sessionId}`);
  };

  const urlWithSessionId = `${FRONT_END_URL}/session/${sessionId}`;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-[370px]">
        <h2 className="text-2xl mb-4 text-center">{gameTitle} Session ID</h2>
        <div className="bg-gray-100 p-2 rounded-lg mb-4 flex justify-center">
          <code className="text-xl">{sessionId}</code>
        </div>
        <div className="flex flex-row justify-around">
          <CopyToClipboard text={urlWithSessionId} onCopy={handleCopy}>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 w-[200px]
                          border-b-4 border-blue-700 hover:border-blue-500 rounded"
              type="button">
              {isCopied ? 'COPIED!' : 'COPY SESSION LINK'}
            </button>
          </CopyToClipboard>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 w-[90px]
                          border border-gray-400 rounded shadow"
            type="button"
            onClick={onClose}>
            Close
          </button>
        </div>
        <div className="flex flex-row justify-around mt-2">
          <button
            className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 w-[300px]
                        border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
            type="button"
            onClick={goToSessionAdminPage}>
            GO TO SESSION ADMIN PAGE
          </button>
      </div>
      </div>
    </div>
  );
};

export default NewGameModal;
