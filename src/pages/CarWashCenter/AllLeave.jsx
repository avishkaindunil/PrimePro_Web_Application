import React, { useEffect, useState } from 'react';
import { publicAuthRequest } from '../../constants/requestMethods';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

const AllLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState(null);

  // const leaveRequests = [
    //     {
    //       leaveRequestId: 1,
    //       employeeName: "John Doe",
    //       startDate: "2024-12-01",
    //       reason: "Medical Emergency",
    //       status: "approved",
    //     },
    //     {
    //       leaveRequestId: 2,
    //       employeeName: "Jane Smith",
    //       startDate: "2024-12-05",
    //       reason: "Vacation",
    //       status: "rejected",
    //     },
    //     {
    //       leaveRequestId: 3,
    //       employeeName: "Alex Brown",
    //       startDate: "2024-12-10",
    //       reason: "Family Commitment",
    //       status: "pending",
    //     },
    //     {
    //       leaveRequestId: 4,
    //       employeeName: "Emily White",
    //       startDate: "2024-12-15",
    //       reason: "Personal Leave",
    //       status: "approved",
    //     },
    //     {
    //       leaveRequestId: 5,
    //       employeeName: "Michael Green",
    //       startDate: "2024-12-20",
    //       reason: "Study Leave",
    //       status: "rejected",
    //     },
    //   ];

  useEffect(() => {
    const fetchAllLeaveRequests = async () => {
      try {
        const response = await publicAuthRequest.get('leave-requests/all-leave-requests');
        if (response.data) {
          setLeaveRequests(response.data);
        }
      } catch (error) {
        console.error('Error fetching leave details', error);
      }
    };

    fetchAllLeaveRequests();
  }, []);

  const handleOnClick = () => {
    const leaveCounts = {};
    const approvedRequests = leaveRequests.filter((request) => request.isApproved === 'approved');

    // Calculate the number of leave requests for each employee
    approvedRequests.forEach((request) => {
      if (!leaveCounts[request.employeeName]) {
        leaveCounts[request.employeeName] = 0;
      }
      leaveCounts[request.employeeName] += 1;
    });

    const labels = Object.keys(leaveCounts);
    const data = Object.values(leaveCounts);

    // Prepare chart data
    const barChartData = {
      labels,
      datasets: [
        {
          label: 'Number of Leaves',
          data,
          backgroundColor: 'rgb(135,206,250)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Set chart data and open modal
    setChartData(barChartData);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Leave Requests</h1>
        <button
          onClick={handleOnClick}
          className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Get a Summary
        </button>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        {leaveRequests.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b">Employee Name</th>
                <th className="p-4 border-b">Leave Date</th>
                <th className="p-4 border-b">Reason</th>
                <th className="p-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.leaveRequestId} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{request.employeeName}</td>
                  <td className="p-4 border-b">{request.startDate}</td>
                  <td className="p-4 border-b">{request.reason}</td>
                  <td className="p-4 border-b">
                    <span
                      className={`px-4 py-2 rounded-full text-white ${
                        request.isApproved === 'approved'
                          ? 'bg-green-500'
                          : request.isApproved === 'rejected'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {request.isApproved === 'approved'
                        ? 'Accepted'
                        : request.isApproved === 'rejected'
                        ? 'Rejected'
                        : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No leave requests found.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Leave Summary</h2>
            {chartData && <Bar data={chartData}/>}
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 mt-6 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllLeave;
