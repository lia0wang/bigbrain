import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiRequest, { ApiResponse } from '../util/api';
import LoadingPage from './LoadingPage';

const GameEditPage: React.FC = () => {
  const { gameId, questionNo } = useParams();
  const [resp, setResp] = useState<ApiResponse | null>(null);

  // if questionNo is defined, return GameQuestionEditPage
  if (questionNo) {
    // TODO: implement GameQuestionEditPage
    return <div>GameQuestionEditPage</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest('GET', `/admin/quiz/${gameId}`);
      setResp(response);
    };
    fetchData();
  }, [gameId]);

  if (!resp) {
    return <LoadingPage />;
  }

  return (
    <div>
      <h1>Game Edit Page</h1>
      <p>Editing game with ID: {gameId}</p>
      <p>Editing question number: {questionNo}</p>
      <pre>{JSON.stringify(resp, null, 2)}</pre>
    </div>
  );
};

export default GameEditPage;
