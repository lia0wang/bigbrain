import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import apiRequest from '../../util/api';
import EnterNameModal from '../../modal/EnterNameModal';
import { Button, Box, Container, Typography, Badge, Grid } from '@mui/material';
import Navbar from '../../component/dashboard/Navbar';
import { POLLING_INTERVAL } from '../../config';
import { isMobileWidth, isDesktopWidth } from '../../util/media';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

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
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [deviceType, setDeviceType] = useState('');
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState('');
  const [answers, setAnswers] = useState([]);
  const [timeLimit, setTimeLimit] = useState(0);
  const [point, setPoint] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);

  let colorIndex = 0;

  const colors = [
    'bg-blue-500',
    'bg-yellow-400',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  const handleClick = async (aId: string) => {
    setClicked(true);
    console.log(correctAnswerIds.includes(aId));
    // if aid is one of the correct answer ids
    if (correctAnswerIds.includes(aId)) {
      setUserScore(userScore + point);
    }
    // console.log('userScore:', userScore);
  };

  const handleAnimationEnd = () => {
    setClicked(false);
  }

  const renderColorAnswer = (answer: string, aId: string) => {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return (
      <div
        className={`${color} text-black rounded-lg shadow-xl
                    flex justify-start items-center
                    py-2 px-6 min-w-[250px] min-h-[48px]
                    md:py-3 lg:py-4
                    md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px]
                    ${clicked ? 'animate-waving' : ''}
                    `}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => handleClick(aId)}
        onAnimationEnd={handleAnimationEnd}
      >
        <h1 className="font-medium text-md">
          {answer}
        </h1>
    </div>
    );
  };

  const joinSessionWithName = async (name: string): Promise<void> => {
    setPlayerName(name)
    const resp = await apiRequest('POST', `/play/join/${sessionId}`, { name });
    if (resp.error) {
      alert(resp.error)
      return;
    }
    setPlayerId(resp.playerId);
    setIsGameStarted(false); // trigger useEffect to start polling game status
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

  const countDownTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeLimit > 0) {
      countDownTimerRef.current = setTimeout(() => {
        setTimeLimit(timeLimit - 1);
      }, 1000);
    }
    return () => {
      if (countDownTimerRef.current) {
        clearTimeout(countDownTimerRef.current);
      }
    };
  }, [timeLimit]);

  const fetchIsGameStarted = async () => {
    if (playerId) {
      const response = await apiRequest('GET', `/play/${playerId}/status`);
      setIsGameStarted(response.started);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isMobileWidth()) setDeviceType('mobile');
      else if (isDesktopWidth()) setDeviceType('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchCorrectAnswers = async () => {
      console.log('fetching correct answers');
      if (playerId) {
        console.log('playerId:', playerId);
        const response = await apiRequest('GET', `/play/${playerId}/answer/`, { playerId });
        console.log('response:', response.answerIds);
        setCorrectAnswerIds(response.answerIds);
      }
    };

    const fetchCurrentQuestion = async () => {
      if (playerId) {
        const response = await apiRequest('GET', `/play/${playerId}/question`);
        setCurrentQuestion(response.question.question);
        setTitle(response.question.question.title);
        setMedia(response.question.question.media);
        setAnswers(response.question.question.answers);
        setPoint(response.question.question.point);
        setTimeLimit(response.question.question.timeLimit);
      }
    };

    if (!isGameStarted) {
      const intervalId = setInterval(async () => {
        await fetchIsGameStarted();
      }, POLLING_INTERVAL); // polling game status
      setPollGameStatusIntervalId(intervalId);
    } else {
      pollGameStatusIntervalId && clearInterval(pollGameStatusIntervalId);
      const intervalId = setInterval(async () => {
        await fetchCurrentQuestion();
        await fetchCorrectAnswers();
      }, POLLING_INTERVAL); // polling current question
      setPollQuestionIntervalId(intervalId);
    }
  }, [isGameStarted]);

  return (
    <>
      <Navbar pageType="EditQuestion" />
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
        {playerId && isGameStarted && (
          (deviceType === 'mobile' && (
            <>
              <div className="bg-sky-100 w-screen flex flex-col mt-24 md:mt-24 lg:mt-24">
                <div className="flex flex-row justify-center items-center">
                  <div className="flex flex-col items-center py-4 mt-10">
                  <Badge badgeContent={timeLimit} color="secondary" className='mr-12'>
                    <AccessTimeFilledIcon color='primary' fontSize='large' />
                  </Badge>
                  </div>
                  {/* Title & Buttons */}
                  <div className="flex flex-row justify-evenly mr-20">
                    <div className="flex flex-col justify-center items-center">
                    <div className="bg-nav-blue text-black py-2 px-4 rounded-lg max-w-[400px] shadow-xl">
                      <h1 className="mt-[1%] text-md font-medium
                                    lg:mt-0 lg:mb-0 2xl:mt-[2%]">
                        {title}
                      </h1>
                    </div>
                      <img
                        className="w-[150px] h-[150px]
                        sm:w-[220px] sm:h-[220px]
                        object-cover rounded-lg mt-4"
                        src={media} // TODO: Add video support
                      />
                    </div>
                  </div>
                </div>
                {/* Answers */}
                <div className="mx-auto mt-[20px] lg:mt-[30px]">
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                    columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                  >
                    {answers.map((obj: { answer: { content: string; id: string; isCorrect: boolean; }; }, index: React.Key) => {
                      if (!obj.answer) return null;
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          lg={6}
                          xl={6}
                          key={index}
                        >
                          <div
                            className="flex flex-row justify-center min-w-[250px]
                                              sm:mt-8 md:mt-4 lg:mt-4"
                          >
                            {renderColorAnswer(obj.answer.content, obj.answer.id)}
                          </div>
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </div>
            </>
          )) ||
          (deviceType === 'desktop' && (
            <>
              <div className="bg-sky-100 w-screen flex flex-col md:mt-24 lg:mt-24 xl:mt-32">
                <div className="flex flex-row justify-center items-center">
                  <div className="flex flex-col items-center py-4 mt-10">
                  <Badge badgeContent={timeLimit} color="secondary" className='mr-12'>
                    <AccessTimeFilledIcon color='primary' fontSize='large' />
                  </Badge>
                  </div>
                  {/* Title & Buttons */}
                  <div className="flex flex-row justify-evenly mr-20">
                    <div className="flex flex-col justify-center items-center">
                    <div className="bg-nav-blue text-black py-2 px-4 rounded-lg max-w-[400px]">
                      <h1 className="mt-[1%] text-md font-medium
                                    lg:mt-0 lg:mb-0 2xl:mt-[2%]">
                        {title}
                      </h1>
                    </div>
                      <img
                        className="md:w-[220px] md:h-[220px]
                        object-cover rounded-lg mt-4"
                        src={media} // TODO: Add video support
                      />
                    </div>
                  </div>
                </div>
                {/* Answers */}
                <div className="mx-auto md:mt-[25px] lg:mt-[40px]">
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                    columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                  >
                    {answers.map((obj: { answer: { content: string; id: string; isCorrect: boolean; }; }, index: React.Key) => {
                      if (!obj.answer) return null;
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          lg={6}
                          xl={6}
                          key={index}
                        >
                          <div
                            className="flex flex-row justify-center min-w-[250px]
                                              sm:mt-8 md:mt-4 lg:mt-4"
                          >
                            {renderColorAnswer(obj.answer.content, obj.answer.id)}
                          </div>
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default SessionPlayerPage;
