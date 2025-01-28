import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicAuthRequest } from '../../constants/requestMethods';

const LeaveRequest = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Sample leave requests
  // const leaveRequests = [
  //   { id: 1, name: "John Doe", leaveType: "Sick Leave", reason: "Medical emergency", date: "2024-12-01" },
  //   { id: 2, name: "Jane Smith", leaveType: "Annual Leave", reason: "Vacation", date: "2024-12-05" },
  //   { id: 3, name: "Alex Brown", leaveType: "Emergency Leave", reason: "Family commitment", date: "2024-12-10" },
  //   { id: 1, name: "John ", leaveType: "Sick Leave", reason: "Medical emergency", date: "2024-12-01" },
  //   { id: 2, name: "Smith", leaveType: "Casual Leave", reason: "Vacation", date: "2024-12-05" },
  //   { id: 3, name: "Brown", leaveType: "Study Leave", reason: "Family commitment", date: "2024-12-10" },
  // ];

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await publicAuthRequest.get(`/leave-requests/leave-requests`);
        console.log(response.data);
        if (response.data) {
          setLeaveRequests(response.data);
        }
      } catch (error) {
        console.error("Error fetching leave details", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleAction = async (action) => {
    try {
      const payload = {
        isApproved: action,
        leaveRequestId: selectedRequest.leaveRequestId
      }
      const response = await publicAuthRequest.post(`/leave-requests/leave-action`, payload)
      console.log(response.data);

      if (action === "approved") {
        setPopupMessage(`Leave request accepted for ${selectedRequest.employeeName}`);
      } else {
        setPopupMessage(`Leave request rejected for ${selectedRequest.employeeName}`);
      }

      setSelectedRequest(null);
      setLeaveRequests((prevLeaveRequests) =>
        prevLeaveRequests.filter((leaveRequest) => leaveRequest.leaveRequestId !== selectedRequest.leaveRequestId
        ));

    } catch (error) {
      console.log("Error in leave action: ", error);
    }
  };

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => {
        closePopup();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  const closePopup = () => {
    setPopupMessage("");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex space-between">
        <h1 className="mb-6 text-2xl font-bold">Leave Requests</h1>
        <div className="flex justify-end px-4">
          <Link to={`/CarWashCenterAdmin/allleaverequests`} className='text-center'>
            <button
              className="px-6 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              View All
            </button>
          </Link>
        </div>
      </div>
      {/* Leave Request List */}
      <div className="p-6 bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b-2">Employee Name</th>
              <th className="p-4 border-b-2">Date</th>
              <th className="p-4 border-b-2">Leave Type</th>
              <th className="p-4 border-b-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="p-4 border-b">{request.employeeName}</td>
                <td className="p-4 border-b">{request.startDate}</td>
                <td className="p-4 border-b">{request.leaveType}</td>
                <td className="p-4 border-b">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    onClick={() => handleViewDetails(request)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leave Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Leave Request Details</h2>
            <p><strong>Name:</strong> {selectedRequest.employeeName}</p>
            <p><strong>Date:</strong> {selectedRequest.startDate}</p>
            <p><strong>Reason:</strong> {selectedRequest.reason}</p>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                onClick={() => handleAction("approved")}
              >
                Accept
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={() => handleAction("rejected")}
              >
                Reject
              </button>
              <button
                className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Message */}
      {popupMessage && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 text-white px-4 py-2 rounded-md shadow-lg flex items-center ${popupMessage.includes("rejected") ? "bg-red-500" : "bg-green-500"
          }`}>
          <span>{popupMessage}</span>
          <button
            className={`ml-4 bg-white text-green-500 px-2 py-1 rounded-md hover:bg-gray-100 ${popupMessage.includes("rejected") ? "text-red-500" : "text-green-500"
              }`}
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaveRequest;
