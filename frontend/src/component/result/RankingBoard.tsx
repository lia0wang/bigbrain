import React from 'react';

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

interface UserAnswers {
    name: string;
    answers: {
      questionStartedAt: Date | null;
      answeredAt: Date | null;
      answerIds: string[];
      correct: boolean;
    }[];
}

interface AdminResult {
    results: UserAnswers[];
}

const RankingBoard: React.FC<{
    adminResult: AdminResult,
    questionList: Array<{ question: Question }>,
    reverse: boolean,
}> = ({
  adminResult,
  questionList,
  reverse
}) => {
  // Calculate total points for each player
//   console.log('adminResult', adminResult);
//   const totalPoints = adminResult.results.map(player => {
//     const point = player.answers.reduce((acc, ans, i) => {
//       const question = questionList.question[i];
//       const isCorrect = ans.correct;
//       const point = question.point;
//       return isCorrect ? acc + point : acc;
//     }, 0);
//     return { name: player.name, point };
//   });

  //   // Sort players by total points
  //   const sortedPlayers = totalPoints.sort((a, b) => b.point - a.point);

  //   // Display top 5 players
  //   console.log('Ranking Board:');
  //   console.log('--------------');
  //   sortedPlayers.slice(0, 5).forEach((player, i) => {
  //     console.log(`${i + 1}. ${player.name}: ${player.point} points`);
  //   });

  console.log('adminResult', adminResult);
  adminResult.results.forEach(player => {
    console.log('player', player);
  });
  console.log('questionList', questionList);
  for (let i = 0; i < questionList.length; i++) {
    console.log('question', questionList[i].question);
  }

  const totalPoints = adminResult.results.map(player => {
    const point = player.answers.reduce((acc, ans, i) => {
      const question = questionList[i].question;
      const point = question.point;
      const isCorrect = ans.correct;
      return isCorrect ? acc + point : acc;
    }, 0);
    return { name: player.name, point };
  });

  const sortedPlayers = reverse ? totalPoints.sort((a, b) => a.point - b.point) : totalPoints.sort((a, b) => b.point - a.point);

  return (
    <>
        <h1>RankingBoard</h1>
        <pre> reverse: {JSON.stringify(reverse, null, 2)} </pre>
        <pre> adminResult: {JSON.stringify(adminResult, null, 2)} </pre>
        <pre> questionList: {JSON.stringify(questionList, null, 2)} </pre>
    </>
  );
}

export default RankingBoard;
