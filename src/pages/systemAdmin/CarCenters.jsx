import React, { useState, useEffect } from "react";
import axios from "axios";

const CarCenters = () => {
  const [centers, setCenters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCenter, setNewCenter] = useState({
    name: "",
    location: "",
    capacity: "",
    admin: "",
    employees: "",
    branch: "",
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

    fetchCenters();
  }, []);

  const handleAddCenter = () => {
    setCenters([...centers, { ...newCenter, id: Date.now() }]);
    setNewCenter({
      name: "",
      location: "",
      capacity: "",
      admin: "",
      employees: "",
      branch: "",
    });
    setShowModal(false);

    // Show success alert
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
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
              {center.name}
            </h2>
            <p>
              <strong>Location:</strong> {center.location}
            </p>
            <p>
              <strong>Capacity:</strong> {center.capacity}
            </p>
            <p>
              <strong>Center Admin:</strong> {center.admin}
            </p>
            <p>
              <strong>Employees:</strong> {center.employees}
            </p>
            <p>
              <strong>Branch:</strong> {center.branch}
            </p>
          </div>
        ))}
      </div>

      {/* Add Center Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
        >
          Add Center
        </button>
      </div>

      {/* Add Center Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New Center</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Center Name"
                value={newCenter.name}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Location"
                value={newCenter.location}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, location: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Capacity"
                value={newCenter.capacity}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, capacity: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Admin Name"
                value={newCenter.admin}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, admin: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Number of Employees"
                value={newCenter.employees}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, employees: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Branch Name"
                value={newCenter.branch}
                onChange={(e) =>
                  setNewCenter({ ...newCenter, branch: e.target.value })
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
