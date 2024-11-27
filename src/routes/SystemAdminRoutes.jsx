import { Routes, Route } from "react-router-dom";

import MainDashboard from "../pages/systemAdmin/MainDashboard"

const SystemAdminRoutes = () => {
    return (
      <Routes>
          <Route path='/dashboard' element={<MainDashboard/>}/>
          
      </Routes>
    )
  }

  export default SystemAdminRoutes;