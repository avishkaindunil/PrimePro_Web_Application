
import { Route, Routes } from 'react-router-dom'
import MainDashboard from '../pages/CarWashCenter/MainDashboard'

const CarWashCenterRoutes = () => {
  return (
    <Routes>
        <Route path='/MainDashboard' element={<MainDashboard/>}/>
    </Routes>
  )
}

export default CarWashCenterRoutes;