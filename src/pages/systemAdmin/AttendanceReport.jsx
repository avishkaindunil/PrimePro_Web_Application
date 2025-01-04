import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const AttendanceReport = () => {
  const [attendanceSummary, setAttendanceSummary] = useState({});
  const [leaveSummary, setLeaveSummary] = useState({});
  const [filters, setFilters] = useState({ dateRange: "", employeeId: "" });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch attendance summary from backend
  const fetchAttendanceSummary = () => {
    axios
      .get("http://localhost:8080/reports/attendance-summary", { params: filters })
      .then((res) => setAttendanceSummary(res.data))
      .catch((err) => console.error("Error fetching attendance data:", err));
  };

  // Fetch leave usage summary from backend
  const fetchLeaveUsageSummary = () => {
    axios
      .get("http://localhost:8080/leave-usage-summary")
      .then((response) => setLeaveSummary(response.data))
      .catch((error) => console.error("Error fetching leave usage summary:", error));
  };

  useEffect(() => {
    fetchAttendanceSummary();
    fetchLeaveUsageSummary();
    setIsLoading(false);
  }, [filters]);

  // Data for leave usage chart
  const leaveChartData = {
    labels: ["Annual Leaves", "Casual Leaves", "Medical Leaves"],
    datasets: [
      {
        label: "Leave Usage",
        data: [
          leaveSummary.totalAnnualLeaves || 0,
          leaveSummary.totalCasualLeaves || 0,
          leaveSummary.totalMedicalLeaves || 0,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance & Leave Overview</h1>

      {/* Filters Section */}
      <div className="mb-4">
        <label className="block mb-2">
          Date Range:
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="YYYY-MM-DD to YYYY-MM-DD"
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          />
        </label>
        <label className="block mb-2">
          Employee ID:
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Employee ID"
            value={filters.employeeId}
            onChange={(e) => setFilters({ ...filters, employeeId: e.target.value })}
          />
        </label>
        <button
          onClick={() => {
            setIsLoading(true);
            fetchAttendanceSummary();
            fetchLeaveUsageSummary();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Attendance Summary */}
          <div className="mb-6 bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Attendance Summary</h2>
            <p>
              <strong>Total Days:</strong> {attendanceSummary.totalDays || 0}
            </p>
            <p>
              <strong>Present Days:</strong> {attendanceSummary.presentDays || 0}
            </p>
            <p>
              <strong>Attendance Percentage:</strong>{" "}
              {attendanceSummary.attendancePercentage?.toFixed(2) || 0}%
            </p>
          </div>

          {/* Leave Usage Summary */}
          <div className="mb-6 bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Leave Usage Summary</h2>
            <div className="mb-4">
              <Bar
                data={leaveChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Leave Usage Breakdown",
                    },
                  },
                }}
              />
            </div>
            <p>
              <strong>Total Employees:</strong> {leaveSummary.totalEmployees || 0}
            </p>
            <p>
              <strong>Total Annual Leaves:</strong> {leaveSummary.totalAnnualLeaves || 0}
            </p>
            <p>
              <strong>Total Casual Leaves:</strong> {leaveSummary.totalCasualLeaves || 0}
            </p>
            <p>
              <strong>Total Medical Leaves:</strong> {leaveSummary.totalMedicalLeaves || 0}
            </p>
            <p>
              <strong>Average Annual Leaves:</strong>{" "}
              {leaveSummary.averageAnnualLeaves?.toFixed(2) || 0}
            </p>
            <p>
              <strong>Average Casual Leaves:</strong>{" "}
              {leaveSummary.averageCasualLeaves?.toFixed(2) || 0}
            </p>
            <p>
              <strong>Average Medical Leaves:</strong>{" "}
              {leaveSummary.averageMedicalLeaves?.toFixed(2) || 0}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;

