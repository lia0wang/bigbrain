import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import WhiteButton from '../../component/dashboard/WhiteButton';

const GameCard: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <div className="flex flex-row items-center justify-center mt-4">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-blue-400 mr-1">
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
          Time: 200s
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-blue-400 ml-1">
          Questions
          <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            2
          </span>
        </span>
      </div>
      <CardMedia
        component="img"
        alt="Img"
        height="140"
        image="https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?compress=1&resize=752x"
        className="p-4"
      />
      <CardContent>
        <div className="flex flex-row items-center justify-center">
            <Typography gutterBottom variant="h6" component="div">
              Game Title
            </Typography>
        </div>
      </CardContent>
      <CardActions>
        <WhiteButton text="EDIT" onClick={() => {
          // put your code here
        }} />
        <WhiteButton text="DELETE" onClick={() => {
          // put your code here
        }} />
      </CardActions>

    </Card>
  );
};

export default GameCard;
