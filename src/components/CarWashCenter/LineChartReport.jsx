import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartReport = (props) => {
  const report = props.reportType;

  // Generate the date range from `reportType.from` to `reportType.to`
  const generateDateRange = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const dates = [];

    // Generate dates between the start and end date
    let currentDate = start;
    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      dates.push(currentDate.format('YYYY-MM-DD')); // Format date as 'YYYY-MM-DD'
      currentDate = currentDate.add(1, 'day');
    }

    return dates;
  };

  // Get the list of dates for the x-axis (labels)
  const labels = generateDateRange(report.from, report.to);

  // Generate some mock data for the number of bookings per day (replace with actual data fetching logic)
  const bookingsData = labels.map((label) => Math.floor(Math.random() * 10) + 1); // Random number of bookings

  const data = {
    labels: labels, // Dates as x-axis labels
    datasets: [
      {
        label: 'Bookings',
        data: bookingsData, // Data for the y-axis (bookings per day)
        backgroundColor: 'rgba(20, 110, 227, 0.5)',
        borderColor: 'rgba(20, 110, 227, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Bookings: ${context.raw}`; // Custom tooltip for the data
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-4 text-lg font-medium">Task Distribution</h3>
        <div className="h-50">
          <Line data={data} options={options} />
        </div>
      </div>
      {/* Display the report type */}
      <p className="mt-4 text-center">Report Type: {report.type}</p>
    </div>
  );
};

export default LineChartReport;
