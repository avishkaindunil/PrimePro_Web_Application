import { Route ,Routes} from 'react-router-dom'
import MainDashboard from '../pages/Employee/MainDashboard'
import CustomSupport from '../pages/Employee/CustomSupport'
import Profile from '../pages/Employee/Profile'
import Calendar from '../pages/Employee/Calendar'
import Payroll from '../pages/Employee/Payroll'

const EmployeeRoutes = () => {
  return (
    <Routes>
        <Route path='/dashboard' element={<MainDashboard />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/calendar' element={<Calendar />}/>
        <Route path='/payroll' element={<Payroll />}/>
        <Route path='/customSupport' element={<CustomSupport />}/>
    </Routes>
  )
}

export default EmployeeRoutes