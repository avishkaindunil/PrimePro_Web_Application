import React, { useState } from 'react';

const LeaveRequest = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  // Sample leave requests
  const leaveRequests = [
    { id: 1, name: "John Doe", reason: "Medical emergency", date: "2024-12-01" },
    { id: 2, name: "Jane Smith", reason: "Vacation", date: "2024-12-05" },
    { id: 3, name: "Alex Brown", reason: "Family commitment", date: "2024-12-10" },
    { id: 1, name: "John ", reason: "Medical emergency", date: "2024-12-01" },
    { id: 2, name: "Smith", reason: "Vacation", date: "2024-12-05" },
    { id: 3, name: "Brown", reason: "Family commitment", date: "2024-12-10" },
  ];

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleAccept = () => {
    setPopupMessage(`Leave request accepted for ${selectedRequest.name}`);
    setSelectedRequest(null);
  };

  const handleReject = () => {
    setPopupMessage(`Leave request rejected for ${selectedRequest.name}`);
    setSelectedRequest(null);
  };

  const closePopup = () => {
    setPopupMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Leave Requests</h1>
      
      {/* Leave Request List */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-4">Employee Name</th>
              <th className="border-b-2 p-4">Date</th>
              <th className="border-b-2 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="border-b p-4">{request.name}</td>
                <td className="border-b p-4">{request.date}</td>
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
            <p><strong>Name:</strong> {selectedRequest.name}</p>
            <p><strong>Date:</strong> {selectedRequest.date}</p>
            <p><strong>Reason:</strong> {selectedRequest.reason}</p>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleReject}
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
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <span>{popupMessage}</span>
          <button
            className="ml-4 bg-white text-green-500 px-2 py-1 rounded-md hover:bg-gray-100"
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
