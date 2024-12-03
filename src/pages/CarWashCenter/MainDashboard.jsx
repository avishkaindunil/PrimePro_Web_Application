import React from 'react';
import Card from '../../components/CarWashCenter/Card';
import Button from '../../components/CarWashCenter/Button';
import TaskDistribution from '../../components/CarWashCenter/TaskDistribution';
import WorkloadProgress from '../../components/CarWashCenter/WorkloadProcess';
import { Link } from 'react-router-dom';


// const Dashboard = () => {
//   return (

//     <>
//         <h1> Admin Dashboard</h1>
//     </>
    
   
    
    function MainDashboard() {
      return (
        <div className="min-h-screen p-6 bg-gray-100">
          <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
            <Card title="Total Bookings" value="100" icon={<i className="fas fa-calendar-alt"></i>} />
            <Card title="Completed Service" value="90" icon={<i className="fas fa-check"></i>} />
            <Card title="Active Employee" value="10" icon={<i className="fas fa-users"></i>} />
            <Card title="Inventory" value="Normal" icon={<i className="fas fa-box"></i>} />
          </div>
          <div className="grid h-20 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link to={`/carwashcenteradmin/addemployee`} className='text-center'><Button >Add Employee</Button></Link>
            <Link to={''}  className='text-center'><Button>Schedule Service</Button></Link>
            <Link to={`/carwashcenteradmin/taskassign`}  className='text-center'><Button>Task Assign </Button></Link>
            <Link to={'/carwashcenteradmin/leaverequest'}  className='text-center'><Button>Leave Request</Button></Link>
          </div>
          <div className="grid justify-center grid-cols-1 gap-6 mt-10 md:grid-cols-2 snap-center size-full ">
            <WorkloadProgress />
            <TaskDistribution />
          </div>
        </div>
      );
    }
    
  export default MainDashboard;
    
//   )
// }



