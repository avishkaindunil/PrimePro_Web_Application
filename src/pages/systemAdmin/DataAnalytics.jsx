

import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "chart.js/auto";
import Swal from "sweetalert2";
import { format, addMonths, startOfMonth } from "date-fns";

const DataAnalytics = () => {
  // States
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [branch, setBranch] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [chartData, setChartData] = useState({
    repairStatsData: { labels: [], datasets: [], title: "" },
    serviceStatsData: { labels: [], datasets: [], title: "" },
  });

  // Dummy data for demonstration
  const dummyData = {
    repairStats: [
      { month: "2024-01", repairs: 10, branch: "Branch Matara", service: "Repair" },
      { month: "2024-02", repairs: 15, branch: "Branch Colombo", service: "Repair" },
      { month: "2024-03", repairs: 8, branch: "Branch Kandy", service: "Maintenance" },
      { month: "2024-04", repairs: 12, branch: "Branch Galle", service: "Carwash" },
      { month: "2024-05", repairs: 18, branch: "Branch Matara", service: "Maintenance" },
      { month: "2024-06", repairs: 14, branch: "Branch Colombo", service: "Repair" },
      { month: "2024-07", repairs: 20, branch: "Branch Colombo", service: "Carwash" },
      { month: "2024-08", repairs: 10, branch: "Branch Kandy", service: "Maintenance" },
      { month: "2024-09", repairs: 13, branch: "Branch Galle", service: "Repair" },
      { month: "2024-10", repairs: 16, branch: "Branch Matara", service: "Repair" },
      { month: "2024-11", repairs: 22, branch: "Branch Colombo", service: "Carwash" },
      { month: "2024-12", repairs: 19, branch: "Branch Kandy", service: "Maintenance" },
      { month: "2025-01", repairs: 25, branch: "Branch Galle", service: "Repair" },
      { month: "2025-02", repairs: 30, branch: "Branch Matara", service: "Carwash" },
    ],
  };

  // Helper: Generate month labels between start and end date
  const getMonthsBetweenDates = (start, end) => {
    const result = [];
    let current = startOfMonth(start);
    while (current <= end) {
      result.push(format(current, "MMM yyyy"));
      current = addMonths(current, 1);
    }
    return result;
  };

  // Update chart data when filters change
  useEffect(() => {
    fetchChartData();
  }, [startDate, endDate, branch, serviceType]);

  const fetchChartData = () => {
    // Get dynamic month labels
    const monthLabels =
      startDate && endDate ? getMonthsBetweenDates(startDate, endDate) : [];

    // Filter data based on date range and other filters
    const filteredRepairStats = dummyData.repairStats.filter((data) => {
      const dataDate = new Date(`${data.month}-01`);
      const inDateRange =
        (!startDate || dataDate >= startDate) &&
        (!endDate || dataDate <= endDate);
      const matchesBranch = !branch || data.branch === branch;
      const matchesService = !serviceType || data.service === serviceType;
      return inDateRange && matchesBranch && matchesService;
    });

    // Aggregate repairs by month
    const repairStatsValues = monthLabels.map((label) => {
      const month = format(new Date(label), "yyyy-MM");
      const repairsInMonth = filteredRepairStats
        .filter((data) => data.month === month)
        .reduce((sum, data) => sum + data.repairs, 0);
      return repairsInMonth;
    });

    // Aggregate service stats for Pie Chart
    const serviceStats = filteredRepairStats.reduce((acc, data) => {
      acc[data.service] = (acc[data.service] || 0) + data.repairs;
      return acc;
    }, {});

    const serviceStatsLabels = Object.keys(serviceStats);
    const serviceStatsValues = Object.values(serviceStats);

    const repairStatsTitle =
      serviceType === "Repair"
        ? "Repair Statistics"
        : serviceType === "Maintenance"
        ? "Maintenance Statistics"
        : "Overall Repair & Maintenance Statistics";

    const serviceStatsTitle = "Service Distribution";

    setChartData({
      repairStatsData: {
        labels: monthLabels,
        datasets: [
          {
            label: "Servcies Completed",
            data: repairStatsValues,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
        title: repairStatsTitle,
      },
      serviceStatsData: {
        labels: serviceStatsLabels,
        datasets: [
          {
            label: "Services",
            data: serviceStatsValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
            ],
          },
        ],
        title: serviceStatsTitle,
      },
    });
  };

  const generateReport = () => {
    Swal.fire({
      icon: "success",
      title: "Report Generated Successfully",
      text: "Your report has been generated. Visit the Reports Page to view it!",
      confirmButtonText: "OK",
      timer: 3000,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Data Analytics</h1>

      {/* Filters Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-2">Date Range</label>
            <div className="flex space-x-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="p-2 border rounded"
                placeholderText="Start Date"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                className="p-2 border rounded"
                placeholderText="End Date"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Branch Location</label>
            <select
              className="w-full p-2 border rounded"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              <option value="Branch Matara">Branch Matara</option>
              <option value="Branch Colombo">Branch Colombo</option>
              <option value="Branch Kandy">Branch Kandy</option>
              <option value="Branch Galle">Branch Galle</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Service Type</label>
            <select
              className="w-full p-2 border rounded"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="">All Services</option>
              <option value="Repair">Repair</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Carwash">CarWash</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-4">
            {chartData.repairStatsData.title}
          </h3>
          <Bar data={chartData.repairStatsData} />
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-4">
            {chartData.serviceStatsData.title}
          </h3>
          <Pie data={chartData.serviceStatsData} />
        </div>
      </div>

      {/* Generate Report */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Generate Reports</h3>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={generateReport}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default DataAnalytics;




