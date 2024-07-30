import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Dashboard from '../Pages/Employee/EmployeeDashboard'

const EmployeeRoutes = () => {
  return (
    <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default EmployeeRoutes
