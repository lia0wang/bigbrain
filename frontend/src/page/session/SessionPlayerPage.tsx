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
import SessionPlayerResultPage from '../result/SessionPlayerResultPage';

const SessionPlayerPage: React.FC = () => {
  const { sessionId } = useParams();
  // if sessionId is defined, return GameQuestionEditPage
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
  const [currentCountdownTime, setCurrentCountdownTime] = useState(null);
  const [point, setPoint] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);
  const [questionNo, setQuestionNo] = useState(-1); // -1 is waiting lobby, 0 is the first question
  const [questionId, setQuestionId] = useState(null);
  const [showResultPage, setShowResultPage] = useState(false);
  const [pointsList, setPointsList] = useState([]);
  const [questionIdList, setQuestionIdList] = useState([]);
  // const [selectedAnswerIds, setSelectedAnswerIds] = useState(null);
  const [currentQuestionType, setCurrentQuestionType] = useState(null);
  const [currentAnswerIds, setCurrentAnswerIds] = useState(new Set<string>());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClick = (aId: string) => {
    if (currentQuestionType === 'single') {
      setCurrentAnswerIds(new Set([aId]));
    } else if (currentQuestionType === 'multi') {
      const newAnswerIds = new Set(currentAnswerIds);
      if (newAnswerIds.has(aId)) {
        newAnswerIds.delete(aId);
      } else {
        newAnswerIds.add(aId);
      }
      setCurrentAnswerIds(newAnswerIds);
    }
  };

  const handleSubmit = async () => {
    if (currentAnswerIds.size > 0) {
      // submit the answer
      console.log(currentAnswerIds);
      const currentAnswerIdsArray = Array.from(currentAnswerIds);
      console.log(currentAnswerIdsArray);
      await apiRequest('PUT', `/play/${playerId}/answer`, { answerIds: currentAnswerIdsArray });
      if (correctAnswerIds.includes(currentAnswerIds)) {
        setUserScore(userScore + point);
      }
      // reset currentAnswerIds
      setCurrentAnswerIds(new Set());
      setIsSubmitted(true);
    }
  };

  let colorIndex = 0;

  const colors = [
    'bg-blue-500',
    'bg-yellow-400',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  const handleAnimationEnd = () => {
    setClicked(false);
  }

  const renderColorAnswer = (answer: string, aId: string) => {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    const isSelected = currentAnswerIds.has(aId);
    const borderColor = isSelected ? 'border-4 border-red-600' : '';

    return (
      <div
        className={`${color} text-black rounded-lg shadow-xl
                    flex justify-start items-center
                    py-2 px-6 min-w-[250px] min-h-[48px]
                    md:py-3 lg:py-4
                    md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px]
                    ${clicked ? 'animate-waving' : ''}
                    ${borderColor}`}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => handleClick(aId)}
        onAnimationEnd={handleAnimationEnd}
      >
        <h1 className="font-medium text-md">{answer}</h1>
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

  const fetchCorrectAnswers = async () => {
    console.log('fetching correct answers');
    if (playerId) {
      console.log('playerId:', playerId);
      const response = await apiRequest('GET', `/play/${playerId}/answer`);
      console.log('response:', response.answerIds);
      setCorrectAnswerIds(response.answerIds);
    }
  };

  const fetchCurrentQuestion = async () => {
    const response = await apiRequest('GET', `/play/${playerId}/question`);
    // console.log('response:', response);
    if (playerId && !response.error) {
      setCurrentQuestion(response.question.question);
      // console.log('response.question.question:', response.question.question);
      setQuestionId(response.question.question.id);
      if (response.question.question.timeLimit && response.question.isoTimeLastQuestionStarted) {
        // calculate current time minus "isoTimeLastQuestionStarted": "2020-10-31T14:45:21.077Z"
        const remainingTime = Math.ceil(response.question.question.timeLimit - (Date.now() - new Date(response.question.isoTimeLastQuestionStarted).getTime()) / 1000);
        // console.log('remainingTime:', remainingTime);
        if (remainingTime > 0) {
          setCurrentCountdownTime(remainingTime);
        } else if (remainingTime === 0) {
          fetchCorrectAnswers();
          setCurrentCountdownTime(0);
        }
      }
    } else {
      console.log('response.error:', response.error);
      clearInterval(pollQuestionIntervalId);
      setShowResultPage(true);
    }
  };

  useEffect(() => {
    if (playerId) {
      console.log('playerId:', playerId);
      setTitle(currentQuestion.title);
      setMedia(currentQuestion.media);
      setAnswers(currentQuestion.answers);
      setPoint(currentQuestion.point);
      setPointsList(pointsList => [...pointsList, currentQuestion.point]);
      setQuestionIdList(questionIdList => [...questionIdList, currentQuestion.id]);
      setCurrentQuestionType(currentQuestion.type);
      setIsSubmitted(false);
    }
    setQuestionNo(questionNo + 1);
    console.log('questionNo:', questionNo);
  }, [questionId]); // every time currentQuestion changes, update the state, fetch correct answers

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
        {playerId && isGameStarted && !showResultPage && (
          (deviceType === 'mobile' && (
            <>
              <div className="bg-sky-100 w-screen flex flex-col mt-24 md:mt-24 lg:mt-24">
                <div className="flex flex-row justify-center items-center">
                  <div className="flex flex-col items-center py-4 mt-10">
                    <Badge badgeContent={currentCountdownTime} color="secondary" className='mr-12'>
                      <AccessTimeFilledIcon color='primary' fontSize='large' />
                    </Badge>
                  </div>
                  {/* Title & Buttons */}
                  <div className="flex flex-row justify-evenly mr-20">
                    <div className="flex flex-col justify-center items-center">
                      <div className="bg-nav-blue text-black py-2 px-4 rounded-lg max-w-[400px] shadow-xl">
                        <h1 className="mt-[1%] text-md font-medium
                                    lg:mt-0 lg:mb-0 2xl:mt-[2%]">
                          {currentQuestionType} : {title}
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
                <div className="mx-auto mt-[60px] lg:mt-[80px]">
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
                  <div className="flex justify-center mt-16">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleSubmit}
                      disabled={isSubmitted}
                    >
                      Submit Answer
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )) ||
          (deviceType === 'desktop' && (
            <>
              <div className="bg-sky-100 w-screen flex flex-col md:mt-24 lg:mt-24 xl:mt-32">
                <div className="flex flex-row justify-center items-center">
                  <div className="flex flex-col items-center py-4 mt-10">
                    <Badge badgeContent={currentCountdownTime} color="secondary" className='mr-12'>
                      <AccessTimeFilledIcon color='primary' fontSize='large' />
                    </Badge>
                  </div>
                  {/* Title & Buttons */}
                  <div className="flex flex-row justify-evenly mr-20">
                    <div className="flex flex-col justify-center items-center">
                      <div className="bg-nav-blue text-black py-2 px-4 rounded-lg max-w-[400px]">
                        <h1 className="mt-[1%] text-md font-medium
                                    lg:mt-0 lg:mb-0 2xl:mt-[2%]">
                          {currentQuestionType} : {title}
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
                  <div className="flex justify-center mt-16">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleSubmit}
                      disabled={isSubmitted}
                    >
                      Submit Answer
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ))
        )}
        {/* showResultPage */}
        {showResultPage && (
          <SessionPlayerResultPage playerId={playerId} pointsList={pointsList} questionIdList={questionIdList} />
        )}
      </div>
    </>
  );
};

export default SessionPlayerPage;
