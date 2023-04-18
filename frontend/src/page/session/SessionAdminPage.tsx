import { useParams, useLocation } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import apiRequest from '../../util/api';
import React, { useEffect, useState } from 'react';
import { POLLING_INTERVAL } from '../../config';
import { Button, Card, CardContent, Grid, List, Typography } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Navbar from '../../component/dashboard/Navbar';
import { isMobileWidth, isDesktopWidth } from '../../util/media';
import Badge from '@mui/material/Badge';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SessionAdminResultPage from '../result/SessionAdminResultPage';
import ViewResultModal from '../../modal/ViewResultModal';
import MediaComponent from 'component/MediaComponent';

const SessionAdminPage: React.FC = () => {
  const { sessionId } = useParams();
  const location = useLocation();
  const { quizId, gameTitle, viewResults } = location.state || { quizId: null, gameTitle: null };

  const [players, setPlayers] = useState([]);
  const [showWaitingPage, setShowWaitingPage] = useState(true);
  const [showQuestionPage, setShowQuestionPage] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const [position, setPosition] = useState(null);
  const [questionList, setQuestionList] = useState(null);
  const [pollPlayerIntervalId, setPollPlayerIntervalId] = useState(null);
  const [questionNo, setQuestionNo] = useState(null);
  const [totalQuestion, setTotalQuestion] = useState(null);
  const [deviceType, setDeviceType] = useState('');
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState('');
  const [answers, setAnswers] = useState([]);
  const [timeLimit, setTimeLimit] = useState(0);
  const [showViewGameModal, setShowViewGameModal] = useState(false);
  const [isDuringQuestion, setIsDuringQuestion] = useState(false);
  // const [isCurrent
  let colorIndex = 0;

  const colors = [
    'bg-blue-500',
    'bg-yellow-400',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  if (!sessionId) {
    return <NotFoundPage />;
  }

  const fetchPlayers = async () => {
    const response = await apiRequest('GET', `/admin/session/${sessionId}/status`);
    setPlayers(response.results.players);
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
    const fetchPosition = async () => {
      const response = await apiRequest('GET', `/admin/session/${sessionId}/status`);
      setPosition(response.results.position);
    };

    fetchPlayers();
    fetchPosition();
  }, []);

  useEffect(() => {
    if (position === -1) { // waiting page
      const intervalId = setInterval(async () => {
        await fetchPlayers();
      }, POLLING_INTERVAL); // polling players in waiting page
      setPollPlayerIntervalId(intervalId);
      setShowWaitingPage(true);
      setShowQuestionPage(false);
      setShowResultPage(false);
    } else if (position >= 0 && position < totalQuestion) { // question page
      setShowWaitingPage(false);
      setShowQuestionPage(true);
      setShowResultPage(false);
    } else if (position && totalQuestion && position === totalQuestion) { // results page
      setShowWaitingPage(false);
      setShowQuestionPage(false);
      setShowResultPage(true);
    }
    if (viewResults) {
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
    };
    if (quizId) {
      fetchQuestions(); // Perform an initial fetch of question list
    } else {
      alert('Please enter the admin page from dashboard.\nClick session id and then click "GO TO SESSION ADMIN PAGE"')
    }
  }, [quizId]); // Run the effect when quizId changes

  useEffect(() => {
    if (position >= 0 && questionList) {
      if (questionList[position] == null) {
        setShowQuestionPage(false);
      } else {
        setQuestionNo(position + 1);
        setTitle(questionList[position].question.title);
        setMedia(questionList[position].question.media);
        setAnswers(questionList[position].question.answers);
        setTimeLimit(questionList[position].question.timeLimit);
      }
    }
  }, [position, questionList]); // Run the effect when position or questionList changes, new question will be set

  useEffect(() => {
    if (position >= 0 && position <= totalQuestion - 1) {
      let timer: NodeJS.Timeout;
      if (timeLimit > 0) {
        timer = setTimeout(() => {
          setTimeLimit(timeLimit - 1);
        }, 1000);
      } else {
        setIsDuringQuestion(false);
      }
      return () => clearTimeout(timer);
    }
    return () => {
      // donothing
    };
  }, [timeLimit]);

  const handleAdvance = async () => {
    const resp = await apiRequest('POST', `/admin/quiz/${quizId}/advance`, { quizId });
    setPosition(resp.stage);
    setIsDuringQuestion(true);
    pollPlayerIntervalId && clearInterval(pollPlayerIntervalId);
  };

  const handleEndGame = async () => {
    await apiRequest('POST', `/admin/quiz/${quizId}/end`, { quizId });
    setShowViewGameModal(true);
  };

  const showResult = async () => {
    setPosition(totalQuestion);
    setShowViewGameModal(false);
  };

  const renderColorAnswer = (text: string) => {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return (
      <div className={`${color} text-black rounded-lg shadow-xl
                      flex justify-start items-center
                      py-2 px-6 min-w-[250px] min-h-[48px]
                      md:py-3 lg:py-4
                      md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px]
                      `}>
        <h1 className="font-medium text-md">
          {text}
        </h1>
      </div>
    );
  };

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col content-center">
      <Navbar />
      {showViewGameModal && (
        <ViewResultModal
          onConfirm={showResult}
        />
      )}
      {showWaitingPage && (
        <>
          <div className="container mx-auto px-4 sm:max-w-sm bg-sky-100 min-h-screen">
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
                disabled={players.length === 0}
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
          </div>
        </>
      )}

      {showQuestionPage && (
        (deviceType === 'mobile' && (
          <>
            <div className="bg-sky-100 w-screen flex flex-col mt-24 md:mt-24 lg:mt-24">
              <div className="flex flex-row justify-evenly items-center">
                <div className="flex flex-col items-center py-4 mt-10">
                  <Badge badgeContent={timeLimit} color="secondary">
                    <AccessTimeFilledIcon color='primary' fontSize='large' />
                  </Badge>
                </div>
                {/* Title & Buttons */}
                <div className="flex flex-row justify-evenly">
                  <div className="flex flex-col justify-center items-center ml-4">
                    <div className="bg-nav-blue text-black py-2 px-4 rounded-lg max-w-[400px] shadow-xl">
                      <h1 className="mt-[1%] text-md font-medium
                                  lg:mt-0 lg:mb-0 2xl:mt-[2%]">
                        {title}
                      </h1>
                    </div>
                    <MediaComponent media={media} />
                  </div>
                </div>
                <div className="flex flex-col items-center py-4 mt-10">
                <div className="flex flex-col items-center py-4 mt-10 gap-4">
                  <Typography variant="h6" component="h3">{questionNo} / {totalQuestion}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<ArrowForwardIosIcon />}
                    onClick={handleAdvance}
                  >
                    {isDuringQuestion ? 'Skip Question' : 'Next Question'}
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={handleEndGame}
                  >
                    Stop Session
                  </Button>
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
                  {answers.map((obj: { answer: { content: unknown; isCorrect: boolean; }; }, index: React.Key) => {
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
                          {renderColorAnswer(obj.answer.content as string)}
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
              <div className="flex flex-row justify-evenly items-center">
                <div className="flex flex-col items-center py-4 mt-10">
                  <Badge badgeContent={timeLimit} color="secondary">
                    <AccessTimeFilledIcon color='primary' fontSize='large' />
                  </Badge>
                </div>
                {/* Title & Buttons */}
                <div className="flex flex-row justify-evenly">
                  <div className="flex flex-col justify-center items-center ml-16">
                    <div className="bg-nav-blue text-black py-2 px-4 rounded-lg max-w-[400px]">
                      <h1 className="mt-[1%] text-2xl font-medium
                        lg:mt-0 lg:mb-0 lg:text-3xl 2xl:mt-[2%] 2xl:text-3xl">
                        {title}
                      </h1>
                    </div>
                    <MediaComponent media={media} />
                  </div>
                </div>
                <div className="flex flex-col items-center py-4 mt-10 gap-4">
                  <Typography variant="h6" component="h3">{questionNo} / {totalQuestion}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowForwardIosIcon />}
                    onClick={handleAdvance}
                  >
                    {isDuringQuestion ? 'Skip Question' : 'Next Question'}
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    // startIcon={<ArrowForwardIosIcon />}
                    onClick={handleEndGame}
                  >
                    Stop Session
                  </Button>
                </div>
              </div>
              {/* Answers */}
              <div className="mx-auto md:mt-[25px] lg:mt-[40px]">
                <Grid
                  container
                  spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                  columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                >
                  {answers.map((obj: { answer: { content: unknown; isCorrect: boolean; }; }, index: React.Key) => {
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
                          {renderColorAnswer(obj.answer.content as string)}
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

      {showResultPage && (
        <>
          < SessionAdminResultPage sessionId={sessionId} questionList={questionList} />
        </>
      )}
    </div>
  );
};

export default SessionAdminPage;
