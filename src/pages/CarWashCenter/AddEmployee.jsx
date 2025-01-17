import { useState } from "react";
import { publicAuthRequest } from "../../constants/requestMethods";
import Profilepic from '../../assets/profilepic.png';
import Swal from "sweetalert2";

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

  const [formErrors, setFormErrors] = useState({});
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
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateFields = () => {
    const errors = {};
     if (!formData.name.trim()) errors.name = "Name is required.";

     const nicPattern = /^(?:\d{9}[VX]|\d{12})$/;
     if (!formData.nic.trim()) {
       errors.nic = "NIC is required.";
     } else if (!nicPattern.test(formData.nic)) {
       errors.nic = "Invalid NIC format.";
     }
 
     const phonePattern = /^0\d{9}$/;
     if (!formData.phone.trim()) {
       errors.phone = "Phone number is required.";
     } else if (!phonePattern.test(formData.phone)) {
       errors.phone = "Invalid phone number format. Must be 10 digits starting with 0.";
     }

     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!formData.email.trim()) {
       errors.email = "Email is required.";
     } else if (!emailPattern.test(formData.email)) {
       errors.email = "Invalid email format.";
     }
 
     if (!formData.city.trim()) errors.city = "City is required.";
     if (!formData.designation.trim()) errors.designation = "Designation is required.";
     if (!formData.dateOfBirth.trim()) errors.dateOfBirth = "Date of Birth is required.";
     if (!formData.baseSalary.trim() || formData.baseSalary <= 0) errors.baseSalary = "Base salary must be a positive number.";

    return errors;
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

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!isValidAge()) {
      setFormErrors({ dateOfBirth: "Employee must be at least 18 years old." });
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
      // alert("Employee added successfully!");
      Swal.fire({
        title:"Employee added successfully!",
        icon:"success",
        width:'350px',
        confirmButtonText:'Ok',
        customClass:{
          title: 'text-lg font-semibold text-black',
          confirmButton: 'px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300 ease-out transform hover:scale-105',
        }
      });
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
      // alert("Failed to add employee.");
      Swal.fire({
        title:"Failed to add employee!",
        icon:"error",
        width:'350px',
        confirmButtonText:"Ok",
        customClass:{
          title: 'text-lg font-semibold text-black',
          confirmButton: 'px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 ease-out transform hover:scale-105',
        }
      });
    }
  };

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
    setFormErrors({});
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-8 text-3xl font-semibold text-center text-gray-700">Add New Employee</h1>
        <form>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600">Full Name</label>
            <input
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
          </div>

          {/* NIC and Phone */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-lg font-medium text-gray-600">NIC</label>
              <input
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="nic"
                type="text"
                placeholder="Enter NIC"
                value={formData.nic}
                onChange={handleChange}
              />
              {formErrors.nic && <p className="mt-1 text-sm text-red-500">{formErrors.nic}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Phone No</label>
              <input
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="phone"
                type="text"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
            </div>
          </div>

          {/* Email and DOB */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-lg font-medium text-gray-600">Email</label>
              <input
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Date of Birth</label>
              <input
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {formErrors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{formErrors.dateOfBirth}</p>}
            </div>
          </div>

          {/* City and Designation */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-lg font-medium text-gray-600">City</label>
              <input
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="city"
                type="text"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
              />
              {formErrors.city && <p className="mt-1 text-sm text-red-500">{formErrors.city}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Designation</label>
              <input
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="designation"
                type="text"
                placeholder="Enter designation"
                value={formData.designation}
                onChange={handleChange}
              />
              {formErrors.designation && <p className="mt-1 text-sm text-red-500">{formErrors.designation}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            {/* Probation Status */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-600">Is Probation</label>
              <select
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="isProbation"
                value={formData.isProbation}
                onChange={handleChange}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            {/* Base Salary */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-600">Base Salary</label>
              <input
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="baseSalary"
                type="number"
                min={0}
                placeholder="Enter base salary"
                value={formData.baseSalary}
                onChange={handleChange}
              />
              {formErrors.baseSalary && <p className="mt-1 text-sm text-red-500">{formErrors.baseSalary}</p>}
            </div>
          </div>

          {/* Conditional Leave Fields */}
          {showLeaveFields && (
            <>
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-lg font-medium text-gray-600">Annual Leaves</label>
                  <input
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="noOfAnnualLeaves"
                    type="number"
                    value={formData.noOfAnnualLeaves}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-600">Casual Leaves</label>
                  <input
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="noOfCasualLeaves"
                    type="number"
                    value={formData.noOfCasualLeaves}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-600">Medical Leaves</label>
                  <input
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="noOfMedicalLeaves"
                    type="number"
                    value={formData.noOfMedicalLeaves}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}


          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              className="w-1/3 px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              onClick={handleOnClick}
            >
              Save
            </button>
            <button
              className="w-1/3 px-6 py-3 text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
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