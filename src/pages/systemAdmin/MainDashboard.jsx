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







import React from 'react'
import Card from '../../components/CarWashCenter/Card'
import Button from '../../components/CarWashCenter/Button'
import ComplaintHandling from '../../components/SystemAdmin/ComplaintHandling'// Placeholder component
import SystemSecurity from '../../components/SystemAdmin/SystemSecurity'; // Placeholder component
import DataAnalytics from '../../components/SystemAdmin/DataAnalytics' // Placeholder component

export default function SystemAdminDashboard() {
  return (

    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">System Admin Dashboard</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Pending Complaints" value="12" icon={<i className="fas fa-exclamation-circle"></i>} />
        <Card title="System Uptime" value="99.98%" icon={<i className="fas fa-server"></i>} />
        <Card title="Active Users" value="345" icon={<i className="fas fa-users"></i>} />
        <Card title="Security Alerts" value="2" icon={<i className="fas fa-shield-alt"></i>} />
        <Card title="Data Reports" value="23" icon={<i className="fas fa-chart-bar"></i>} />
        <Card title="Integrations" value="5 Active" icon={<i className="fas fa-plug"></i>} />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        <Button>Handle Complaints</Button>
        <Button>Monitor System Security</Button>
        <Button>Policy Development</Button>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Complaint Handling Section */}
        <ComplaintHandling />
        
        {/* System Security Section */}
        {/* <SystemSecurity /> */}

        {/* Data Analytics Section */}
        <DataAnalytics />
      </div>
    </div>
  );

}

export default SystemAdminDashboard;
