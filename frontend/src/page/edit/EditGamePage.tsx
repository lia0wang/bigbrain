import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../component/dashboard/Navbar';
import apiRequest, { ApiResponse } from '../../util/api';
import LoadingPage from '../LoadingPage';
import EditQuestionPage from './EditQuestionPage';

const EditGamePage: React.FC = () => {
  const { gameId, questionNo } = useParams();
  const [resp, setResp] = useState<ApiResponse | null>(null);

  // if questionNo is defined, return GameQuestionEditPage
  if (questionNo) {
    // TODO: implement GameQuestionEditPage
    return <EditQuestionPage qNo={questionNo} />;
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
    <>
      <Navbar />
      <div className="bg-sky-100 w-screen h-screen flex flex-row content-center justify-center py-20">
        <h1>Game Edit Page</h1>
        <p>Editing game with ID: {gameId}</p>
        <pre>{JSON.stringify(resp, null, 2)}</pre>
      </div>
    </>
  );
};

export default EditGamePage;
