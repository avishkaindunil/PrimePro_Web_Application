import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function EmployeePerformanceChart() {
  // Sample Data (replace with real data from your backend or state)
  const data = {
    labels: ["Alice", "Bob", "Charlie", "Diana", "Eve"], // Employee Names
    datasets: [
      {
        label: "Tasks Completed",
        data: [15, 20, 12, 25, 18], // Number of tasks per employee
        backgroundColor: [
          "#4CAF50",
          "#FF9800",
          "#2196F3",
          "#F44336",
          "#9C27B0",
        ], // Different colors for each bar
      },
    ],
  };

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
        grid: { color: "#e0e0e0" },
        beginAtZero: true, // Start Y-axis at 0
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">Employee Performance Per Month</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default EmployeePerformanceChart;
