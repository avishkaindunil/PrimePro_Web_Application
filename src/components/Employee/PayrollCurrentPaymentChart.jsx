import { Pie } from "react-chartjs-2";
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

const PayrollCurrentPaymentChart = () => {
  // Data for the chart
  const data = {
    labels: ["Salary", "Overtime"],
    datasets: [
      {
        data: [25000, 3000],
        // backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PayrollCurrentPaymentChart;
