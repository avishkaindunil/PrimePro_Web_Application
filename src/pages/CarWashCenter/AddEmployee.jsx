import { useState } from "react";
import { publicAuthRequest } from "../../constants/requestMethods";
import Profilepic from '../../assets/profilepic.png';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    email: "",
    phone: "",
    city: "",
    designation: "",
    dateOfBirth: "",
    baseSalary: "",
    noOfAnnualLeaves: "",
    noOfCasualLeaves: "",
    noOfMedicalLeaves: "",
    isProbation: true,
  });

  const [showLeaveFields, setShowLeaveFields] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "isProbation") {
      const isProbation = value === "true";
      setShowLeaveFields(!isProbation);
      setFormData({
        ...formData,
        [name]: isProbation,
        noOfAnnualLeaves: isProbation ? "" : 12,
        noOfCasualLeaves: isProbation ? "" : 8,
        noOfMedicalLeaves: isProbation ? "" : 6,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Validate minimum age (18 years)
  const isValidAge = () => {
    const today = new Date();
    const dob = new Date(formData.dateOfBirth);
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    return age > 18 || (age === 18 && m >= 0);
  };

  // Handle form submission
  const handleOnClick = async (e) => {
    e.preventDefault();

    if (!isValidAge()) {
      alert("Employee must be at least 18 years old.");
      return;
    }

    if (formData.baseSalary <= 0) {
        alert("Salary must be a positive value.");
        return;
    }

    const dataToSend = {
      user: {
        email: formData.email,
        name: formData.name,
        password: "password123",
        city: formData.city,
        role: "EMPLOYEE",
        profilePictureUrl: Profilepic,
      },
      branchName: "Auto Miraj - Colombo 07",
      dateOfBirth: formData.dateOfBirth,
      phoneNumber: formData.phone,
      designation: formData.designation,
      nic: formData.nic,
      noOfAnnualLeaves: formData.noOfAnnualLeaves || 0,
      noOfCasualLeaves: formData.noOfCasualLeaves || 0,
      noOfMedicalLeaves: formData.noOfMedicalLeaves || 0,
      baseSalary: formData.baseSalary,
      isProbation: formData.isProbation,
    };

    try {
      const res = await publicAuthRequest.post(`/employee/add`, dataToSend);
      console.log(res.data);
      alert("Employee added successfully!");
      setFormData({
        name: "",
        nic: "",
        email: "",
        phone: "",
        city: "",
        designation: "",
        dateOfBirth: "",
        baseSalary: "",
        noOfAnnualLeaves: "",
        noOfCasualLeaves: "",
        noOfMedicalLeaves: "",
        isProbation: true,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add employee.");
    }
  };

  // Handle cancel
  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      nic: "",
      email: "",
      phone: "",
      city: "",
      designation: "",
      dateOfBirth: "",
      baseSalary: "",
      noOfAnnualLeaves: "",
      noOfCasualLeaves: "",
      noOfMedicalLeaves: "",
      isProbation: true,
    });
    setShowLeaveFields(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">Add New Employee</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600">Full Name</label>
            <input
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* NIC and Phone */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-lg font-medium text-gray-600">NIC</label>
              <input
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="nic"
                type="text"
                placeholder="Enter NIC"
                value={formData.nic}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Phone No</label>
              <input
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="phone"
                type="text"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email and DOB */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-lg font-medium text-gray-600">Email</label>
              <input
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Date of Birth</label>
              <input
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* City and Designation */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-lg font-medium text-gray-600">City</label>
              <input
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="city"
                type="text"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Designation</label>
              <input
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="designation"
                type="text"
                placeholder="Enter designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Probation Status */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600">Is Probation</label>
            <select
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="isProbation"
              value={formData.isProbation}
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          {/* Conditional Leave Fields */}
          {showLeaveFields && (
            <>
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-lg font-medium text-gray-600">Annual Leaves</label>
                  <input
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="noOfAnnualLeaves"
                    type="number"
                    value={formData.noOfAnnualLeaves}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-600">Casual Leaves</label>
                  <input
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="noOfCasualLeaves"
                    type="number"
                    value={formData.noOfCasualLeaves}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-600">Medical Leaves</label>
                  <input
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="noOfMedicalLeaves"
                    type="number"
                    value={formData.noOfMedicalLeaves}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {/* Base Salary */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600">Base Salary</label>
            <input
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="baseSalary"
              type="number"
              placeholder="Enter base salary"
              value={formData.baseSalary}
              onChange={handleChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg w-1/3 hover:bg-blue-700 transition"
              onClick={handleOnClick}
            >
              Save
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg w-1/3 hover:bg-gray-300 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;