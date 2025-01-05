import { useState } from "react";
import { saveLeaveDetails } from "../../api/leavesApiCalls";
import Swal from "sweetalert2";

const LeaveForm = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors for the field if the value becomes valid
    if (name === "startDate" && value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(value);

      if (startDate >= today) {
        setErrors((prevErrors) => ({ ...prevErrors, startDate: null }));
      }
    }

    if (name === "endDate" && value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(formData.startDate);
      const endDate = new Date(value);

      if (endDate >= today && endDate >= startDate) {
        setErrors((prevErrors) => ({ ...prevErrors, endDate: null }));
      }
    }
  };

  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight for comparison
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const newErrors = {};

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    } else if (startDate < today) {
      newErrors.startDate = "Start date cannot be in the past.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    } else if (endDate < today) {
      newErrors.endDate = "End date cannot be in the past.";
    } else if (endDate < startDate) {
      newErrors.endDate = "End date cannot be before the start date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDates()) {
      return;
    }

    console.log("Leave Form Submitted:", formData);

    const leaveDetails = {
      userId: storedUserData.userId,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason
    }

    try {
      const { data: updatedAttendance, loading, error } = await saveLeaveDetails(leaveDetails);

      console.log(updatedAttendance);

      if (error) {
        Swal.fire({
          icon: "info",
          text: error
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Leave application submitted successfully!",
        });
      }
      
    }catch(e){
      console.error("An error occurred while saving leave request:", e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while saving leave request.",
      });
    }

    setFormData({
      employeeName: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
    setErrors({});
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Leave Application Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Employee Number</label>
          <input
            type="text"
            name="employeeName"
            value={storedUserData.employeeNumber}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Employee Name</label>
          <input
            type="text"
            name="employeeName"
            value={storedUserData.name}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Leave Type</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="" disabled>
              Select leave type
            </option>
            <option value="annual">Annual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="earned">Earned Leave</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.startDate ? "border-red-500" : ""
            }`}
            required
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.endDate ? "border-red-500" : ""
            }`}
            required
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter the reason for leave"
            className="w-full px-4 py-2 border rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeaveForm;