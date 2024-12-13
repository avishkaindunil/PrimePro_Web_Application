// import React, { useEffect, useState } from 'react';

// const ViewComplaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/complaints/get-all'); // Updated API endpoint
//         if (!response.ok) {
//           throw new Error('Failed to fetch complaints');
//         }
//         const data = await response.json();
//         setComplaints(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-gray-500 text-lg">Loading complaints...</p>
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
//       <h1 className="text-2xl font-bold mb-6">User Inqueries</h1>
//       <div className="bg-white shadow rounded p-4">
//         {complaints.length === 0 ? (
//           <p className="text-gray-600">No inqueries available.</p>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {complaints.map((complaint) => (
//               <li key={complaint.complaintId} className="py-4">
//                 <h2 className="text-lg font-semibold">Inquery #{complaint.complaintId}</h2>
//                 <p className="text-sm text-gray-700 mb-2">{complaint.complaint}</p>
//                 <span className="text-xs text-gray-500">
//                   Submitted by User ID: {complaint.userID}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewComplaints;







import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to generate random Sri Lankan phone numbers
  const generatePhoneNumber = () => {
    const randomDigits = () => Math.floor(Math.random() * 10);
    return `+9471${randomDigits()}${randomDigits()}${randomDigits()}${randomDigits()}${randomDigits()}${randomDigits()}${randomDigits()}`;
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:8080/complaints/get-all"); // Updated API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await response.json();

        // Add contact numbers to each complaint
        const complaintsWithContact = data.map((complaint) => ({
          ...complaint,
          contactNumber: generatePhoneNumber(),
        }));

        setComplaints(complaintsWithContact);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const resolveComplaint = (complaintId) => {
    // Update the complaint status locally
    setComplaints((prevComplaints) =>
      prevComplaints.filter((complaint) => complaint.complaintId !== complaintId)
    );

    // Display SweetAlert success message
    Swal.fire({
      title: "Resolved!",
      text: `Inquiry #${complaintId} has been resolved successfully!`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#4CAF50",
    });
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
                  <strong>Contact Number:</strong> {complaint.contactNumber}
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



