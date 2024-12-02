import { Line } from "react-chartjs-2";
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

// Register components
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
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Tasks",
        data: [30, 50, 35, 30, 29, 45],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center h-full bg-white rounded-lg p-4">
      <div>
        <h2 className="text-left text-2xl font-bold pb-4">Total Tasks Completed for Past 5 Months</h2>
      </div>

      <div className="w-full max-w-2xl">
        <Line data={data} />
      </div>
    </div>
  );
};

export default DashboardChart;
