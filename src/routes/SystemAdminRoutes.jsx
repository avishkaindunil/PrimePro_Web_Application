import { Routes, Route } from "react-router-dom";


import TechnicalSupport from "../pages/systemAdmin/TechnicalSupport";
import DataAnalytics from "../pages/systemAdmin/DataAnalytics";
import ViewComplaints from "../pages/systemAdmin/Complaints";
import PolicyDevelopmentPage from "../pages/systemAdmin/PolicyDevelopment";
import MonitorSystemSecurity from "../pages/systemAdmin/MonitorSystemSecurity";
import MainDashboard from "../pages/systemAdmin/Maindashboard";
import CarCenters from "../pages/systemAdmin/CarCenters";
import Reports from "../pages/systemAdmin/Reports";
import Users from "../pages/systemAdmin/Users";
import EmployeesReport from "../pages/systemAdmin/EmployeesReport";
import AttendanceReport from "../pages/systemAdmin/AttendanceReport";

const SystemAdminRoutes = () => {
    return (
      <Routes>
          <Route path='/dashboard' element={<MainDashboard/>}/>
          <Route path='/carCenters' element={<CarCenters/>}/>
          <Route path='/technicalSupport' element={<TechnicalSupport/>}/>
          <Route path='/dataAnalytics' element={<DataAnalytics/>}/>
          <Route path='/complaints' element={<ViewComplaints/>}/>
          <Route path='/policyDevelopment' element={<PolicyDevelopmentPage/>}/>
          <Route path='/monitorSystemSecurity' element={<MonitorSystemSecurity/>}/>
          <Route path='/reports' element={<Reports/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/employeesReport' element={<EmployeesReport/>} />
          <Route path='attendanceReport' element={<AttendanceReport/>} />
      </Routes>
    )
  }

  export default SystemAdminRoutes;
