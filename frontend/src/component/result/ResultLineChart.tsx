import React from 'react';
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

const ResultLineChart: React.FC<{
  labelArray: string[],
  dataArray: number[],
  labelName: string,
  title: string,
}> = ({
  labelArray,
  dataArray,
  labelName,
  title,
}) => {
  const data = {
    labels: labelArray,
    datasets: [
      {
        label: labelName,
        data: dataArray,
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
        text: title,
      },
    },
  };

  return (
  <>
  <div className="bg-sky-100 mt-24 md:mt-24 lg:mt-24">
      <div className="flex flex-row items-center justify-start w-3/4 h-3/4 mx-auto mt-[-5%]">
          <Bar data={data} options={options} />
        </div>
    </div>
  </>
  );
}

export default ResultLineChart;
