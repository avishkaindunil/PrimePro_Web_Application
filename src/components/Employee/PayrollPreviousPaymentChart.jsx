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
    labels: ["August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Previous Payments",
        data: [62000, 65000, 60000, 65500, 62000],
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
