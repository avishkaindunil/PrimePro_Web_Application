// import React from 'react';
// import Card from '../../components/CarWashCenter/Card';
// import Button from '../../components/CarWashCenter/Button';
// import TaskDistribution from '../../components/CarWashCenter/TaskDistribution';
// import WorkloadProgress from '../../components/CarWashCenter/WorkloadProcess';

// // const Dashboard = () => {
// //   return (

// //     <>
// //         <h1> Admin Dashboard</h1>
// //     </>

//     function MainDashboard() {
//       return (
//         <div className="min-h-screen p-6 bg-gray-100">
//           <h1 className="mb-6 text-2xl font-bold">System Admin Dashboard</h1>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 // ">
//             <Card title="Total Bookings" value="100" icon={<i className="fas fa-calendar-alt"></i>} />
//             <Card title="Completed Service" value="90" icon={<i className="fas fa-check"></i>} />
//             <Card title="Active Employee" value="10" icon={<i className="fas fa-users"></i>} />
//             <Card title="Inventory" value="Normal" icon={<i className="fas fa-box"></i>} />
//           </div>
//           <div className="grid h-20 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <Button >Add Employee</Button>
//             <Button>Schedule Service</Button>
//             <Button>Task Assign </Button>
//             <Button>Update Stock</Button>

//           </div>
//           <div className="grid justify-center grid-cols-1 gap-6 mt-10 md:grid-cols-2 snap-center size-full ">
//             <WorkloadProgress />
//             <TaskDistribution />
//           </div>
//         </div>
//       );
//     }

//   export default MainDashboard;

// //   )
// // }

import React, { useState, useEffect } from "react";
import Card from "../../components/CarWashCenter/Card";
import ComplaintHandling from "../../components/SystemAdmin/ComplaintHandling"; // Placeholder component
import DataAnalytics from "../../components/SystemAdmin/DataAnalytics"; // Placeholder component
import WorkloadProgress from "../../components/SystemAdmin/workloadProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MainDashboard() {
  const [carCenterCount, setCarCenterCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);

  const navigate = useNavigate();

  // Fetch counts from backend
  useEffect(() => {
    // Fetch car center count
    axios
      .get("/centerAdmin/get-all")
      .then((response) => setCarCenterCount(response.data.count))
      .catch((error) => console.error("Error fetching car center count:", error));

    // Fetch active user count
    axios
      .get("/api/users/activated-count")
      .then((response) => setActiveUserCount(response.data.count))
      .catch((error) => console.error("Error fetching active user count:", error));
  }, []);

  const goToReportsPage = () => {
    navigate("/systemAdmin/reports"); // Navigate to the reports page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">System Admin Dashboard</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Car Centers"
          value="4"
          icon={<i className="fas fa-server"></i>}
        />
        <Card
          title="Active Users"
          value="100"	
          icon={<i className="fas fa-users"></i>}
        />
        <div onClick={goToReportsPage} className="cursor-pointer">
          <Card
            title="Data Reports"
            value="5"
            icon={<i className="fas fa-chart-bar"></i>}
          />
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Complaint Handling Section */}
        <ComplaintHandling />

        {/* Data Analytics Section */}
        <DataAnalytics />
      </div>

      <div className="w-full mt-10">
        <WorkloadProgress />
      </div>
    </div>
  );
}
