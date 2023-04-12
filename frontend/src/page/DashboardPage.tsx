import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../component/dashboard/Navbar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const gameCard = (
  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="CardImg"
        height="140"
        image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
      />
      <CardContent className='flex flex-col justify-center items-center'>
        <Typography gutterBottom variant="h5" component="div">
          Game Title
        </Typography>
        <span className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Questions:
          <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            2
          </span>
        </span>
      </CardContent>
      <CardActions className='flex flex-row justify-evenly items-center z-0'>
      {/* <BlueButton text="Edit" onClick={() => {
        // pass your function here
      }} />
      <WhiteButton text="Delete" onClick={() => {
        // pass your function here
      }} /> */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Edit
        </button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Delete
        </button>
      </CardActions>
    </Card>
);

const DashboardPage: React.FC = () => {
  if (!localStorage.getItem('u_token')) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <div className="mt-[10%] mx-[10%]">
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 0, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(20)).map((_, index) => (
            <Grid xs={4} sm={4} md={4} key={index} className='flex justify-center'>
              <Card variant='outlined' className='mx-4'> {gameCard} </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      </div>
    </>
  );
};

export default DashboardPage;
