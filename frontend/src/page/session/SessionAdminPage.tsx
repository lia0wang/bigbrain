import { useParams, useLocation } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import apiRequest from '../../util/api';
import React, { useEffect, useState } from 'react';
import { POLLING_INTERVAL } from '../../config';
import { Button, Card, CardContent, List, Typography } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Navbar from '../../component/dashboard/Navbar';

const SessionAdminPage: React.FC = () => {
  const { sessionId } = useParams();
  const location = useLocation();
  const { quizId, gameTitle } = location.state || { quizId: null, gameTitle: null };

  const [players, setPlayers] = useState([]);
  const [showWaitingPage, setShowWaitingPage] = useState(true);
  const [showQuestionPage, setShowQuestionPage] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const [position, setPosition] = useState(null);
  const [questionList, setQuestionList] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [pollPlayerIntervalId, setPollPlayerIntervalId] = useState(null);
  const [questionNo, setQuestionNo] = useState(null);
  const [totalQuestion, setTotalQuestion] = useState(null);

  if (!sessionId) {
    return <NotFoundPage />;
  }

  const fetchPlayers = async () => {
    const response = await apiRequest('GET', `/admin/session/${sessionId}/status`);
    setPlayers(response.results.players);
  };

  useEffect(() => {
    const fetchPosition = async () => {
      const response = await apiRequest('GET', `/admin/session/${sessionId}/status`);
      setPosition(response.results.position);
    };

    fetchPlayers();
    fetchPosition();
  }, []);

  useEffect(() => {
    console.log(position);
    if (position === -1) { // waiting page
      const intervalId = setInterval(async () => {
        await fetchPlayers();
      }, POLLING_INTERVAL); // polling players in waiting page
      setPollPlayerIntervalId(intervalId);
      setShowWaitingPage(true);
      setShowQuestionPage(false);
    } else if (position >= 0 && position < totalQuestion) { // question page
      setShowWaitingPage(false);
      setShowQuestionPage(true);
    } else if (position === totalQuestion) { // results page
      setShowWaitingPage(false);
      setShowQuestionPage(false);
      setShowResultPage(true);
    }
  }, [position, totalQuestion]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await apiRequest('GET', `/admin/quiz/${quizId}`);
      setQuestionList(response.questions);
      setTotalQuestion(response.questions.length)
      console.log(questionList);
    };
    console.log(quizId);
    if (quizId) {
      fetchQuestions(); // Perform an initial fetch of question list
    }
  }, [quizId]); // Run the effect when quizId changes

  useEffect(() => {
    if (position >= 0 && questionList) {
      if (questionList[position] == null) {
        console.log('questionList[position] is null');
        setShowQuestionPage(false);
        setShowResultPage(true);
      } else {
        setQuestionNo(position + 1);
        setCurrentQuestion(questionList[position]);
        console.log(questionList[position]);
      }
    }
  }, [position, questionList]); // Run the effect when position or questionList changes, new question will be set

  const handleAdvance = async () => {
    const resp = await apiRequest('POST', `/admin/quiz/${quizId}/advance`, { quizId });
    console.log(resp);
    setPosition(resp.stage);
    pollPlayerIntervalId && clearInterval(pollPlayerIntervalId);
  };

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col content-center">
      <Navbar />
      {showWaitingPage && (<div className="container mx-auto px-4 sm:max-w-sm bg-sky-100 min-h-screen">
        <div className="text-center mt-[100px] mb-4">
          <Typography variant="h4" component="h2">
            Quiz: {gameTitle}
          </Typography>
        </div>
        <div className="text-center mt-6">
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayArrow />}
            onClick={handleAdvance}
            // disabled={players.length === 0}
          >
            Start Quiz
          </Button>
        </div>
        <div className="text-center mt-6 mb-4">
          <Typography variant="h5" component="h2">
            Join the quiz by code {sessionId}
          </Typography>
        </div>
        <div className="text-center mt-6 mb-4">
          <Typography variant="h4" component="h2">
            Players
          </Typography>
        </div>
        <List className="mt-4 grid grid-cols-2 gap-1">
          {players.map((player, index) => (
            <div key={index} className="justify-center p-1">
              <Card>
                <CardContent>
                  <Typography variant="body2" align="center">
                    {player}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </List>
      </div>)}
      {showQuestionPage && (
        <div className="container mx-auto px-4 sm:max-w-sm bg-sky-100 min-h-screen">
          <div className="text-center mt-[85px]">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowForwardIosIcon />}
              onClick={handleAdvance}
            >
              Skip The Question
            </Button>
          </div>
          <div className="text-center mt-3 mb-4">
          <Typography variant="h5" component="h2">
            Question {questionNo} / {totalQuestion}
          </Typography>
        </div>
          <pre>{JSON.stringify(currentQuestion, null, 2)}</pre>
        </div>
      )}
      {showResultPage && (<></>)}
    </div>
  );
};

export default SessionAdminPage;
