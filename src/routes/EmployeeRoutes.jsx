import { Route ,Routes} from 'react-router-dom'
import MainDashboard from '../pages/Employee/MainDashboard'

const EmployeeRoutes = () => {
  return (
    <Routes>
        <Route path='/MainDashboard' element={<MainDashboard/>}/>
    </Routes>
  )
}

export default EmployeeRoutes