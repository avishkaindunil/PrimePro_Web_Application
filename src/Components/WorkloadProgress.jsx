import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function WorkloadProgress() {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Workload',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(20, 110, 227, 0.5)',
        borderColor: 'rgba(20, 110, 227, 1)',
        borderWidth: 1,
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
      <h3 className="text-lg font-medium mb-4">Workload Progress</h3>
      <div className="h-50">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default WorkloadProgress;