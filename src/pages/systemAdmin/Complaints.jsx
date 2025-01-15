

// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";
// import { publicAuthRequest } from "../../constants/requestMethods";

// const ViewComplaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const response = await publicAuthRequest.get(`/complaints/get-all-unresolved`);
//         if (response.status !== 200) {
//           throw new Error("Failed to fetch complaints");
//         }
//         // Use the `data` directly as it already includes the `mobile` field
//         setComplaints(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   const resolveComplaint = (complaintId) => {
//     // Update the complaint status locally
//     setComplaints((prevComplaints) =>
//       prevComplaints.filter((complaint) => complaint.complaintId !== complaintId)
//     );

//     // Display SweetAlert success message
//     Swal.fire({
//       title: "Resolved!",
//       text: `Inquiry #${complaintId} has been resolved successfully!`,
//       icon: "success",
//       confirmButtonText: "OK",
//       confirmButtonColor: "#4CAF50",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-gray-500 text-lg">Loading inquiries...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-red-500 text-lg">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">User Inquiries</h1>
//       <div className="bg-white shadow rounded p-4">
//         {complaints.length === 0 ? (
//           <p className="text-gray-600">No inquiries available.</p>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {complaints.map((complaint) => (
//               <li key={complaint.complaintId} className="py-4">
//                 <h2 className="text-lg font-semibold">Inquiry #{complaint.complaintId}</h2>
//                 <p className="text-sm text-gray-700 mb-2">{complaint.complaint}</p>
//                 <p className="text-sm text-gray-600 mb-2">
//                   <strong>Contact Number:</strong> {complaint.mobile}
//                 </p>
//                 <span className="text-xs text-gray-500">
//                   Submitted by User ID: {complaint.userID}
//                 </span>
//                 <div className="mt-2">
//                   <button
//                     onClick={() => resolveComplaint(complaint.complaintId)}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                   >
//                     Resolve
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewComplaints;





import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { publicAuthRequest } from "../../constants/requestMethods";

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await publicAuthRequest.get(`/complaints/get-all-unresolved`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch complaints");
      }
      setComplaints(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const resolveComplaint = async (complaintId) => {
    try {
      const response = await publicAuthRequest.put(`/complaints/resolve/${complaintId}`);
      if (response.status !== 200) {
        throw new Error("Failed to resolve complaint");
      }

      Swal.fire({
        title: "Resolved!",
        text: `Inquiry #${complaintId} has been resolved successfully!`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4CAF50",
      });

      // Refetch the unresolved complaints after resolving
      fetchComplaints();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to resolve the inquiry. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF0000",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading inquiries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Inquiries</h1>
      <div className="bg-white shadow rounded p-4">
        {complaints.length === 0 ? (
          <p className="text-gray-600">No inquiries available.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <li key={complaint.complaintId} className="py-4">
                <h2 className="text-lg font-semibold">Inquiry #{complaint.complaintId}</h2>
                <p className="text-sm text-gray-700 mb-2">{complaint.complaint}</p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Contact Number:</strong> {complaint.mobile}
                </p>
                <span className="text-xs text-gray-500">
                  Submitted by User ID: {complaint.userID}
                </span>
                <div className="mt-2">
                  <button
                    onClick={() => resolveComplaint(complaint.complaintId)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Resolve
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewComplaints;
