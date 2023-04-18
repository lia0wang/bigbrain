import React, { useEffect, useState } from 'react';
import ResultLineChart from '../../component/result/ResultLineChart';
import apiRequest from '../../util/api';

const SessionPlayerResultPage: React.FC<{
  playerId: string,
  pointsList: number[],
  questionIdList: string[],
}> = ({
  playerId,
  pointsList,
  questionIdList,
}) => {
  const [playerResult, setPlayerResult] = useState(null);

  useEffect(() => {
    const fetchPlayerResult = async () => {
      const response = await apiRequest('GET', `/play/${playerId}/results`);
      pointsList.forEach((point, index) => {
        response[index].questionId = questionIdList[index];
        response[index].correct
          ? response[index].point = point
          : response[index].point = 0;
      });
      setPlayerResult(response);
    }
    fetchPlayerResult();
  }, []);

  const labels = playerResult?.map((result: { questionId: string; }) => result.questionId);
  const data = playerResult?.map((result: { point: number; }) => result.point);

  return (
        <>
            <ResultLineChart labelArray={labels} dataArray={data} labelName="Points" title="Your Performance" />
        </>
  );
}

export default SessionPlayerResultPage;
