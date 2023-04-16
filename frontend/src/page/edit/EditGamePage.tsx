import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from '../../component/dashboard/Navbar';
import apiRequest, { ApiResponse } from '../../util/api';
import LoadingPage from '../LoadingPage';
import NotFoundPage from '../NotFoundPage';
import { uid } from 'uid';
import EditQuestionPage from './EditQuestionPage';
import { fileToDataUrl, resizeImage } from '../../util/imageHandler';

interface Question {
  id: string;
  title: string;
  media: string;
  type: 'single' | 'multiple';
  timeLimit: number;
  points: number;
  answers: Array<{ answer: string }>;
}

interface GameApiResponse extends ApiResponse {
  name: string;
  thumbnail: string | null;
  owner: string;
  active: boolean | null;
  questions: Array<{ question: Question }>; // Define the question structure as needed
}

const EditGamePage: React.FC = () => {
  const { gameId, questionId } = useParams();
  // if questionId is defined, return GameQuestionEditPage
  if (questionId) {
    return <EditQuestionPage qId={questionId} gameId={gameId} />;
  }

  const navigate = useNavigate();

  const [resp, setResp] = useState<GameApiResponse | null>(null);
  const [gameThumbnail, setGameThumbnail] = useState<string | null>(null);
  const [gameName, setGameName] = useState<string>('');
  const [modifiedGameName, setModifiedGameName] = useState<string>('');
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest('GET', `/admin/quiz/${gameId}`);
      setResp(response as GameApiResponse);
      const defaultThumbnail =
        'https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?compress=1&resize=752x';
      setGameThumbnail(
        response.thumbnail === null ? defaultThumbnail : String(response.thumbnail)
      );
      setGameName(String(response.name));
      setModifiedGameName(String(response.name));
    };
    fetchData();
  }, [gameId]);

  if (!resp) {
    return <LoadingPage />;
  }

  if (resp.error) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const resizedFile = await resizeImage(file, 256, 192);
      const dataUrl = await fileToDataUrl(resizedFile as Blob);
      setGameThumbnail(dataUrl);
    } else {
      setGameThumbnail(null);
    }
  };

  const deleteQuestion = (qid: string) => {
    const newQuestions = resp.questions.filter((obj) => obj.question.id !== qid);
    resp.questions = newQuestions;
    setResp({ ...resp });
    apiRequest('PUT', `/admin/quiz/${gameId}`, resp);
  };

  const addQuestion = () => {
    const qId = `question-${uid()}`;
    resp.questions.push({
      question: {
        id: qId,
        title: 'Default Question Title',
        media: 'https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?compress=1&resize=752x',
        type: 'single',
        timeLimit: 5,
        points: 100,
        answers: [],
      },
    });
    setResp({ ...resp });
    apiRequest('PUT', `/admin/quiz/${gameId}`, resp);
  };

  const editQuestion = (qid: string) => {
    navigate(`/game/edit/${gameId}/${qid}`);
  };

  const saveChanges = () => {
    console.log('Save changes');
    resp.name = modifiedGameName;
    resp.thumbnail = gameThumbnail;
    setResp({ ...resp });
    apiRequest('PUT', `/admin/quiz/${gameId}`, resp);
    setGameName(modifiedGameName);
    alert('Changes saved!');
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

  const updateGameByJSON = async () => {
    console.log(gameData);
    if (gameData) {
      resp.name = gameData.name;
      resp.thumbnail = gameData.thumbnail;
      setGameThumbnail(gameData.thumbnail);
      setResp({
        name: gameData.name,
        thumbnail: gameData.thumbnail,
        ...resp
      });

      // setResp({ ...resp })

      console.log(gameData.questions);
      console.log(gameData.thumbnail);

      resp.questions = gameData.questions;
      const requestBody = {
        name: gameData.name,
        thumbnail: gameData.thumbnail,
        ...resp
      };
      console.log(requestBody);
      await apiRequest('PUT', `/admin/quiz/${gameId}`, requestBody);
      setResp({ ...resp });
      setGameName(gameData.name);
      alert('Changes saved!');
      // console.log(gameThumbnail);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-sky-100 min-h-screen flex flex-col items-center px-4">
        <h1 className="text-3xl mb-8 mt-[100px]">Edit Game: {gameName}</h1>
        <div className="bg-white shadow-md rounded-md w-full max-w-4xl p-8 flex flex-wrap">
          <div className="w-full lg:w-1/2 p-4">
            <div className="mb-4">
              <label
                htmlFor="gameName"
                className="block text-s font-medium text-gray-700">
                Game Name
              </label>
              <input
                type="text"
                name="gameName"
                id="gameName"
                value={modifiedGameName}
                onChange={(e) => setModifiedGameName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
              />
            </div>
            {gameThumbnail && (
              <div className="mb-4 flex justify-center">
                <img
                  src={gameThumbnail}
                  alt="Thumbnail Preview"
                  className="w-full h-auto max-w-md rounded-md shadow-sm"
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="gameThumbnail"
                className="block text-s font-medium text-gray-700">
                Game Thumbnail
              </label>
              <input
                type="file"
                name="gameThumbnail"
                id="gameThumbnail"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-3 flex justify-center">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => saveChanges()}>
                Save Name and Thumbnail
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="text-2xl mb-4">Questions</h2>
            <ul>
              {resp.questions.map((obj, index) => {
                if (!obj || !obj.question) {
                  return null;
                }
                return (
                  <li key={index} className="mb-2">
                    <div className="flex items-center">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => deleteQuestion(obj.question.id)}>
                        Delete
                      </button>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => editQuestion(obj.question.id)}>
                        Edit
                      </button>
                      <span className="text-lg text-black">
                        {obj.question.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 flex justify-center">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => addQuestion()}>
                Add Question
              </button>
            </div>
            <div className="mt-4">
              <p>Want to edit the game faster? Try uploading a JSON file. Example JSON Format below.</p>
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mt-3"
                onClick={updateGameByJSON}
              >
                Upload JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditGamePage;
