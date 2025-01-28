
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main stylesheet
import "react-date-range/dist/theme/default.css"; // Theme stylesheet
import { format } from "date-fns";

const AttendanceReport = () => {
  const [attendanceSummary, setAttendanceSummary] = useState({});
  const [leaveSummary, setLeaveSummary] = useState({});
  const [filters, setFilters] = useState({ dateRange: "", employeeId: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // Fetch attendance summary from backend
  const fetchAttendanceSummary = () => {
    axios
      .get("http://localhost:8080/reports/attendance-summary", {
        params: filters,
      })
      .then((res) => setAttendanceSummary(res.data))
      .catch((err) => console.error("Error fetching attendance data:", err));
  };

  // Fetch leave usage summary from backend
  const fetchLeaveUsageSummary = () => {
    axios
      .get("http://localhost:8080/reports/leave-usage-summary", {
        params: { employeeId: filters.employeeId || null },
      })
      .then((response) => setLeaveSummary(response.data))
      .catch((error) =>
        console.error("Error fetching leave usage summary:", error)
      );
  };

  useEffect(() => {
    fetchAttendanceSummary();
    fetchLeaveUsageSummary();
    setIsLoading(false);
  }, [filters]);

  // Handle date range selection
  const handleDateRangeChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setSelectedRange({ ...selectedRange, startDate, endDate });

    // Update filters with the formatted date range
    setFilters({
      ...filters,
      dateRange: `${format(startDate, "yyyy-MM-dd")} to ${format(
        endDate,
        "yyyy-MM-dd"
      )}`,
    });
    setShowDatePicker(false); // Close the calendar after selection
  };

  // Data for leave usage chart
  const leaveChartData = {
    labels: ["Annual Leaves", "Casual Leaves", "Medical Leaves"],
    datasets: [
      {
        label: `Leave Usage for ${
          filters.employeeId
            ? `Employee ${filters.employeeId}`
            : "All Employees"
        }`,
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
          <div className="relative">
            <input
              type="text"
              className="border p-2 rounded w-full cursor-pointer"
              value={`${format(
                selectedRange.startDate,
                "yyyy-MM-dd"
              )} to ${format(selectedRange.endDate, "yyyy-MM-dd")}`}
              readOnly
              onClick={() => setShowDatePicker(!showDatePicker)}
            />
            {showDatePicker && (
              <div className="absolute z-10">
                <DateRange
                  ranges={[selectedRange]}
                  onChange={handleDateRangeChange}
                  moveRangeOnFirstSelection={false}
                  editableDateInputs={true}
                />
              </div>
            )}
          </div>
        </label>
        <label className="block mb-2">
          Employee ID:
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Employee ID"
            value={filters.employeeId}
            onChange={(e) =>
              setFilters({ ...filters, employeeId: e.target.value })
            }
          />
        </label>
        <p>Apply Filters</p>
        {/* <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => {
            fetchAttendanceSummary();
            fetchLeaveUsageSummary();
          }}
        >
          Apply Filters
        </button> */}
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
              <strong>Present Days:</strong>{" "}
              {attendanceSummary.presentDays || 0}
            </p>
            <p>
              <strong>Attendance Percentage:</strong>{" "}
              {typeof attendanceSummary.attendancePercentage === "number"
                ? attendanceSummary.attendancePercentage.toFixed(2)
                : "0.00"}
              %
            </p>
          </div>

          {/* Leave Usage Summary */}
          <div className="mb-6 bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Leave Usage Chart</h2>
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
                  scales: {
                    y: {
                      ticks: {
                        beginAtZero: true, // Ensures the y-axis starts at 0
                        precision: 0, // Ensures integer values are displayed
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;