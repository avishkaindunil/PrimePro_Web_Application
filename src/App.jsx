import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import CenterAdminRoutes from "./Routes/CenterAdminRoutes";
import EmployeeRoutes from "./Routes/EmployeeRoutes";
import LoginPage from "./auth/Loginpage";
import RegistrationPage from "./auth/Registrationpage";
import AdminRoute from "./Routes/AdminRoute";

import Dashboard from "./Pages/CenterAdmin/Dashboard";
import EmployeeDashboard from "./Pages/Employee/EmployeeDashboard";
import PrivateRoute from "./Routes/PrivateRoute"; // Correct import path
import NewDashboard from "./Pages/CarWashCenter/NewDashboard.";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />

        <Route path="/CarWashCenter/*" element={<MainLayout userType="ADMIN" />}>
          <Route path="Dashboard" element={<PrivateRoute userType="ADMIN"><Dashboard /></PrivateRoute>} />
          <Route path="NewDashboard" element={<PrivateRoute userType="ADMIN"><NewDashboard/></PrivateRoute>} />
          <Route path="*" element={<CenterAdminRoutes />} />
        </Route>

        <Route path="/Employee/*" element={<MainLayout userType="EMPLOYEE" />}>
          <Route path="Dashboard" element={<PrivateRoute userType="EMPLOYEE"><EmployeeDashboard /></PrivateRoute>} />
          <Route path="*" element={<EmployeeRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

