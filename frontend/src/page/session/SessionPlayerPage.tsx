import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import apiRequest from '../../util/api';
import EnterNameModal from '../../modal/EnterNameModal';
import { Button, Box, Container, Typography } from '@mui/material';
import Navbar from '../../component/dashboard/Navbar';
import { POLLING_INTERVAL } from '../../config';

const SessionPlayerPage: React.FC = () => {
  const { sessionId } = useParams();
  // if questionId is defined, return GameQuestionEditPage
  if (!sessionId) {
    return <NotFoundPage />;
  }

  const [playerName, setPlayerName] = useState<string>(null);
  const [playerId, setPlayerId] = useState<string>(null);
  const [timer, setTimer] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);
  const [isGameStarted, setIsGameStarted] = useState(null);
  const [pollGameStatusIntervalId, setPollGameStatusIntervalId] = useState(null);
  const [pollQuestionIntervalId, setPollQuestionIntervalId] = useState(null);

  const joinSessionWithName = async (name: string): Promise<void> => {
    setPlayerName(name)
    const resp = await apiRequest('POST', `/play/join/${sessionId}`, { name });
    if (resp.error) {
      console.log(resp.error);
      alert(resp.error)
      return;
    }
    setPlayerId(resp.playerId);
    setIsGameStarted(false); // trigger useEffect to start polling game status
    console.log(resp);
  };

  // Lobby stopwatch game
  const startTimer = () => {
    setTimer(0);
    setIsStopwatchRunning(true);
    setMessage('');
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 10);
    }, 10);
  };

  const stopTimer = () => {
    setIsStopwatchRunning(false);
    clearInterval(timerRef.current);

    const diff = Math.abs(timer - 5000);
    if (diff === 0) {
      setMessage('Perfect!');
    } else if (diff <= 100) {
      setMessage('Great!');
    } else {
      setMessage('Try again!');
    }
  };

  const fetchIsGameStarted = async () => {
    if (playerId) {
      const response = await apiRequest('GET', `/play/${playerId}/status`);
      setIsGameStarted(response.started);
      console.log(isGameStarted)
    }
  };

  const fetchCurrentQuestion = async () => {
    if (playerId) {
      const response = await apiRequest('GET', `/play/${playerId}/question`);
      console.log(response)
    }
  };

  useEffect(() => {
    if (!isGameStarted) {
      const intervalId = setInterval(async () => {
        await fetchIsGameStarted();
      }, POLLING_INTERVAL); // polling game status
      setPollGameStatusIntervalId(intervalId);
    } else {
      pollGameStatusIntervalId && clearInterval(pollGameStatusIntervalId);
      const intervalId = setInterval(async () => {
        await fetchCurrentQuestion();
      }, POLLING_INTERVAL); // polling current question
      setPollQuestionIntervalId(intervalId);
    }
  }, [isGameStarted]);

  return (
    <>
      <Navbar pageType='None'/>
      <div className="bg-sky-100 min-h-screen flex flex-col content-center">
        {!playerId && (
          <EnterNameModal onConfirm={joinSessionWithName} />
        )}
        {playerId && !isGameStarted && (
          <Container maxWidth="sm" className='mt-[50px]'>
            <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
              <Typography variant="h4" component="h1">
                Waiting Lobby
              </Typography>
              {/* <Typography>Your identification: {playerId}</Typography> */}
              <Typography variant="h6" component="h3">
                Hello, {playerName}! <br />
                Kindly wait for the administrator to initiate the game :)
              </Typography>
              <Typography variant="h6" component="h3">In the meantime, you can enjoy a fun little game.</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="h6" component="h3">Try if you can stop the count at exactly 5 second!</Typography>
              {!isStopwatchRunning
                ? (
                  <Button variant="contained" color="primary" onClick={startTimer}>
                    Start
                  </Button>
                  )
                : (
                  <Button variant="contained" color="primary" onClick={stopTimer}>
                    Stop
                  </Button>
                  )}
              <Typography className="mt-4">
                Timer: {(timer / 1000).toFixed(2)}s
              </Typography>
              <Typography className="mt-4">{message}</Typography>
            </Box>
          </Container>
        )}
      </div>
    </>
  );
};

export default SessionPlayerPage;
