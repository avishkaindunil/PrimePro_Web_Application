import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { publicAuthRequest } from '../../constants/requestMethods';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function EmployeePerformanceChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchEmployeePerformance = async () => {
      try {
        const response = await publicAuthRequest.get(`/centerAdmin/get-employee-perform`);
        console.log(response.data);

        // Transform the response data to match the chart format
        const labels = response.data.map((item) => item.employeeName); // Extract employee names
        const data = response.data.map((item) => item.count); // Extract task counts

        // Update chart data
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Tasks Completed",
              data: data,
              backgroundColor: [
                "#4CAF50",
                "#FF9800",
                "#2196F3",
                "#F44336",
                "#9C27B0",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching employee performance data", error);
      }
    };

    fetchEmployeePerformance();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        ticks: {
          stepSize: 1,
        },
        grid: { color: "#e0e0e0" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-lg font-medium">Employee Performance</h3>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

export default EmployeePerformanceChart;

