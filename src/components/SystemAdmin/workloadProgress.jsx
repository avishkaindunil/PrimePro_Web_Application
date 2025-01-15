import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function WorkloadProgress() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:8080/booking/weekly-progress')
      .then(response => {
        const data = response.data.data;
        const labels = Object.keys(data);
        const values = Object.values(data);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Services',
              data: values,
              backgroundColor: 'rgba(20, 110, 227, 0.5)',
              borderColor: 'rgba(20, 110, 227, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!chartData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h3 className="text-lg font-medium mb-4">Amount of service bookings for this week</h3>
      <div className="h-50 w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default WorkloadProgress;

