import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';
import axios from 'axios';
import { publicAuthRequest } from '../../constants/requestMethods';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartReport = ({ reportType }) => {
  const [labels, setLabels] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [error, setError] = useState('');
  const centerName = localStorage.getItem('CENTER'); // Get center name from localStorage

  const validateDates = () => {
    const fromDate = dayjs(reportType.from);
    const toDate = dayjs(reportType.to);

    // Check if the date range is valid
    if (!fromDate.isValid() || !toDate.isValid()) {
      setError('Invalid date format. Please use YYYY-MM-DD.');
      return false;
    }

    if (fromDate.isAfter(toDate)) {
      setError("'From' date cannot be after 'To' date.");
      return false;
    }

    setError('');
    return true;
  };

  // Function to fetch data and process it
  const fetchData = async () => {
    if (!validateDates()) return; // Exit if validation fails

    try {
      const response = await publicAuthRequest.get('/centerAdmin/get-all-bookings');
      const bookings = response.data;

      // Filter bookings by center name
      // const filteredBookings = bookings.filter((booking) => booking.centerName === centerName);
      const filteredBookings = bookings;

      // Generate the date range from `reportType.from` to `reportType.to`
      const generateDateRange = (startDate, endDate) => {
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        const dates = [];
        let currentDate = start;

        while (currentDate.isBefore(end) || currentDate.isSame(end)) {
          dates.push(currentDate.format('YYYY-MM-DD')); // Format date as 'YYYY-MM-DD'
          currentDate = currentDate.add(1, 'day');
        }

        return dates;
      };

      const dateRange = generateDateRange(reportType.from, reportType.to);

      // Count the number of bookings for each day (filtered by center name)
      const bookingsCount = dateRange.map((date) => {
        return filteredBookings.filter((booking) => booking.date === date).length;
      });

      setLabels(dateRange);
      setBookingsData(bookingsCount);
    } catch (error) {
      console.error('Error fetching booking data:', error);
      setError('Failed to fetch data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [reportType]);

  const data = {
    labels, // Dates as x-axis labels
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
        {error && <p className="mb-4 text-red-500">{error}</p>} {/* Display validation error */}
        <div className="h-50">
          {!error && <Line data={data} options={options} />} {/* Render chart only if no error */}
        </div>
      </div>
      {/* Display the report type */}
      <p className="mt-4 text-center">Report Type: {reportType.type}</p>
    </div>
  );
};

export default LineChartReport;
