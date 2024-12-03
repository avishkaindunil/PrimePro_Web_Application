import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Reports = () => {
  const [reports, setReports] = useState([]);

  // Fetch reports from localStorage
  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem("reports")) || [];
    setReports(savedReports);
  }, []);

  // Delete a report
  const handleDeleteReport = (id) => {
    const updatedReports = reports.filter((report) => report.id !== id);
    setReports(updatedReports);
    localStorage.setItem("reports", JSON.stringify(updatedReports));
  };

  // Add a function to simulate report creation (for demo/testing purposes)
  const createDummyReport = () => {
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    const generateRandomChartData = () => {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const startIndex = randomNumber(0, months.length - 6);
      const selectedMonths = months.slice(startIndex, startIndex + 6);
  
      const randomServiceCounts = selectedMonths.map(() => randomNumber(10, 150));
      const randomPieData = Array.from({ length: 3 }, () => randomNumber(20, 80));
      const totalPie = randomPieData.reduce((a, b) => a + b, 0);
  
      return {
        barChartData: {
          labels: selectedMonths,
          datasets: [
            {
              label: "Monthly Services",
              data: randomServiceCounts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        },
        pieChartData: {
          labels: ["Maintainance", "Repair", "CarWash"],
          datasets: [
            {
              data: randomPieData.map((value) => Math.round((value / totalPie) * 100)),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
      };
    };
  
    const newReport = {
      id: Date.now(),
      title: `Report ${reports.length + 1}`,
      startDate: `2024-${randomNumber(1, 6).toString().padStart(2, "0")}-01`,
      endDate: `2024-${randomNumber(7, 12).toString().padStart(2, "0")}-01`,
      serviceType: `Service ${String.fromCharCode(65 + randomNumber(0, 2))}`,
      ...generateRandomChartData(),
      generatedAt: new Date().toLocaleString(),
    };
  
    const updatedReports = [...reports, newReport];
    setReports(updatedReports);
    localStorage.setItem("reports", JSON.stringify(updatedReports));
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Saved Reports</h1>

      {/* Dummy Report Generator Button */}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={createDummyReport}
      >
        Create Dummy Report
      </button>

      {reports.length === 0 ? (
        <p>No reports found. Generate some reports to display!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white p-4 shadow rounded flex flex-col"
            >
              <h2 className="text-lg font-semibold mb-2">{report.title}</h2>
              <p>
                <strong>Date Range:</strong> {report.startDate} to{" "}
                {report.endDate}
              </p>
              <p>
                <strong>Service Type:</strong> {report.serviceType}
              </p>
              <p>
                <strong>Generated On:</strong> {report.generatedAt}
              </p>

              {/* Bar Chart Preview */}
              <div className="mt-4">
                <h3 className="font-medium">Bar Chart</h3>
                <Bar data={report.barChartData} />
              </div>

              {/* Pie Chart Preview */}
              <div className="mt-4">
                <h3 className="font-medium">Pie Chart</h3>
                <Pie data={report.pieChartData} />
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleDeleteReport(report.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;

