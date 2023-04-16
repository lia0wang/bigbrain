import React, { useEffect, useState } from 'react';
import Navbar from '../../component/dashboard/Navbar';
import NotFoundPage from '../NotFoundPage';
import apiRequest, { ApiResponse } from '../../util/api';
import LoadingPage from '../LoadingPage';
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
import { Button, Drawer, Fab, TextField } from '@mui/material';
import { fileToDataUrl } from '../../util/imageHandler';
import AddIcon from '@mui/icons-material/Add';

interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  title: string;
  media: string;
  type: string;
  timeLimit: number;
  point: number;
  answers: Array<{ answer: Answer }>;
}

interface GameApiResponse extends ApiResponse {
  name: string;
  thumbnail: string | null;
  owner: string;
  active: boolean | null;
  questions: Array<{ question: Question }>;
}

const EditQuestionPage: React.FC<{ qId: string; gameId: string }> = ({
  qId,
  gameId,
}) => {
  const [resp, setResp] = useState<GameApiResponse | null>(null);
  const [deviceType, setDeviceType] = useState('');
  const [type, setType] = useState('');
  const [time, setTime] = useState('');
  const [point, setPoint] = useState('');
  const [isMaxAnswers, setIsMaxAnswers] = useState(false);
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState<string | null>(null);
  const [state, setState] = useState({
    right: false,
  });

  const types = new Map([
    ['Single-Select', 'single'],
    ['Multi-Select', 'multi'],
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

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, right: open });
    };

  const list = () => (
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
  );

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
      const question = response.questions.find(
        (question: { question: Question }) => question.question.id === qId
      ).question;
      const defaultMedia =
        'https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?compress=1&resize=752x';
      setTitle(question.title);
      setMedia(question.media === null ? defaultMedia : question.media);
      setType(question.type);
      setPoint(question.point.toString());
      setTime(question.timeLimit.toString());
    };
    fetchData();
  }, [qId]);

  const getQuestionInfo = () => {
    return resp.questions.find((question) => question.question.id === qId)
      .question;
  };

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
  };

  const putAnswerHandler = (id: string, content: string) => {
    const answers = getQuestionInfo().answers;
    const answer = answers.find((obj) => obj.answer.id === id).answer;
    answer.content = content;
    setResp({ ...resp });
  };

  const deleteAnswerHandler = (id: string) => {
    const newAnswers = getQuestionInfo().answers.filter(
      (obj) => obj.answer.id !== id
    );
    resp.questions.find((obj) => obj.question.id === qId).question.answers =
      newAnswers;
    setResp({ ...resp });
  };

  const handleMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const dataUrl = await fileToDataUrl(file as Blob);
      setMedia(dataUrl);
    } else {
      setMedia(null);
    }
  };

  const saveHandler = () => {
    const question = resp.questions.find(
      (obj) => obj.question.id === qId
    ).question;
    question.title = title;
    question.media = media;
    question.type = type;
    question.timeLimit = parseInt(time as string);
    question.point = parseInt(point as string);
    setResp({ ...resp });
    apiRequest('PUT', `/admin/quiz/${gameId}/`, resp);
  };

  const checkboxHandler = (id: string) => {
    const answers = getQuestionInfo().answers;
    answers.forEach((obj) => {
      if (obj.answer.id === id) {
        obj.answer.isCorrect = !obj.answer.isCorrect;
      }
    });
    resp.questions.find((obj) => obj.question.id === qId).question.answers =
      answers;
    setResp({ ...resp });
  };

  return (
    <>
      {deviceType === 'mobile' && (
        <>
          <Navbar pageType="EditQuestion" />
          <div className="bg-sky-100 w-screen h-screen flex flex-col py-20">
            {/* EditButtonDrawer */}
            <div className="flex flex-row justify-end m-2">
              <div>
                <Fab
                  onClick={toggleDrawer(true)}
                  size="small"
                  color="primary"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
                <Drawer
                  anchor={'right'}
                  open={state.right}
                  onClose={toggleDrawer(false)}
                >
                  {list()}
                </Drawer>
              </div>
            </div>

            {/* Title & Buttons */}
            <div className="flex flex-row justify-evenly mt-[-40px]">
              <div className="flex flex-col justify-center items-center">
                <TextField
                  size="small"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={getQuestionInfo().title}
                  label="Title"
                  color="secondary"
                  focused
                />
                <img
                  className="w-[150px] h-[150px] object-cover rounded-[10px] mt-4"
                  src={media} // TODO: Add video support
                />
                <div className="mt-2">
                  <Button variant="contained" component="label" size="small">
                    Upload Media
                    <input type="file" hidden onChange={handleMediaChange} />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-evenly items-center py-4 mt-10">
                <ButtonGreen text="Add" onClick={() => addAnswerHandler()} />
                <ButtonBlue text="Save" onClick={() => saveHandler()} />
              </div>
            </div>

            {/* Answers */}
            <div className="max-w-[500px] mx-auto mt-4">
              <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
              >
                {getQuestionInfo().answers.map((obj, index) => {
                  if (!obj.answer) return null;
                  return (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                      <div
                        className="flex flex-row justify-center min-w-[250px]
                                          sm:mt-8 md:mt-10"
                      >
                        <Input
                          placeholder="Put answer"
                          value={obj.answer.content}
                          onChange={(e) => putAnswerHandler(obj.answer.id, e.target.value)}
                        />
                        <Checkbox
                          checked={obj.answer.isCorrect}
                          onChange={() => checkboxHandler(obj.answer.id)}
                        />
                        <DeleteOutline
                          className="cursor-pointer mt-[9px] ml-[-4px]"
                          onClick={() => deleteAnswerHandler(obj.answer.id)}
                          color="primary"
                        />
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
          <Navbar pageType="EditQuestion" />
          <div className="flex flex-row">
            {/* left screen */}
            <div className="bg-sky-100 w-[70%] h-screen flex flex-col md:py-24 lg:py-24 mt-[20px]">
              {/* Title & Buttons */}
              <div className="flex flex-row justify-evenly">
                <div className="flex flex-col justify-center items-center">
                  <TextField
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={getQuestionInfo().title}
                    label="Title"
                    color="secondary"
                    focused
                  />
                  <img
                    className="md:w-[220px] md:h-[220px]
                    object-cover rounded-[10px] mt-4"
                    src={media} // TODO: Add video support
                  />
                  <div className="mt-4">
                    <Button variant="contained" component="label">
                      Upload Media
                      <input type="file" hidden onChange={handleMediaChange} />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly items-center py-4 mt-10">
                  <ButtonGreen text="Add" onClick={addAnswerHandler} />
                  <ButtonBlue text="Save" onClick={saveHandler} />
                </div>
              </div>

              {/* Answers */}
              <div className="mx-auto md:mt-[25px] lg:mt-[0px] ">
                <Grid
                  container
                  spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                  columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                >
                  {getQuestionInfo().answers.map((obj, index) => {
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
                          <Input
                            placeholder="Put answer"
                            value={obj.answer.content}
                            onChange={(e) => putAnswerHandler(obj.answer.id, e.target.value)}
                          />
                          <Checkbox
                            checked={obj.answer.isCorrect}
                            onChange={() => checkboxHandler(obj.answer.id)}
                          />
                          <DeleteOutline
                            className="cursor-pointer mt-[9px] ml-[-4px]"
                            onClick={() => deleteAnswerHandler(obj.answer.id)}
                            color="primary"
                          />
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </div>
            <div className="bg-white w-[30%] h-screen">{list()}</div>
          </div>
        </>
      )}
      {isMaxAnswers && (
        <AuthErrorPopup error={'Maximum number of answers is 6'} />
      )}
    </>
  );
};

export default EditQuestionPage;
