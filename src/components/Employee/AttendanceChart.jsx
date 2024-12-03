import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getTotalWorkHoursAndOverTimeByEmployeeIdAndMonth } from "./../../api/attendanceApiCalls";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AttendanceChart = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data: attendanceData } =
          await getTotalWorkHoursAndOverTimeByEmployeeIdAndMonth(
            storedUserData.employeeId
          );
        setAttendance(attendanceData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task count:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [storedUserData.employeeId]);

  const data = {
    labels: ["Total Working Hours", "Total Overtime Hours"],
    datasets: [
      {
        data: [attendance.totalWorkHours, attendance.totalOvertimeHours],
        backgroundColor: ["#549CFD", "#000000"],
        hoverBackgroundColor: ["#549CFD", "#000000"],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize with the page
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Working Days Distribution",
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AttendanceChart;
