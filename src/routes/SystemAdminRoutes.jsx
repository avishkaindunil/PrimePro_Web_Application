import { Routes, Route } from "react-router-dom";

import MainDashboard from "../pages/SystemAdmin/Maindashboard"
import TechnicalSupport from "../pages/SystemAdmin/TechnicalSupport";
import DataAnalytics from "../pages/SystemAdmin/DataAnalytics";

const SystemAdminRoutes = () => {
    return (
      <Routes>
          <Route path='/dashboard' element={<MainDashboard/>}/>
          <Route path='/technicalSupport' element={<TechnicalSupport/>}/>
          <Route path='/dataAnalytics' element={<DataAnalytics/>}/>
      </Routes>
    )
  }

  export default SystemAdminRoutes;