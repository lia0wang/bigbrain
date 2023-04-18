import React, { useEffect, useState } from 'react';
import apiRequest from '../../util/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
        if (response[index].correct) {
          response[index].point = point;
        } else {
          response[index].point = 0;
        }
      });
      setPlayerResult(response);
    }
    fetchPlayerResult();
  }, []);

  const newLabels = playerResult?.map((result: { questionId: string; }) => result.questionId);
  const newData = playerResult?.map((result: { point: number; }) => result.point);

  const data = {
    labels: newLabels,
    datasets: [
      {
        label: 'Points',
        data: newData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Performance'
      },
    },

  };

  return (
        <>
            <div className="bg-sky-100 mt-24 md:mt-24 lg:mt-24">
                <div className="flex flex-col items-center justify-center w-1/2 h-1/2 mx-auto">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </>
  );
}

export default SessionPlayerResultPage;
