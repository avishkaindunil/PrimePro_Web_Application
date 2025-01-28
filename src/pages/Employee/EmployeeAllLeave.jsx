import React, { useEffect, useState } from 'react';
import { publicAuthRequest } from '../../constants/requestMethods';
import DateAndTimeTracker from '../../components/Employee/DateAndTimeTracker';

const EmployeeAllLeave = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchAllLeaveRequests = async () => {
      try {
        const response = await publicAuthRequest.get(`/leave-requests/employee/${storedUserData.userId}`);
        if (response.data) {
          setLeaveRequests(response.data);
        }
      } catch (error) {
        console.error('Error fetching leave details', error);
      }
    };

    fetchAllLeaveRequests();
  }, []);

  const getLeaveTypeBadge = (leaveType) => {
    const badgeStyles = {
      annual: 'bg-blue-500 text-white',
      sick: 'bg-red-500 text-white',
      casual: 'bg-yellow-500 text-white',
      earned: 'bg-green-500 text-white',
    };

    return (
      <span
        className={`px-4 py-1 rounded-full text-sm font-semibold ${badgeStyles[leaveType.toLowerCase()] || 'bg-gray-400 text-white'}`}
      >
        {leaveType.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <DateAndTimeTracker />
      <div>
        <h1 className="text-2xl font-semibold my-8 mx-2">Leave History</h1>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {leaveRequests.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b">Start Date</th>
                <th className="p-4 border-b">End Date</th>
                <th className="p-4 border-b">Leave Type</th>
                <th className="p-4 border-b">Reason</th>
                <th className="p-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.leaveRequestId} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{request.startDate}</td>
                  <td className="p-4 border-b">{request.endDate}</td>
                  <td className="p-4 border-b">{getLeaveTypeBadge(request.leaveType)}</td>
                  <td className="p-4 border-b">{request.reason}</td>
                  <td className="p-4 border-b">
                    <span
                      className={`px-4 py-1  rounded-full text-white ${
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
    </div>
  );
};

export default EmployeeAllLeave;
