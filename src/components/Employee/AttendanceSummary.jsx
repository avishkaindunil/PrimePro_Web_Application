import { useState } from "react";
import { saveAttendanceByEmployeeId } from './../../api/attendanceApiCalls';
import Swal from "sweetalert2";

const AttendanceSummary = ({ attendance, fetchAttendanceData, employeeId }) => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    const [attendanceData, setAttendanceData] = useState(attendance);
    const [newAttendance, setNewAttendance] = useState(null);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const addNewRow = () => {
        setNewAttendance({
            attendanceDate: getCurrentDate(), 
            checkInTime: "",
            checkOutTime: "",
            overtime: "",
            workHours: "",
            approved: false, // Default values
        });
    };

    const handleInputChange = (e, field) => {
        setNewAttendance({ ...newAttendance, [field]: e.target.value });
    };

    const formatTime = (time) => {
        const date = new Date(`1970-01-01T${time}:00`);
        return date.toTimeString().split(' ')[0];
    };

    const saveNewAttendance = async () => {
        if (!newAttendance.checkInTime || !newAttendance.checkOutTime) {
            alert("Please fill in both Check-in and Check-out times.");
            return;
        }

        try {
            // Call the endpoint to calculate overtime and save the data

            const attendanceDetailData = {
                employeeId: storedUserData.employeeId,
                attendanceDate: newAttendance.attendanceDate,
                checkInTime: formatTime(newAttendance.checkInTime),
                checkOutTime: formatTime(newAttendance.checkOutTime),
                isApproved: false
            }

            console.log(attendanceDetailData);

            const { data: updatedAttendance, loading, error } = await saveAttendanceByEmployeeId(attendanceDetailData);

            console.log(updatedAttendance);

            if (error) {
                Swal.fire({
                    icon: "info",
                    text: "Failed to save attendance."
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Save attendance successfully!",
                });
                setAttendanceData((prev) => [...prev, updatedAttendance]);
                setNewAttendance(null);
            }

        } catch (error) {
            console.error("Error saving attendance:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while saving attendance.",
            });
        }
    };

    return (
        <div className="container mx-auto">
            <button
                className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={addNewRow}
            >
                + Add New Attendance
            </button>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Check-in Time</th>
                        <th className="py-2 px-4 border-b">Check-out Time</th>
                        <th className="py-2 px-4 border-b">Overtime</th>
                        <th className="py-2 px-4 border-b">Workhours</th>
                        <th className="py-2 px-4 border-b">Approval</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {newAttendance && (
                        <tr>
                            <td className="py-2 px-4 border-b">
                                {newAttendance.attendanceDate}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <input
                                    type="time"
                                    value={newAttendance.checkInTime}
                                    onChange={(e) => handleInputChange(e, "checkInTime")}
                                    className="border border-gray-300 rounded"
                                />
                            </td>
                            <td className="py-2 px-4 border-b">
                                <input
                                    type="time"
                                    value={newAttendance.checkOutTime}
                                    onChange={(e) => handleInputChange(e, "checkOutTime")}
                                    className="border border-gray-300 rounded"
                                />
                            </td>
                            <td className="py-2 px-4 border-b">-</td>
                            <td className="py-2 px-4 border-b">-</td>
                            <td className="py-2 px-4 border-b">Pending</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    className="bg-green-500 text-white py-1 px-2 rounded"
                                    onClick={saveNewAttendance}
                                >
                                    Save
                                </button>
                            </td>
                        </tr>
                    )}
                    {attendanceData.map((data, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{data.attendanceDate.split("T")[0]}</td>
                            <td className="py-2 px-4 border-b">{data.checkInTime}</td>
                            <td className="py-2 px-4 border-b">{data.checkOutTime}</td>
                            <td className="py-2 px-4 border-b">{data.overtime}</td>
                            <td className="py-2 px-4 border-b">{data.workHours}</td>
                            <td className="py-2 px-4 border-b">{data.approved ? "Approved" : "Pending"}</td>
                            <td className="py-2 px-4 border-b">-</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceSummary;
