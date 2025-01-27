

// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';

// function WorkloadProgress() {
//   const [chartData, setChartData] = useState(null);
//   const [filter, setFilter] = useState('week'); // Default filter set to "week"

//   // Function to fetch data based on the filter
//   const fetchData = (filter) => {
//     axios.get(`http://localhost:8080/booking/progress?filter=${filter}`)
//       .then(response => {
//         const data = response.data.data;
//         const labels = Object.keys(data); // Days for weekly, months for monthly
//         const values = Object.values(data); // Counts of bookings

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: filter === 'week' ? 'Bookings (Current Week)' : 'Bookings (Current Month)',
//               data: values,
//               backgroundColor: 'rgba(20, 110, 227, 0.5)',
//               borderColor: 'rgba(20, 110, 227, 1)',
//               borderWidth: 1,
//             },
//           ],
//         });
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   };

//   // Fetch weekly data by default on initial render
//   useEffect(() => {
//     fetchData(filter);
//   }, [filter]);

//   // Chart options
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
//       <h3 className="text-lg font-medium mb-4">Booking Chart </h3>

//       {/* Filter Buttons */}
//       <div className="flex justify-end mb-4">
//         <button
//           className={`px-4 py-2 rounded-l ${filter === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setFilter('week')}
//         >
//           Weekly
//         </button>
//         <button
//           className={`px-4 py-2 rounded-r ${filter === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setFilter('month')}
//         >
//           Monthly
//         </button>
//       </div>

//       {/* Chart */}
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
              label: filter === 'week' ? 'Bookings (Current Week)' : 'Bookings (Current Month)',
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
        ticks: {
          stepSize: 1, // Ensure increments are integers
          callback: function (value) {
            return Number.isInteger(value) ? value : null; // Show only integers
          },
        },
      },
    },
  };

  if (!chartData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h3 className="text-lg font-medium mb-4">Booking Chart</h3>

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
