import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Navbar from '../component/dashboard/Navbar';
import GameCard from '../component/dashboard/GameCard';
import apiRequest from '../util/api';

const DashboardPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await apiRequest('GET', '/admin/quiz');
      setGameList(response.quizzes);
    };
    fetchGames();
  }, [gameList]);

  return (
    <>
      <Navbar pageType='Dashboard' />
      {isLoggedIn
        ? (
      <>
        <div className="bg-sky-100 w-screen min-h-screen py-20 px-[2%]">
          <Box className="mt-[20px] mx-[6%] lg:mx-[4%] xl:mx-[2%] 2xl:mx-[0]">
            <Grid container
              spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
              columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
              className="flex flex-row justify-start"
            >
              {gameList
                .sort((gameA, gameB) => new Date(gameB.createdAt).getTime() - new Date(gameA.createdAt).getTime())
                .map((game, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <GameCard title={game.name} thumbnail={game.thumbnail} id={game.id} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </div>
      </>)
        : (<> </>)}
    </>
  );
};

export default DashboardPage;
