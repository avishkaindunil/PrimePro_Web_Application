import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportCharts = ({ reportType }) => {
  const [serviceData, setServiceData] = useState({
    labels: ['Loading...'], // Placeholder label
    datasets: [
      {
        data: [100], // Placeholder data
        backgroundColor: ['rgba(220, 220, 220, 0.5)'], // Placeholder color
      },
    ],
  });

  const [error, setError] = useState(''); // State for validation errors
  const centerName = localStorage.getItem('CENTER');

  const validateDates = () => {
    if (!reportType.from || !reportType.to) {
      return 'Both "from" and "to" dates are required.';
    }

    if (!dayjs(reportType.from).isValid() || !dayjs(reportType.to).isValid()) {
      return 'Please enter valid dates.';
    }

    if (dayjs(reportType.from).isAfter(dayjs(reportType.to))) {
      return '"From" date cannot be after "to" date.';
    }

    return ''; // No errors
  };

  const fetchBookingDetails = async () => {
    const validationError = validateDates();
    if (validationError) {
      // Set error and clear chart data
      setError(validationError);
      setServiceData({
        labels: [], // Clear labels
        datasets: [
          {
            data: [], // Clear data
            backgroundColor: [], // Clear colors
          },
        ],
      });
      return;
    }
  
    // Clear chart data before fetching new data
    setServiceData({
      labels: [], // Clear labels
      datasets: [
        {
          data: [], // Clear data
          backgroundColor: [], // Clear colors
        },
      ],
    });
  
    setError(''); // Clear error if validation passes
  
    try {
      const response = await publicAuthRequest.get('/centerAdmin/get-all-bookings');
      const bookings = response.data;
  
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
  
      const dateRange = generateDateRange(reportType.from, reportType.to);
  
      const filteredBookings = bookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        const isInRange = bookingDate >= new Date(reportType.from) && bookingDate <= new Date(reportType.to);
        return booking.centerName === centerName && isInRange;
      });
  
      const serviceTypeCounts = filteredBookings.reduce((acc, booking) => {
        const serviceType = booking.service;
        acc[serviceType] = (acc[serviceType] || 0) + 1;
        return acc;
      }, {});
  
      const labels = Object.keys(serviceTypeCounts);
      const dataValues = Object.values(serviceTypeCounts);
      const backgroundColors = labels.map(() => `hsl(${Math.random() * 360}, 70%, 80%)`);
  
      // Set new data for the chart
      setServiceData({
        labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: backgroundColors.map((color) =>
              color.replace('rgb', 'rgba').replace(')', ', 0.8)')
            ),
          },
        ],
      });
    } catch (error) {
      // Handle error and clear chart data if fetching fails
      console.error('Error fetching data:', error);
      setServiceData({
        labels: [], // Clear labels
        datasets: [
          {
            data: [], // Clear data
            backgroundColor: [], // Clear colors
          },
        ],
      });
      setError('Failed to fetch data. Please try again later.');
    }
  };
  
  useEffect(() => {
    fetchBookingDetails();
  }, [reportType, centerName]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
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
        {error && <p className="mb-4 text-red-500">{error}</p>} {/* Display error */}
        <div className="h-[100%] ml-[250px]">
          <Pie data={serviceData} options={options} />
        </div>
      </div>
      <p className="mt-4 text-center">Report Type: {reportType.type}</p>
    </div>
  );
};

export default ReportCharts;
