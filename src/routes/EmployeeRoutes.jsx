import { Route ,Routes} from 'react-router-dom'
import MainDashboard from '../Pages/Employee/MainDashboard'
import CustomSupport from '../Pages/Employee/CustomSupport'
import Profile from '../Pages/Employee/Profile'
import Calendar from '../Pages/Employee/Calendar'
import Payroll from '../Pages/Employee/Payroll'

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