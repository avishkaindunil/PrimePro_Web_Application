import { useEffect, useState } from 'react';
import Card from '../../components/CarWashCenter/Card';
import Button from '../../components/CarWashCenter/Button';
import TaskDistribution from '../../components/CarWashCenter/TaskDistribution';
import WorkloadProgress from '../../components/CarWashCenter/WorkloadProcess';
import { Link } from 'react-router-dom';
import EmployeePerformanceChart from '../../components/CarWashCenter/EmployeePerformance';
import { publicAuthRequest } from '../../constants/requestMethods';

function MainDashboard() {
  const userId = localStorage.getItem("user_id");
  const [items, setItems] = useState([]);

  const fetchCenterName = async () => {
    try {
      const response = await publicAuthRequest.get(`/centerAdmin/get-center/${userId}`);
      localStorage.setItem("CENTER", response.data);

    } catch (error) {
      console.log("Error fetching data: ", error)
    }
  }

  const fetchBookingDetails = async () => {
    try {
      const response = await publicAuthRequest.get(`/centerAdmin/get-workload-progress`);
      console.log(response.data);
      if (response.data) {
        setItems(response.data)
      }
    } catch (error) {
      console.log("Error fetching data: ", error)
    }
  }

  let completedBookings = items.filter(item => item[9] === "DONE");
  let acceptedBookings = items.filter(item => item[9] === "ACCEPTED");
  let OngoingBookings = items.filter(item => item[9] === "PENDING");

  useEffect(() => {
    fetchCenterName();
    fetchBookingDetails();
  }, []);
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* <h1 className="mb-1 text-2xl font-bold">Car Wash Center Manager Dashboard</h1> */}
      <div className='min-h-screen p-6 bg-gray-100'>
        <h3 className='mb-6 text-2xl font-bold'>Day Summary</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
          <Card
            title="📅 Today's Bookings"
            value={items.length}
            icon={<i className="fas fa-calendar-alt text-black text-2xl mr-3"></i>} // Black icon
          />
          <Card title="✅ Services Completed Today" value={completedBookings.length} icon={<i className="fas fa-check"></i>} />
          <Card title="🛒 Services On-going Today" value={OngoingBookings.length} icon={<i className="fas fa-box"></i>} />
          <Card title="👥 Employees on Duty" value="10" icon={<i className="fas fa-users"></i>} />
        </div>

        <div className="grid h-20 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link to={`/carwashcenteradmin/addemployee`} className='text-center'><Button >Add Employee</Button></Link>
          <Link to={'/carwashcenteradmin/scheduleservice'} className='text-center'><Button>Schedule Service</Button></Link>
          <Link to={`/carwashcenteradmin/taskassign`} className='text-center'><Button>Task Assign </Button></Link>
          <Link to={'/carwashcenteradmin/leaverequest'} className='text-center'><Button>Leave Request</Button></Link>
        </div>
        <div className="grid justify-center grid-cols-1 gap-6 mt-10 md:grid-cols-2 snap-center size-full ">
          {/* <WorkloadProgress /> */}
          <TaskDistribution />
          <EmployeePerformanceChart />
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;

//   )
// }



