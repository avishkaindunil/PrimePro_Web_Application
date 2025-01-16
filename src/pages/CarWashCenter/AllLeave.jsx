import React, {useEffect, useState} from 'react'
import { publicAuthRequest } from '../../constants/requestMethods';

const AllLeave = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
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
              const response = await publicAuthRequest.get(`leave-requests/all-leave-requests`);
              console.log(response.data);
              if (response.data) {
                setLeaveRequests(response.data);
              }
            } catch (error) {
              console.error("Error fetching leave details", error);
            }
          };
      
          fetchAllLeaveRequests();
        }, []);

      return (
        <div className="min-h-screen p-6 bg-gray-100">
          <h1 className="mb-6 text-2xl font-bold">All Leave Requests</h1>
    
          <div className="p-6 bg-white rounded-lg shadow-md">
            {leaveRequests.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="">
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
                            request.isApproved === "approved"
                              ? "bg-green-500"
                              : request.isApproved === "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {request.isApproved === "approved"
                            ? "Accepted"
                            : request.isApproved === "rejected"
                            ? "Rejected"
                            : "Pending"}
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

export default AllLeave
