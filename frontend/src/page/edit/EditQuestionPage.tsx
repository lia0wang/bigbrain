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
import { Grid } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

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
  const [deviceType, setDeviceType] = useState('');

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

  const addHandler = () => {
    console.log('Add button clicked');
  }

  const saveHandler = () => {
    console.log('Save button clicked');
  }

  const selectHandler = () => {
    console.log('Checkbox clicked');
  }

  const deleteHandler = () => {
    console.log('Delete button clicked');
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
                <ButtonGreen text="Add" onClick={addHandler} />
                <ButtonBlue text="Save" onClick={saveHandler} />
              </div>
            </div>

            {/* Answers */}
            <div className="max-w-[500px] mx-auto mt-6">
              <Grid container
                spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
                columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}>
                  {Array.from({ length: 6 }).map((_, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                        <div className="flex flex-row justify-center
                                        sm:mt-8 md:mt-10">
                          <Input placeholder="Put answer" />
                          <Checkbox onChange={selectHandler} />
                          <DeleteOutline
                          className='cursor-pointer mt-[9px] ml-[-4px]'
                          onClick={deleteHandler}
                          color='primary' />
                        </div>
                      </Grid>
                  ))}
              </Grid>
            </div>
            {/* <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-between">
                <Input placeholder="Placeholder" />
                <Checkbox onChange={selectHandler} />
              </div>
              <div className="flex flex-row justify-between">
                <Input placeholder="Placeholder" />
                <Checkbox onChange={selectHandler} />
              </div>
              <div className="flex flex-row justify-between">
                <Input placeholder="Placeholder" />
                <Checkbox onChange={selectHandler} />
              </div>
              <div className="flex flex-row justify-between">
                <Input placeholder="Placeholder" />
                <Checkbox onChange={selectHandler} />
              </div>
              <div className="flex flex-row justify-between">
                <Input placeholder="Placeholder" />
                <Checkbox onChange={selectHandler} />
              </div>
              <div className="flex flex-row justify-between">
                <Input placeholder="Placeholder" />
                <Checkbox onChange={selectHandler} />
              </div>
            </div> */}
          </div>
        </>
      )}
      {deviceType === 'desktop' && (
        <>
        </>
      )}
    </>
  );
};

export default EditQuestionPage;
