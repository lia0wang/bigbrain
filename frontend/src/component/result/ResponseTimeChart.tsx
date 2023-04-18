import LoadingPage from 'page/LoadingPage';
import React from 'react';
import ResultLineChart from './ResultLineChart';

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
    questionStartedAt: string | null;
    answeredAt: string | null;
    answerIds: string[];
    correct: boolean;
  }[];
}

const ResponseTimeChart: React.FC<{
    adminResult: UserAnswer[],
    questionList: Array<{ question: Question }>,
}> = ({
  adminResult,
  questionList,
}) => {
  if (adminResult === null) {
    return < LoadingPage />;
  }

  if (adminResult.length === 0) {
    return <h1>No players</h1>;
  }

  const map = new Map();
  adminResult.forEach(player => {
    player.answers.reduce((acc, ans, i) => {
      if (ans.answeredAt && ans.questionStartedAt) {
        const question = questionList[i];
        const time = new Date(ans.answeredAt).getTime() - new Date(ans.questionStartedAt).getTime();
        map.set(`Q${i + 1}`, (map.get(question.question.title) || 0) + time / 1000);
      }
      return acc;
    }, 0);
  });

  const totalPlayers = adminResult.length;
  map.forEach((value, key) => {
    map.set(key, value / totalPlayers);
  });

  const labels = Array.from(map.keys());
  const data = Array.from(map.values());

  return (
    <>
        <ResultLineChart labelArray={labels} dataArray={data} labelName="Time (s)" title="Avg. Response Time" />
    </>
  );
}

export default ResponseTimeChart;
