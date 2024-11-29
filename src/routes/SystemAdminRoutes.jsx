import { Routes, Route } from "react-router-dom";

import MainDashboard from "../pages/systemAdmin/Maindashboard"
import TechnicalSupport from "../pages/systemAdmin/TechnicalSupport";
import DataAnalytics from "../pages/systemAdmin/DataAnalytics";

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
