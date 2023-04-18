import React, { useEffect, useState } from 'react';
import apiRequest from '../../util/api';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import RankingBoard from '../../component/result/RankingBoard';
import QuestionAccuracyChart from '../../component/result/QuestionAccuracyChart';
import ResponseTimeChart from '../../component/result/ResponseTimeChart';

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

const SessionAdminResultPage: React.FC<{
  sessionId: string,
  questionList: Array<{ question: Question }>,
}> = ({
  sessionId,
  questionList
}) => {
  const [adminResult, setAdminResult] = useState(null);
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchAdminResult = async () => {
      const response = await apiRequest('GET', `/admin/session/${sessionId}/results`);
      if (response.error) {
        return;
      }
      console.log('response', response);
      setAdminResult(response);
    }
    fetchAdminResult();
  }, [sessionId]);

  return (
      <>
        <Box className="w-full mt-24">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Top Scorers Leaderboard" />
            <Tab label="Worst Scorers Leaderboard" />
            <Tab label="Question Accuracy Over Time" />
            <Tab label="Response Time Analysis" />
          </Tabs>
        </Box>
        {value === 0 && (
          <RankingBoard adminResult={adminResult} questionList={questionList} reverse={false} />
        )}
        {value === 1 && (
          <RankingBoard adminResult={adminResult} questionList={questionList} reverse={true} />
        )}
        {value === 2 && (
          <QuestionAccuracyChart adminResult={adminResult} questionList={questionList} />
        )}
        {value === 3 && (
          <ResponseTimeChart adminResult={adminResult} questionList={questionList} />
        )}
      </>
  );
}

export default SessionAdminResultPage;
