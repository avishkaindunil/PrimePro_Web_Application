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

const PayrollPreviousPaymentChart = () => {
  // Sample data for the chart
  const data = {
    labels: ["June", "July", "August", "September", "October", "November"],
    datasets: [
      {
        label: "Previous Payments",
        data: [30000, 42000, 35000, 40000, 35500, 38000],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default PayrollPreviousPaymentChart;
