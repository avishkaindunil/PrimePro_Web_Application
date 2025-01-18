// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import axios from 'axios';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function WorkloadProgress() {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/booking/weekly-progress');
//         const data = response.data.data;

//         // If the backend doesn't provide sorted data, ensure the days are in the correct order
//         const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//         const labels = daysOfWeek;
//         const values = labels.map(day => data[day] || 0); // Default to 0 if no data for a specific day

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: 'Bookings',
//               data: values,
//               backgroundColor: 'rgba(20, 110, 227, 0.5)',
//               borderColor: 'rgba(20, 110, 227, 1)',
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   if (!chartData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 w-full">
//       <h3 className="text-lg font-medium mb-4">Amount of service bookings for this week</h3>
//       <div className="h-50 w-full">
//         <Bar data={chartData} options={options} />
//       </div>
//     </div>
//   );
// }

// export default WorkloadProgress;

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function WorkloadProgress() {
  const [chartData, setChartData] = useState(null);
  const [filter, setFilter] = useState('week'); // Default filter set to "week"

  // Function to fetch data based on the filter
  const fetchData = (filter) => {
    axios.get(`http://localhost:8080/booking/progress?filter=${filter}`)
      .then(response => {
        const data = response.data.data;
        const labels = Object.keys(data); // Days for weekly, months for monthly
        const values = Object.values(data); // Counts of bookings

        setChartData({
          labels,
          datasets: [
            {
              label: filter === 'week' ? 'Bookings (Weekly)' : 'Bookings (Monthly)',
              data: values,
              backgroundColor: 'rgba(20, 110, 227, 0.5)',
              borderColor: 'rgba(20, 110, 227, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  // Fetch weekly data by default on initial render
  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!chartData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h3 className="text-lg font-medium mb-4">Booking Progress</h3>

      {/* Filter Buttons */}
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 rounded-l ${filter === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('week')}
        >
          Weekly
        </button>
        <button
          className={`px-4 py-2 rounded-r ${filter === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('month')}
        >
          Monthly
        </button>
      </div>

      {/* Chart */}
      <div className="h-50 w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default WorkloadProgress;
