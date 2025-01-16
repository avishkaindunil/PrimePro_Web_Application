import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { publicAuthRequest } from '../../constants/requestMethods';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function TaskDistribution() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchTaskDistribution = async () => {
      try {
        const response = await publicAuthRequest.get(`/centerAdmin/get-task-distribution`);
        console.log(response.data);

        // Prepare data for the chart
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const taskCounts = Array(7).fill(0); // Initialize an array with 7 zeros (one for each day)

        response.data.forEach((item) => {
          const dayIndex = daysOfWeek.findIndex(day => day.trim() === item.dayOfWeek.trim());
          if (dayIndex >= 0) {
            taskCounts[dayIndex] = item.completedTaskCount;
          }
        });

        setChartData({
          labels: daysOfWeek,
          datasets: [
            {
              label: 'Completed Tasks',
              data: taskCounts,
              backgroundColor: "#2196F3",
              borderColor: 'rgba(20, 110, 227, 1)',
              borderWidth: 1,
              fill: true, // This enables the area under the line to be filled
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching task distribution", error);
      }
    };

    fetchTaskDistribution();
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">Task Distribution</h3>
      <div className="h-50">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default TaskDistribution;

