import { Grid, Input } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Navbar from '../component/dashboard/Navbar';
import GameCard from '../component/dashboard/GameCard';
import apiRequest from '../util/api';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const DashboardPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showNewGameModal, setShowNewGameModal] = useState(true);

  const navigate = useNavigate();
  const goToSessionAdminPage = () => {
    navigate(`/session/${sessionId}`);
  };

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
              {gameList && (gameList
                .sort((gameA, gameB) => new Date(gameB.createdAt).getTime() - new Date(gameA.createdAt).getTime())
                .map((game, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <GameCard title={game.name} thumbnail={game.thumbnail} id={game.id} active={game.active}/>
                  </Grid>
                )))}
            </Grid>
          </Box>
        </div>
      </>
          )
        : (
            <>
            {showNewGameModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-md shadow-lg w-[370px]">
                <div className="flex flex-row justify-between">
                  <h2 className="text-2xl mb-4 text-center">Input Session ID</h2>
                  <CloseIcon className="cursor-pointer" onClick={() => setShowNewGameModal(false)} />
                </div>
                <div className="bg-gray-100 p-2 rounded-lg mb-4 flex justify-center">
                  <Input placeholder='Example: 902663' className="w-[300px]" type="text" onChange={(e) => setSessionId(e.target.value)} />
                </div>
                <div className="flex flex-row justify-around mt-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 w-[300px]
                                border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
                    type="button"
                    onClick={goToSessionAdminPage}>
                    GO TO SESSION PAGE
                  </button>
                </div>
                </div>
              </div>
            )}
          </>
          )}
    </>
  );
};

export default DashboardPage;
