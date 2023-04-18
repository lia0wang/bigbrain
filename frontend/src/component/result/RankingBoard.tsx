import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LoadingPage from '../../page/LoadingPage';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  title: string;
  media: string;
  type: 'single' | 'multi';
  timeLimit: number;
  point: number;
  answers: Array<{ answer: Answer }>;
}

interface UserAnswer {
  name: string;
  answers: {
    questionStartedAt: Date | null;
    answeredAt: Date | null;
    answerIds: string[];
    correct: boolean;
  }[];
}

const RankingBoard: React.FC<{
    adminResult: UserAnswer[],
    questionList: Array<{ question: Question }>,
    reverse: boolean,
}> = ({
  adminResult,
  questionList,
  reverse
}) => {
  if (adminResult === null) {
    return < LoadingPage />;
  }

  if (adminResult.length === 0) {
    return <h1>No players</h1>;
  }

  const getPlayerToPointMap = adminResult.map(player => {
    const point = player.answers.reduce((acc, ans, i) => {
      const question = questionList[i];
      const isCorrect = ans.correct;
      const point = question.question.point;
      return isCorrect ? acc + point : acc;
    }, 0);
    return { name: player.name, point };
  });

  const sortedPlayers = reverse
    ? getPlayerToPointMap.sort((a, b) => a.point - b.point)
    : getPlayerToPointMap.sort((a, b) => b.point - a.point);

  return (
    <>
      <TableContainer component={Paper}
      className="mt-8 mx-auto max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Ranking #</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Points</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.point}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default RankingBoard;
