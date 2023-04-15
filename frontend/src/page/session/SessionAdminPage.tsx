import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import apiRequest from '../../util/api';
import React, { useEffect, useState } from 'react';
import { POLLING_INTERVAL } from '../../config';
import LoadingPage from '../LoadingPage';
import { Button, Card, CardContent, List, ListItem, Typography, ListItemText } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import Navbar from '../../component/dashboard/Navbar';

const SessionAdminPage: React.FC = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [quizId, setQuizId] = useState(true);

  if (!sessionId) {
    return <NotFoundPage />;
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await apiRequest('GET', `/admin/session/${sessionId}/status`);
      setPlayers(response.results.players);
      setLoading(false);
    };

    const intervalId = setInterval(fetchPlayers, POLLING_INTERVAL);

    setLoading(true); // Set loading state before the initial fetch
    fetchPlayers(); // Perform an initial fetch

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);

  const handleStartGame = () => {
    // TODO
    // apiRequest('POST', `/admin/quiz/${quizId}/start`);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col content-center">
      <Navbar />
      <div className="container mx-auto px-4 sm:max-w-sm bg-sky-100 min-h-screen">
        <div className="text-center mt-[100px]">
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayArrow />}
            onClick={handleStartGame}
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
    </div>
  );
};

export default SessionAdminPage;
