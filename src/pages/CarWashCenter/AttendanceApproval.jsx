import React, { useState, useEffect } from "react";
import axios from "axios";
import { publicAuthRequest } from "../../constants/requestMethods";
import Attendance from './../Employee/Attendance';

const AttendanceApproval = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await publicAuthRequest.get("/attendance/getall");
        setAttendances(response.data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendance();
  }, []);

  const handleStatusChange = async (attendanceId, isApproved) => {
    try {
      await await publicAuthRequest.put(`/attendance/${attendanceId}/approve`, null, {
        params: { isApproved },
      });
      alert(
        `Attendance ${isApproved === 1 ? "approved" : "rejected"} successfully!`
      );

      // Update the UI
      setAttendances((prev) =>
        prev.map((attendance) =>
          attendance.id === attendanceId
            ? { ...attendance, isApproved }
            : attendance
        )
      );
    } catch (error) {
      console.error("Error updating attendance status:", error);
      alert("Failed to update attendance status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Approval</h1>
      {attendances.length > 0 ? (
        <table className="w-full border-collapse bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border-b">Employee Name</th>
              <th className="p-4 border-b">Attendance Date</th>
              <th className="p-4 border-b">Check-In</th>
              <th className="p-4 border-b">Check-Out</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance) => (
              <tr key={attendance.id} className="hover:bg-gray-50 text-center">
                <td className="p-4 border-b">{attendance.name}</td>
                <td className="p-4 border-b">{attendance.attendanceDate}</td>
                <td className="p-4 border-b">{attendance.checkInTime}</td>
                <td className="p-4 border-b">{attendance.checkOutTime}</td>
                <td className="p-4 border-b">
                  <span
                    className={`px-4 py-1 rounded-full text-white ${
                      attendance.isApproved === 1
                        ? "bg-green-500"
                        : attendance.isApproved === 2
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {attendance.isApproved === 1
                      ? "Approved"
                      : attendance.isApproved === 2
                      ? "Rejected"
                      : "Pending"}
                  </span>
                </td>
                <td className="p-4 border-b">
                  <button
                    className="px-4 py-2 mr-2 bg-green-500 text-white rounded"
                    onClick={() => handleStatusChange(attendance.id, 1)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => handleStatusChange(attendance.id, 2)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No attendance records found.</p>
      )}
    </div>
  );
};

export default AttendanceApproval;
