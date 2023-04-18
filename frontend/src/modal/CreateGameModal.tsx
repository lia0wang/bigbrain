import React, { useState } from 'react';

interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  title: string;
  media: string;
  type: 'single' | 'multi';
  timeLimit: number;
  point: number;
  answers: Array<{ answer: Answer }>;
}

interface GameData {
  name?: string;
  questions?: Array<{ question: Question }>;
  [key: string]: unknown;
}
interface CreateModalProps {
  onClose: () => void;
  onConfirm: (gameData: JSON) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose, onConfirm }) => {
  // const [name, setName] = useState('');
  const [gameData, setGameData] = useState(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    if (!gameData) { // Prevent empty name
      alert('Please enter a name');
      return;
    }
    onConfirm(gameData);
    onClose();
  };

  const handleJSONChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const data = event.target.result as string;
          const parsedData = JSON.parse(data);
          setGameData(parsedData);
        }
      };
      reader.readAsText(file);
    }
  };

  const validateGameJSON = (gameData: GameData): boolean => {
    if (!gameData.name) {
      alert('JSON file is missing name field');
      return false;
    }

    if (!gameData.questions) {
      alert('JSON file is missing questions field');
      return false;
    }

    for (const questionObj of gameData.questions) {
      const question = questionObj.question;
      if (!question.id || !question.title || !question.media || !question.type || !question.timeLimit || !question.point || !question.answers) {
        alert(`JSON file is missing a required field in question with ID: ${question.id}`);
        return false;
      }

      if (question.type !== 'single' && question.type !== 'multi') {
        alert(`Invalid question type for question with ID: ${question.id}`);
        return false;
      }

      for (const answerObj of question.answers) {
        const answer = answerObj.answer;
        if (!answer.id || !answer.content || typeof answer.isCorrect !== 'boolean') {
          alert(`JSON file is missing a required field in answer with ID: ${answer.id}`);
          return false;
        }
      }
    }

    return true;
  };

  const createGameFromJSON = async () => {
    if (gameData) {
      if (validateGameJSON(gameData)) {
        onConfirm(gameData);
      }
    }
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl mb-4">Create a New Game</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a game name"
            className="border border-gray-400 p-2 w-full rounded-md mb-4"
            // value={name}
            onChange={(e) => setGameData({ name: e.target.value })}
          />
          <div className="flex flex-row justify-around">
            <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 w-[90px]
                       border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="submit">
              Create
            </button>
            <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 w-[90px]
                       border border-gray-400 rounded shadow"
            type="button"
            onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
        <div className="mt-4">
              <p>Or create game via JSON</p>
              <div className="mt-2">
                <span className="text-blue-500 hover:text-blue-700 hover:underline">
                  <a
                    href="/example.json"
                    download
                    className="text-blue-500 hover:text-blue-700 hover:underline focus:outline-none"
                  >
                    Download example.json
                  </a>
                </span>
              </div>
              <label
                htmlFor="gameThumbnail"
                className="mt-2 block text-s font-medium text-gray-700">
                Select your JSON file
              </label>
              <input
                type="file"
                accept="application/json"
                onChange={handleJSONChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3
                focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-[280px]"
              />
              <div className='flex justify-center'>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 w-[240px]
                  border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
                  onClick={createGameFromJSON}
                >
                  Create Game from JSON
                </button>
              </div>
            </div>
      </div>
    </div>
  );
};

export default CreateModal;
