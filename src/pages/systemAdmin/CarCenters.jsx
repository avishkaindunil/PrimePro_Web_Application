import React, { useState, useEffect } from "react";
import axios from "axios";

const CarCenters = () => {
  const [centers, setCenters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCenter, setNewCenter] = useState({
    username: "",
    centerName:"",
    address:"",
    password:"",
    email:"",
    BRNo:"",
    PhoneNo:""    
  });
  const [showAlert, setShowAlert] = useState(false);

  // Fetch centers from the backend
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get("http://localhost:8080/reports/get-all-centers");
        setCenters(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching centers:", error);
      }
    };


    // "id": 1,
    // "username": "MotorPlusAdmin",
    // "password": "1234",
    // "centerName": "MotorPlus",
    // "address": "Galle",
    // "phoneNo": "234438",
    // "registeredDate": "2024-05-04T18:30:00.000+00:00",
    // "email": "motorPlus@gmail.com",


    fetchCenters();
  }, []);

  const handleAddCenter = async () => {
    try {
      const response = await axios.post("http://localhost:8080/centerAdmin/add", newCenter);
      if (response.status === 201) {
        // Fetch updated list of centers from the backend
        const updatedCenters = await axios.get("http://localhost:8080/reports/get-all-centers");
        setCenters(updatedCenters.data);
        setNewCenter({
          username: "",
          centerName: "",
          address: "",
          password: "",
          email: "",
          BRNo: "",
          PhoneNo: "",
        });
        setShowModal(false);
  
        // Show success alert
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      console.error("Error adding center:", error);
      alert("Failed to add center. Please try again.");
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Car Wash Centers</h1>

      {/* Centers Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {centers.map((center) => (
          <div
            key={center.id}
            className="bg-white shadow-md rounded-lg p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold text-blue-600">
              {center.centerName}
            </h2>
            <p>
              <strong>Location:</strong> {center.address}
            </p>
            {/* <p>
              <strong>Capacity:</strong> {center.capacity}
            </p> */}
            <p>
              <strong>Center Admin:</strong> {center.username}
            </p>
            <p>
              <strong>Phone Number:</strong> {center.phoneNo}
            </p>
            <p>
              <strong>Email:</strong> {center.email}
            </p>
          </div>
        ))}
      </div>

      {/* Add Center Button */}
      {/* <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
        >
          Add Center
        </button>
      </div> */}

      {/* Add Center Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New Center</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Center Name"
                value={newCenter.centerName}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, centerName: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Location"
                value={newCenter.address}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, address: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Admin Name"
                value={newCenter.username}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, username: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Password"
                value={newCenter.password}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, password: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
                <input
                type="text"
                placeholder="Phone Number"
                value={newCenter.PhoneNo}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, PhoneNo: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="email"
                value={newCenter.email}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="BR Number"
                value={newCenter.BRNo}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, BRNo: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCenter}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
          Center added successfully!
        </div>
      )}
    </div>
  );
};

export default CarCenters;
