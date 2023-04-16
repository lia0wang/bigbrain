import React, { useEffect, useState } from 'react';
import Navbar from '../../component/dashboard/Navbar';
import NotFoundPage from '../NotFoundPage';
import apiRequest, { ApiResponse } from '../../util/api';
import LoadingPage from '../LoadingPage';
import EditButtonDrawer from '../../component/edit/EditButtonDrawer';
import Typography from '@mui/material/Typography';
import ButtonBlue from '../../component/dashboard/ButtonBlue';
import ButtonGreen from '../../component/dashboard/ButtonGreen';
import { isMobileWidth, isDesktopWidth } from '../../util/media';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditFormControl from '../../component/edit/EditFormControl';
import { uid } from 'uid';
import AuthErrorPopup from '../../component/auth/AuthErrorPopup';

interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  title: string;
  media: string;
  type: 'single' | 'multiple';
  timeLimit: number;
  points: number;
  answers: Array<{ answer: Answer }>;
}

interface GameApiResponse extends ApiResponse {
  name: string;
  thumbnail: string | null;
  owner: string;
  active: boolean | null;
  questions: Array<{ question: Question }>;
}

const EditQuestionPage: React.FC<{ qId: string, gameId: string }> = ({ qId, gameId }) => {
  const [resp, setResp] = useState<GameApiResponse | null>(null);
  const [deviceType, setDeviceType] = useState('');
  const [type, setType] = useState('');
  const [time, setTime] = useState('');
  const [point, setPoint] = useState('');
  const [isMaxAnswers, setIsMaxAnswers] = useState(false);
  const [Contents, setContents] = useState(new Map<string, string>());

  const types = new Map([
    ['Multi-Select', 'multi'],
    ['Single-Select', 'single'],
  ]);

  const times = new Map([
    ['5 seconds', '5'],
    ['10 seconds', '10'],
    ['20 seconds', '20'],
    ['30 seconds', '30'],
    ['1 minute', '60'],
  ]);

  const points = new Map([
    ['100 points', '100'],
    ['200 points', '200'],
    ['500 points', '300'],
  ]);

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

  const addAnswerHandler = () => {
    setIsMaxAnswers(false);
    const aId = `answer-${uid()}`;
    const answers = getQuestionInfo().answers;
    console.log(answers.length);
    console.log(isMaxAnswers);
    if (answers.length === 6) {
      setIsMaxAnswers(true);
      return;
    }
    answers.push({
      answer: {
        id: aId,
        content: '',
        isCorrect: false,
      },
    });
    setResp({ ...resp });
    apiRequest('PUT', `/admin/quiz/${gameId}/`, resp);
  }

  const deleteAnswerHandler = (id: string) => {
    const newAnswers = getQuestionInfo().answers.filter((obj) => obj.answer.id !== id);
    resp.questions.find((obj) => obj.question.id === qId).question.answers = newAnswers;
    setResp({ ...resp });
    apiRequest('PUT', `/admin/quiz/${gameId}/`, resp);
  }

  const saveHandler = () => {
    console.log(Contents);
    const answers = getQuestionInfo().answers;
    answers.forEach((obj) => {
      Contents.forEach((value, key) => {
        if (obj.answer.id === key) {
          obj.answer.content = value;
          resp.questions.find((obj) => obj.question.id === qId).question.answers = answers;
          setResp({ ...resp });
        }
      });
    });
    apiRequest('PUT', `/admin/quiz/${gameId}/`, resp);
  }

  // const inputHandler = (id: string, value: string) => {
  //   const answers = getQuestionInfo().answers;
  //   answers.forEach((obj) => {
  //     if (obj.answer.id === id) {
  //       obj.answer.content = value;
  //     }
  //   });
  //   resp.questions.find((obj) => obj.question.id === qId).question.answers = answers;
  // }

  const checkboxHandler = (id: string) => {
    const answers = getQuestionInfo().answers;
    answers.forEach((obj) => {
      if (obj.answer.id === id) {
        obj.answer.isCorrect = !obj.answer.isCorrect;
      }
    });
    resp.questions.find((obj) => obj.question.id === qId).question.answers = answers;
    setResp({ ...resp });
  }

  return (
    <>
      {deviceType === 'mobile' && (
        <>
          <Navbar pageType='EditQuestion' />
          <div className="bg-sky-100 w-screen h-screen flex flex-col py-20">
            {/* EditButtonDrawer */}
            <div className="flex flex-row justify-end m-2">
              <EditButtonDrawer />
            </div>

            {/* Title & Buttons */}
            <div className="flex flex-row justify-evenly mt-[-25px]">
              <div className="flex flex-col justify-center items-center">
                <Typography variant="h6" component="h6" gutterBottom color={'primary'}>
                  {getQuestionInfo().title}
                </Typography>
                <img
                  className='w-[150px] h-[150px] object-cover rounded-[10px]'
                  src={getQuestionInfo().media} // TODO: Add video support
                />
              </div>
              <div className="flex flex-col justify-evenly items-center py-4 mt-10">
                <ButtonGreen text="Add" onClick={() => addAnswerHandler()} />
                <ButtonBlue text="Save" onClick={() => saveHandler()} />
              </div>
            </div>

            {/* Answers */}
            <div className="max-w-[500px] mx-auto mt-12">
              <Grid container
                spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}>
                {getQuestionInfo().answers.map((obj, index) => {
                  if (!obj.answer) return null;
                  return (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                      <div className="flex flex-row justify-center
                                          sm:mt-8 md:mt-10">
                        <Input placeholder="Put answer" value={Contents.get(obj.answer.id)} onChange={(e) => Contents.set(obj.answer.id, e.target.value)} />
                        <Checkbox checked={obj.answer.isCorrect} onChange={() => checkboxHandler(obj.answer.id)} />
                        <DeleteOutline
                          className='cursor-pointer mt-[9px] ml-[-4px]'
                          onClick={() => deleteAnswerHandler(obj.answer.id)}
                          color='primary' />
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </>
      )}
      {deviceType === 'desktop' && (
        <>
          <Navbar pageType='EditQuestion' />
          <div className='flex flex-row'>
            {/* left screen */}
            <div className="bg-sky-100 w-[70%] h-screen flex flex-col md:py-24 lg:py-24 xl:py-32 2xl:py-40">
              {/* Title & Buttons */}
              <div className="flex flex-row justify-evenly">
                <div className="flex flex-col justify-center items-center">
                  <Typography variant="h5" component="h5" gutterBottom color={'primary'}>
                    {getQuestionInfo().title}
                  </Typography>
                  <img
                    className='md:w-[250px] md:h-[250px]
                    object-cover rounded-[10px]'
                    src={getQuestionInfo().media} // TODO: Add video support
                  />
                </div>
                <div className="flex flex-col justify-evenly items-center py-4 mt-10">
                  <ButtonGreen text="Add" onClick={addAnswerHandler} />
                  <ButtonBlue text="Save" onClick={saveHandler} />
                </div>
              </div>

              {/* Answers */}
              <div className="mx-auto md:mt-[25px]">
                <Grid container
                  spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                  columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                      <div className="flex flex-row justify-center
                                      sm:mt-[2px] md:mt-[15px]">
                        <Input className='lg:w-[200px] xl:w-[250px] 2xl:w-[275px]' placeholder="Put answer" />
                        {/* <Checkbox onChange={selectHandler} /> */}
                        <DeleteOutline
                          className='cursor-pointer mt-[9px] ml-[-4px]'
                          // onClick={() => deleteAnswerHandler()}
                          color='primary' />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            <div className="bg-white w-[30%] h-screen">
              <form className="flex flex-col justify-center items-center h-screen">
                <span className="my-[4%]" />
                <h6 className="text-center">Question Type</h6>
                <EditFormControl select={type} setSelect={setType} options={types} />
                <span className="my-[4%]" />
                <h6 className="text-center">Time Limit</h6>
                <EditFormControl select={time} setSelect={setTime} options={times} />
                <span className="my-[4%]" />
                <h6 className="text-center">Points</h6>
                <EditFormControl select={point} setSelect={setPoint} options={points} />
                <span className="my-[4%]" />
              </form>
            </div>
          </div>
        </>
      )}
      {isMaxAnswers && <AuthErrorPopup error={'Maximum number of answers is 6'} />}
    </>
  );
};

export default EditQuestionPage;