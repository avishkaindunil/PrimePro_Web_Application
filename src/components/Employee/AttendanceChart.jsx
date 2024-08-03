import { Doughnut } from "react-chartjs-2";
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
  // Data for the chart
  const data = {
    labels: ["Total Working Hours", "Time Off"],
    datasets: [
      {
        data: [25, 5],
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
        position: 'top',
      },
      title: {
        display: true,
        text: 'Working Days Distribution',
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AttendanceChart;
