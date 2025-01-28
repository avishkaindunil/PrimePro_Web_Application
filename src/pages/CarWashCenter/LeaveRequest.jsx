import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicAuthRequest } from '../../constants/requestMethods';
import Swal from "sweetalert2";

const LeaveRequest = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);

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
      if (error.response && error.response.status === 500) {
        Swal.fire("Error", "Insufficient leave balance", "error");
      } else {
        Swal.fire("Error", "Something went wrong!", "error");
      }
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex space-between">
        <h1 className="text-2xl font-bold mb-6">Leave Requests</h1>
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
      <div className="bg-white shadow rounded-lg p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-4">Employee Name</th>
              <th className="border-b-2 p-4">Date</th>
              <th className="border-b-2 p-4">Leave Type</th>
              <th className="border-b-2 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="border-b p-4">{request.employeeName}</td>
                <td className="border-b p-4">{request.startDate}</td>
                <td className="border-b p-4">{request.leaveType}</td>
                <td className="border-b p-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Leave Request Details</h2>
            <p><strong>Name:</strong> {selectedRequest.employeeName}</p>
            <p><strong>Date:</strong> {selectedRequest.startDate}</p>
            <p><strong>Reason:</strong> {selectedRequest.reason}</p>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => handleAction("approved")}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleAction("rejected")}
              >
                Reject
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
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
