
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:8080/admin/get-all-users")
//       .then(response => {
//         console.log("API Response Data:", response.data); // Check the structure
//         setUsers(response.data);
//       })
//       .catch(error => console.error("Error fetching users:", error));
//   }, []);

//   const toggleActivation = (userId) => {
//     axios.put(`http://localhost:8080/admin/${userId}/toggle-activation`)
//       .then(() => {
//         setUsers(users.map(user =>
//           user.id === userId ? { ...user, userActivated: !user.userActivated } : user
//         ));
//       })
//       .catch(error => console.error("Error toggling activation:", error));
//   };

//   const filteredUsers = searchQuery
//     ? users.filter(user =>
//         user.email.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : users;

//   // Sort users by ID in ascending order
//   const sortedUsers = filteredUsers.sort((a, b) => a.id - b.id);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Users</h1>
        
//         {/* Search Bar */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search by email"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
//           />
//         </div>

//         <div className="overflow-x-auto">
//           <table className="table-auto w-full bg-white shadow-md rounded-lg">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
//                 <th className="py-3 px-6 text-left">User ID</th>
//                 <th className="py-3 px-6 text-left">Email</th>
//                 <th className="py-3 px-6 text-left">Role</th>
//                 {/* Conditionally render Status column */}
//                 {users.some(user => user.role !== "ADMIN") && (
//                   <th className="py-3 px-6 text-center">Status</th>
//                 )}
//                 {/* Conditionally render Action column */}
//                 {users.some(user => user.role !== "ADMIN") && (
//                   <th className="py-3 px-6 text-center">Action</th>
//                 )}
//               </tr>
//             </thead>
//             <tbody className="text-gray-600 text-sm">
//               {sortedUsers.map(user => (
//                 <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
//                   <td className="py-3 px-6 text-left">{user.id}</td>
//                   <td className="py-3 px-6 text-left">{user.email}</td>
//                   <td className="py-3 px-6 text-left">{user.role}</td>
//                   {/* Conditionally render Status column */}
//                   {user.role !== "ADMIN" && (
//                     <td className="py-3 px-6 text-center">
//                       <span
//                         className={`py-1 px-3 rounded-full text-xs ${
//                           user.userActivated
//                             ? "bg-green-200 text-green-800"
//                             : "bg-red-200 text-red-800"
//                         }`}
//                       >
//                         {user.userActivated ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                   )}
//                   {/* Conditionally render Action column */}
//                   {user.role !== "ADMIN" && (
//                     <td className="py-3 px-6 text-center">
//                       <button
//                         onClick={() => toggleActivation(user.id)}
//                         className={`py-2 px-4 rounded-lg text-white font-semibold ${
//                           user.userActivated ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {user.userActivated ? "Deactivate" : "Activate"}
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//               {sortedUsers.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="py-4 text-center text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Users;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/get-all-users")
      .then((response) => {
        console.log("API Response Data:", response.data); // Check the structure
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const toggleActivation = (userId, userActivated) => {
    const action = userActivated ? "deactivate" : "activate";

    Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: userActivated ? "#d33" : "#3085d6", // Red for deactivate, blue for activate
      cancelButtonColor: "#aaa",
      confirmButtonText: userActivated ? "Yes, deactivate!" : "Yes, activate!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:8080/admin/${userId}/toggle-activation`)
          .then(() => {
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === userId
                  ? { ...user, userActivated: !user.userActivated }
                  : user
              )
            );
            Swal.fire(
              "Success!",
              `User has been ${action}d successfully.`,
              "success"
            );
          })
          .catch((error) => {
            console.error("Error toggling activation:", error);
            Swal.fire(
              "Error",
              "Something went wrong. Please try again later.",
              "error"
            );
          });
      }
    });
  };

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  // Sort users by ID in ascending order
  const sortedUsers = filteredUsers.sort((a, b) => a.id - b.id);

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
                <th className="py-3 px-6 text-left">User ID</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                {/* Conditionally render Status column */}
                {users.some((user) => user.role !== "ADMIN") && (
                  <th className="py-3 px-6 text-center">Status</th>
                )}
                {/* Conditionally render Action column */}
                {users.some((user) => user.role !== "ADMIN") && (
                  <th className="py-3 px-6 text-center">Action</th>
                )}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {sortedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{user.id}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  {/* Conditionally render Status column */}
                  {user.role !== "ADMIN" && (
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
                  )}
                  {/* Conditionally render Action column */}
                  {user.role !== "ADMIN" && (
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() =>
                          toggleActivation(user.id, user.userActivated)
                        }
                        className={`py-2 px-4 rounded-lg text-white font-semibold ${
                          user.userActivated
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {user.userActivated ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {sortedUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 text-center text-gray-500"
                  >
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

