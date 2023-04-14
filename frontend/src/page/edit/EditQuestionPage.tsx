import React, { useEffect, useState } from 'react';
import Navbar from '../../component/dashboard/Navbar';
import NotFoundPage from '../NotFoundPage';
import apiRequest, { ApiResponse } from '../../util/api';
import LoadingPage from '../LoadingPage';
import EditButtonDrawer from '../../component/edit/EditButtonDrawer';
import Typography from '@mui/material/Typography';
import Media from './Media';

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
  questions: Array<{ question: Question }>;
}

const EditQuestionPage: React.FC<{ qId: string, gameId:string }> = ({ qId, gameId }) => {
  const [resp, setResp] = useState<GameApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest('GET', `/admin/quiz/${gameId}`);
      setResp(response as GameApiResponse);
    };
    fetchData();
  }, [qId]);

  const getQuestionInfo = () => {
    return resp.questions.find((question) => question.question.id === qId).question;
  }

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

  return (
    console.log(getQuestionInfo().media),
    <>
      <Navbar pageType='EditQuestion' />
      <div className="bg-sky-100 w-screen h-screen flex flex-col py-20">
        <div className="flex flex-row justify-end m-2">
         <EditButtonDrawer />
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col">
            <Typography variant="h4" component="h4" gutterBottom>
              {getQuestionInfo().title}
            </Typography>
            <Media
              url={getQuestionInfo().media}
            />
          </div>
          <div className="">
          </div>
        </div>
        {/* <div className="flex flex-col">
          <p>{getQuestionInfo().title}</p>
          <img src={getQuestionInfo().media} alt="Question Image" />
          <div className="flex flex-col">
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default EditQuestionPage;
