import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getLastFiveMonthsData } from "./../../api/taskApiCalls";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data: taskData } = await getLastFiveMonthsData(
          storedUserData.employeeId
        );
        setTasks(taskData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task count:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const lastFiveMonths = [];
  for (let i = 0; i < 5; i++) {
    let monthIndex = (currentMonthIndex - i + 12) % 12;
    let year = currentYear;
    if (monthIndex > currentMonthIndex) {
      year -= 1;
    }
    lastFiveMonths.push({ year, monthIndex });
  }

  const taskCounts = new Array(5).fill(0);
  const lastFiveMonthNames = lastFiveMonths.map(
    (item) => months[item.monthIndex]
  );

  tasks.forEach((task) => {
    lastFiveMonths.forEach((monthData, index) => {
      if (
        task.year === monthData.year &&
        task.monthName === months[monthData.monthIndex]
      ) {
        taskCounts[index] = task.taskCount;
      }
    });
  });

  const data = {
    labels: lastFiveMonthNames.reverse(),
    datasets: [
      {
        label: "Tasks",
        data: taskCounts.reverse(),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center h-full bg-white rounded-lg p-4">
      <div>
        <h2 className="text-left text-2xl font-bold pb-4">
          Total Tasks Completed for Past 5 Months
        </h2>
      </div>

      <div className="w-full max-w-2xl">
        <Line data={data} />
      </div>
    </div>
  );
};

export default DashboardChart;
