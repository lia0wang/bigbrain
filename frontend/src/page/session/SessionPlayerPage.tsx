import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import apiRequest from '../../util/api';
import EnterNameModal from '../../modal/EnterNameModal';
import { Button, Box, Container, Typography } from '@mui/material';

const SessionPlayerPage: React.FC = () => {
  const { sessionId } = useParams();
  console.log(sessionId);
  // if questionId is defined, return GameQuestionEditPage
  if (!sessionId) {
    return <NotFoundPage />;
  }

  const [playerName, setPlayerName] = useState<string>(null);
  const [playerId, setPlayerId] = useState<string>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);

  const joinSessionWithName = async (name: string): Promise<void> => {
    setPlayerName(name)
    const resp = await apiRequest('POST', `/play/join/${sessionId}`, { name });
    if (resp.error) {
      console.log(resp.error);
      alert(resp.error)
      return;
    }
    setPlayerId(resp.playerId);
    console.log(resp);
  };

  // Lobby stopwatch game
  const startTimer = () => {
    setTimer(0);
    setIsRunning(true);
    setMessage('');
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 100);
    }, 100);
  };

  const stopTimer = () => {
    setIsRunning(false);
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

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col content-center">
      {!playerId && (
        <EnterNameModal onConfirm={joinSessionWithName} />
      )}
      {playerId && (
        <Container maxWidth="sm">
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
            <Typography variant="h6" component="h3">Try if you can stop the count at exactly at 5!</Typography>
            {!isRunning
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
  );
};

export default SessionPlayerPage;
