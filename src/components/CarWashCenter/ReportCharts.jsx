import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';
import { AlignJustify } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate a random pastel color
const generatePastelColor = () => {
  const r = Math.floor(Math.random() * 256); // Red (0-255)
  const g = Math.floor(Math.random() * 256); // Green (0-255)
  const b = Math.floor(Math.random() * 256); // Blue (0-255)

  // To make it a pastel color, we add a constant to each RGB value to keep them light
  return `rgb(${r}, ${g}, ${b})`; // Ensures values are between 150 and 255
};

const ReportCharts = (props) => {
  const report = props.reportType;

  // const [serviceData, setServiceData] = useState([]);
  
  // useEffect(() => {
  //   const fetchServiceData = async () => {
  //     // Assuming you have an API that returns the service data for the date range
  //     const response = await fetch(`/api/getServiceData?from=${report.from}&to=${report.to}`);
  //     const data = await response.json();
  //     setServiceData(data); // Assuming data is in the format { "Car Wash": 10, "Engine Cleaning": 5, ... }
  //   };

  //   fetchServiceData();
  // }, [report.from, report.to]);

  // // Make sure serviceData is populated before rendering the chart
  // if (!serviceData.length) return <div>Loading...</div>;


  // Example function to generate the date range from `reportType.from` to `reportType.to`
  const generateDateRange = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const dates = [];

    let currentDate = start;
    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }

    return dates;
  };

  // Get the list of dates for the x-axis (labels)
  const labels = generateDateRange(report.from, report.to);

  // Example of data to show service types (you can replace this with actual data)
  const serviceTypes = ['Car Wash', 'Engine Cleaning', 'Tire Service', 'Polishing', 'Interior Cleaning'];
  const serviceData = serviceTypes.map(service => {
    // Randomly generate the number of bookings for each service type between the given date range
    const bookings = Math.floor(Math.random() * 10) + 1; // Random bookings count
    return bookings;
  });

  // Generate random pastel colors for each service type
  const backgroundColors = serviceTypes.map(() => generatePastelColor());

  const data = {
    labels: serviceTypes, // Service types as pie chart labels
    datasets: [
      {
        data: serviceData, // Service bookings data
        backgroundColor: backgroundColors, // Random pastel colors for each service type
        hoverBackgroundColor: backgroundColors.map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')), // Slightly darker for hover effect
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left', // Display the legend on the right side
        align: 'right', // Align the legend items at the start
        labels: {
          usePointStyle: true, // Use circle points instead of boxes
          padding: 20, // Add spacing between legend items
        },
      },
      tooltip: {
        font: {
    size: 14,
    weight: 'bold',
  },
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} bookings`;
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="h-[600px] p-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-4 text-lg font-medium">Service Types Distribution</h3>
        <div className="h-[100%] ml-[250px]">
          <Pie data={data} options={options} />
        </div>
      </div>
      <p className="mt-4 text-center">Report Type: {report.type}</p>
    </div>
  );
};

export default ReportCharts;
