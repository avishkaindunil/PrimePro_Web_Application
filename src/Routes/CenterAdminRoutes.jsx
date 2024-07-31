import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainDashboard from '../Pages/CarWashCenter/MainDashboard'
import BookingCalendar from '../Pages/CarWashCenter/BookingCalendar'
import EmployeeManagement from '../Pages/CarWashCenter/EmployeeManagement'
// import EmployeeDetail from '../Pages/CarWashCenter/EmployeeDetail'
import TasksAssign from '../Pages/CarWashCenter/TasksAssign'
import WorkloadProgress from '../Pages/CarWashCenter/WorkloadProgress'
import CustomSupport from '../Pages/CarWashCenter/CustomSupport'
import NewDashboard from '../Pages/CarWashCenter/NewDashboard.'



const CenterAdminRoutes = () => {
  return (
    <Routes>
        <Route path='/dashboard' element={<MainDashboard/>}/>
        <Route path='/newdashboard' element={<NewDashboard/>}/>
        <Route path='/bookingCalendar' element={<BookingCalendar/>}/>
        <Route path='/employee' element={<EmployeeManagement/>}/>
        {/* <Route path='/employees/:id' element={<EmployeeDetail/>}/> */}
        <Route path='/taskAssign' element={<TasksAssign/>}/>
        <Route path='/workloadProgress' element={<WorkloadProgress/>}/>
        <Route path='/customSupport' element={<CustomSupport/>}/>
        
   
    </Routes>
  )
}

export default CenterAdminRoutes
