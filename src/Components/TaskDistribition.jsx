import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function TaskDistribution() {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(20, 110, 227, 0.5)',
        borderColor: 'rgba(20, 110, 227, 1)',
        borderWidth: 1,
        fill: true, // This enables the area under the line to be filled
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">Task Distribution</h3>
      <div className="h-50">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default TaskDistribution;
