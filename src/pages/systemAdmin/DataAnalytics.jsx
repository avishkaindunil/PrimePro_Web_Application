import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const DataAnalytics = () => {
  // Data for the charts
  const repairStatsData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Repairs Completed",
        data: [30, 45, 50, 60, 80],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const branchPerformanceData = {
    labels: ["Branch Matara", "Branch Colombo", "Branch Kandy", "Branch Galle"],
    datasets: [
      {
        label: "Revenue Distribution",
        data: [3000, 4500, 3500, 5000],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  const feedbackTrendsData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Customer Feedback Trends",
        data: [70, 20, 10],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  // Data storage table state
  const [dataStorage, setDataStorage] = useState([
    { name: "Repair Data", size: "2 MB", lastUpdated: "2024-11-01" },
    { name: "Customer Feedback", size: "1 MB", lastUpdated: "2024-11-05" },
    { name: "Revenue Stats", size: "3 MB", lastUpdated: "2024-11-10" },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Data Analytics</h1>

      {/* Filters Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-2">Date Range</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium mb-2">Branch Location</label>
            <select className="w-full p-2 border rounded">
              <option value="">All Branches</option>
              <option value="Branch Matara">Branch Matara</option>
              <option value="Branch Colombo">Branch Colombo</option>
              <option value="Branch Kandy">Branch Kandy</option>
              <option value="Branch Galle">Branch Galle</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Service Type</label>
            <select className="w-full p-2 border rounded">
              <option value="">All Services</option>
              <option value="Repair">Repair</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-4">Repair Statistics</h3>
          <Bar data={repairStatsData} />
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-4">Branch Performance</h3>
          <Pie data={branchPerformanceData} />
        </div>
      </div>
     

      {/* Data Storage Management Section */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="text-lg font-semibold mb-4">Data Storage Management</h3>
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Size</th>
              <th className="border border-gray-300 p-2">Last Updated</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataStorage.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.size}</td>
                <td className="border border-gray-300 p-2">{item.lastUpdated}</td>
                <td className="border border-gray-300 p-2">
                  <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded">
                    Export
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reports Section */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Generate Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Report Type</label>
            <select className="w-full p-2 border rounded">
              <option value="Performance">Performance</option>
              <option value="Customer Trends">Customer Trends</option>
              <option value="Revenue">Revenue</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalytics;
