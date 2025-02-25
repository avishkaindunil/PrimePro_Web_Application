
import { Route, Routes } from 'react-router-dom'
import MainDashboard from '../pages/CarWashCenter/MainDashboard'
import EmployeeManagement from '../pages/CarWashCenter/EmployeeManagement';
import BookingCalendar from '../pages/CarWashCenter/BookingCalendar';
import TasksAssign from '../pages/CarWashCenter/TasksAssign';
import WorkloadProgress from '../pages/CarWashCenter/WorkloadProgress';
import CustomSupport from '../pages/CarWashCenter/CustomSupport';
import EmployeeDetail from '../pages/CarWashCenter/EmployeeDetail';
import Settings from '../pages/CarWashCenter/Settings';
import AddEmployee from '../pages/CarWashCenter/AddEmployee';
import LeaveRequest from '../pages/CarWashCenter/LeaveRequest';
import ScheduleService from '../pages/CarWashCenter/ScheduleService';
import AllLeave from '../pages/CarWashCenter/AllLeave';
import ReportCharts from '../components/CarWashCenter/ReportCharts';
import AttendanceApproval from '../pages/CarWashCenter/AttendanceApproval';

const CarWashCenterRoutes = () => {
  return (
    <Routes>
        <Route index element={<MainDashboard/>}/>
        <Route path='/dashboard' element={<MainDashboard/>}/>
        <Route path='/bookingCalender' element={<BookingCalendar/>}/>
        <Route path='/employees' element={<EmployeeManagement/>}/>
        <Route path='/employees/:id' element={<EmployeeDetail/>}/>
        <Route path='/addemployee' element={<AddEmployee/>}/>
        <Route path='/taskAssign' element={<TasksAssign/>}/>
        <Route path='/workloadProgress' element={<WorkloadProgress/>}/>
        <Route path='/reports' element={<CustomSupport/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/leaverequest' element={<LeaveRequest/>}/>
        <Route path='/scheduleservice' element={<ScheduleService/>}/>
        <Route path='/allleaverequests' element={<AllLeave/>}/>
        <Route path='/attendanceApproval' element={<AttendanceApproval/>}/>

        {/* <Route path='/report' element={<ReportCharts/>}/> */}
    </Routes>
  )
}

export default CarWashCenterRoutes;


