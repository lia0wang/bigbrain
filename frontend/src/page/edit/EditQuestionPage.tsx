import React from 'react';
import Navbar from '../../component/dashboard/Navbar';
import NotFoundPage from '../NotFoundPage';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const EditQuestionPage: React.FC<{ qNo: string }> = ({ qNo }) => {
  if (Number(qNo) < 1 || Number(qNo) > 6) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }

  return (
    <>
      <Navbar isDashboard={false} isEditQuestionPage={true} />
      <div className="bg-sky-100 w-screen h-screen flex flex-row content-center justify-center py-20">
        <div className="flex flex-col">
          <p>Question Title</p>
          <img src="https://picsum.photos/200/300" alt="Question Image" />
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
        </div>
      </div>
      <></>
    </>
  );
}

export default EditQuestionPage;
