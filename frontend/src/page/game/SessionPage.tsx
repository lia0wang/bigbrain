import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import apiRequest from '../../util/api';
import React, { useEffect, useState } from 'react';
import LoadingPage from '../LoadingPage';

// interface Question {
//   id: string;
//   title: string;
//   media: string;
//   type: 'single' | 'multiple';
//   timeLimit: number;
//   points: number;
//   answers: Array<{ answer: string }>;
// }

// interface GameApiResponse extends ApiResponse {
//   name: string;
//   thumbnail: string | null;
//   owner: string;
//   active: boolean | null;
//   questions: Array<{ question: Question }>; // Define the question structure as needed
// }

const SessionPage: React.FC = () => {
  const { sessionId } = useParams();
  console.log(sessionId);
  // if questionId is defined, return GameQuestionEditPage
  if (!sessionId) {
    return <NotFoundPage />;
  }

  // const [resp, setResp] = useState(null);
  // const [gameThumbnail, setGameThumbnail] = useState<string | null>(null);
  // const [gameName, setGameName] = useState<string>('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await apiRequest('GET', `/admin/${sessionId}/status`);
  //     console.log(response);
  //     setResp(response);
  //     const defaultThumbnail = 'https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?compress=1&resize=752x'
  //     setGameThumbnail(response.thumbnail === null ? defaultThumbnail : String(response.thumbnail));
  //     setGameName(String(response.name));
  //   };
  //   fetchData();
  // }, [resp]);

  // // if (!resp) {
  // //   return <LoadingPage />;
  // // }
  // console.log(resp);

  // if (resp.error) {
  //   return (
  //     <>
  //       <NotFoundPage />
  //     </>
  //   );
  // }

  // if (resp.status === 'inactive') {
  //   return (
  //     <>
  //       <h1>Game has finished</h1>
  //     </>
  //   );
  // }

  // if (resp.position === -1) {
  //   return (
  //     <>
  //       <h1>Lobby Page</h1>
  //     </>
  //   );
  // }

  return (
    <>
      <h1>Lobby</h1>
      <h1>Please Wait Game to Start</h1>
      <p>Play the little game while waiting :)</p>
    </>
  );
};

export default SessionPage;
