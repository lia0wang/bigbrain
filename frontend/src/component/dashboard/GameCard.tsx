import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import WhiteButton from './ButtonWhite';
import apiRequest from '../../util/api';
import { useNavigate } from 'react-router-dom';

const GameCard: React.FC<{
  title: string;
  thumbnail: string;
  id: number;
}> = ({
  title,
  thumbnail,
  id,
}) => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameUseGameId = async () => {
      const response = await apiRequest('GET', `/admin/quiz/${id}`);
      setNumQuestions(response.questions.length);
      setQuestionList(response.questions);
    };
    fetchGameUseGameId();
  }, [id]);

  useEffect(() => {
    const getTotalTime = () => {
      let totalTime = 0;
      questionList.forEach((obj) => {
        totalTime += obj.question.timeLimit;
      });
      return totalTime;
    };
    setTotalTime(getTotalTime());
  }, [questionList]);

  // Default
  if (thumbnail === null) thumbnail = 'https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?compress=1&resize=752x';
  return (
    <Card className='sm:min-w-[200px] md:min-w-[260px] lg:min-w-[280px] xl:min-w-[300] 2xl:min-w-[300px]'>
      <div className="flex flex-row items-center justify-center mt-4">
        <span className="bg-blue-100 text-blue-800 text-base font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-blue-400 mr-1">
          <svg
            aria-hidden="true"
            className="w-3 h-3 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            ></path>
          </svg>
          Time: {totalTime} s
        </span>
        <span className="bg-blue-100 text-blue-800 text-base font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-blue-400 ml-1">
          #Questions
          <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-sm font-semibold text-blue-800 bg-blue-200 rounded-full">
            {numQuestions}
          </span>
        </span>
      </div>
      <CardMedia
        component="img"
        alt="Img"
        height="140"
        image={thumbnail}
        className="p-4"
      />
      <CardContent>
        <div className="flex flex-row items-center justify-center">
            <Typography
              gutterBottom variant="h5" component="div">
              {title}
            </Typography>
        </div>
      </CardContent>
      <CardActions>
        <WhiteButton text="EDIT" onClick={() => {
          navigate(`/game/edit/${id}`);
        }}/>
        <WhiteButton text="DELETE" onClick={() => {
          apiRequest('DELETE', `/admin/quiz/${id}`, { id });
        }} />
      </CardActions>

    </Card>
  );
};

export default GameCard;
