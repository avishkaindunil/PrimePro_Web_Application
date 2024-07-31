
import { Route, Routes } from 'react-router-dom'
import MainDashboard from '../Pages/CarWashCenter/MainDashboard'

const CarWashCenterRoutes = () => {
  return (
    <Routes>
        <Route path='/dashboard' element={<MainDashboard/>}/>
    </Routes>
  )
}

export default CarWashCenterRoutes;