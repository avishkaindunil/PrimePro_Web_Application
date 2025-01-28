
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const EmployeesReport = () => {
  const [employeeSummaries, setEmployeeSummaries] = useState([]);
  const [salaryData, setSalaryData] = useState({});

  useEffect(() => {
    // Fetch employee data
    axios
      .get("http://localhost:8080/reports/employee-summary")
      .then((res) => setEmployeeSummaries(res.data));
    axios
      .get("http://localhost:8080/reports/salary-summary")
      .then((res) => setSalaryData(res.data));
  }, []);

  const salaryChart = {
    labels: Object.keys(salaryData.salaryBrackets || {}),
    datasets: [
      {
        label: "Number of Employees",
        data: Object.values(salaryData.salaryBrackets || {}),
        backgroundColor: [
          "#4CAF50", // Green
          "#2196F3", // Blue
          "#FFC107", // Amber
          "#FF5722", // Deep Orange
        ],
        borderColor: [
          "#388E3C",
          "#1976D2",
          "#FFA000",
          "#D84315",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700 text-center">
        Employee Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium mb-4 text-gray-600">
            Salary Distribution
          </h2>
          <div className="relative h-96"> {/* Increased height to h-96 */}
            <Bar data={salaryChart} options={chartOptions} />
          </div>
        </div>

        {/* Employee Table Section */}
        <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
          <h2 className="text-lg font-medium mb-4 text-gray-600">
            Employee Details
          </h2>
          <table className="table-auto w-full border text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="px-4 py-2 border">Id</th>
                <th className="px-4 py-2 border">Designation</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Base Salary</th>
              </tr>
            </thead>
            <tbody>
              {employeeSummaries
                .sort((a, b) => a.employeeId - b.employeeId) // Sort in ascending order by employeeId
                .map((employee) => (
                  <tr key={employee.employeeId} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{employee.employeeId}</td>
                    <td className="px-4 py-2 border">{employee.designation}</td>
                    <td className="px-4 py-2 border">{employee.phoneNumber}</td>
                    <td className="px-4 py-2 border">{employee.baseSalary}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesReport;

