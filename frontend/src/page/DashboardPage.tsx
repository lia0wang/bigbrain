import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../component/dashboard/Navbar';
import GameCard from '../component/dashboard/GameCard';

const DashboardPage: React.FC = () => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar pageType='Dashboard' />
      <div className="bg-sky-100 w-screen flex flex-col content-center justify-center py-20">
        <Box className="flex-grow mt-[20px] mx-auto" sx={{ maxWidth: 1200 }}>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }} columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}>
            {Array.from(Array(20)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} className="flex justify-center items-center">
                <GameCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default DashboardPage;
