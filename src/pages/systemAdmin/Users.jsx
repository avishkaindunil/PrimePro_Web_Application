
import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/admin/get-all-users")
      .then(response => {
        console.log("API Response Data:", response.data); // Check the structure
        setUsers(response.data);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const toggleActivation = (userId) => {
    axios.put(`http://localhost:8080/admin/${userId}/toggle-activation`)
      .then(() => {
        setUsers(users.map(user =>
          user.id === userId ? { ...user, userActivated: !user.userActivated } : user
        ));
      })
      .catch(error => console.error("Error toggling activation:", error));
  };

  const filteredUsers = searchQuery
    ? users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Users</h1>
        
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        user.userActivated
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {user.userActivated ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => toggleActivation(user.id)}
                      className={`py-2 px-4 rounded-lg text-white font-semibold ${
                        user.userActivated ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {user.userActivated ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

