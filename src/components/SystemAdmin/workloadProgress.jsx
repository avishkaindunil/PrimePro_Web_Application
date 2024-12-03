import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function WorkloadProgress() {
  const data = {
    labels: ['Matara', 'Colombo', 'Kandy', 'Hambantota', 'Kalutara', 'Gampaha', 'Kurunegala'],
    datasets: [
      {
        label: 'Services',
        data: [36,60,34,20,40,67,49],
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
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h3 className="text-lg font-medium mb-4">Amount of service bookings for this week</h3>
      <div className="h-50 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default WorkloadProgress;
