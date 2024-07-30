import React from 'react';
import TaskDistribution from '../../Components/TaskDistribition';
import Card from '../../Components/Card';
import WorkloadProgress from '../../Components/WorkloadProgress';
import Button from '../../Components/Button';


// const Dashboard = () => {
//   return (

//     <>
//         <h1> Admin Dashboard</h1>
//     </>
    
   
    
    function Dashboard() {
      return (
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 
          ">
            <Card title="Total Bookings" value="100" icon={<i className="fas fa-calendar-alt"></i>} />
            <Card title="Completed Service" value="90" icon={<i className="fas fa-check"></i>} />
            <Card title="Active Employee" value="10" icon={<i className="fas fa-users"></i>} />
            <Card title="Inventory" value="Normal" icon={<i className="fas fa-box"></i>} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-20">
            <Button >Add Employee</Button>
            <Button>Schedule Service</Button>
            <Button>Task Assign </Button>
            <Button>Update Stock</Button>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 snap-center justify-center size-full ">
            <WorkloadProgress />
            <TaskDistribution />
          </div>
        </div>
      );
    }
    
  export default Dashboard;
    
//   )
// }