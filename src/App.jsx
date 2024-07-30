// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import AppHeader from "./Components/Header";
// import SideBar from "./Components/SideBar";
// import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
// import CenterAdminRoutes from "./Routes/CenterAdminRoutes";
// import EmployeeRoutes from "./Routes/EmployeeRoutes";
// import MainLayout from "./Components/MainLayout";
// import Dashboard from "./Pages/CenterAdmin/Dashboard";
// import LoginPage from "./auth/Loginpage";
// import RegistrationPage from "./auth/Registrationpage";
// import NewDashboard from "./Pages/CenterAdmin/NewDashboard.";
// import AdminRoute from "./Routes/AdminRoute";

// function App() {
//   return (
//     <>
    
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />

//           <Route path="/*" element={<LoginPage />} />

//           <Route path="/login" element={<LoginPage />} />

//           <Route path="/registration" element={<RegistrationPage />} />

//           <Route
//             path="/CenterAdmin/Dashboard"
//             element={<AdminRoute element={Dashboard} />}
//           />
//           <Route
//             path="/CenterAdmin/NewDashboard"
//             element={<AdminRoute element={NewDashboard} />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;


// import { useState, useEffect } from "react";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import LoginPage from "./auth/Loginpage";
// import RegistrationPage from "./auth/Registrationpage";
// import MainLayout from "./Components/MainLayout";
// import Dashboard from "./Pages/CenterAdmin/Dashboard";
// import NewDashboard from "./Pages/CenterAdmin/NewDashboard.";
// import EmployeeDashboard from "./Pages/Employee/EmployeeDashboard";

// import AdminRoute from "./Routes/AdminRoute";

// function App() {
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const userRole = localStorage.getItem("role");
//     if (userRole) {
//       setRole(userRole);
//     }
//   }, []);

//   return (
//     <>
//       <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage setRole={setRole} />} />
//         <Route path="/login" element={<LoginPage setRole={setRole} />} />
//         <Route path="/registration" element={<RegistrationPage />} />

//         {role && (
//           <Route
//             path="/"
//             element={
//               <MainLayout userType={role}>
//                 <Routes>
//                   <Route
//                     path="/CenterAdmin/Dashboard"
//                     element={
                     
//                         <Dashboard />
                      
//                     }
//                   />
//                   <Route
//                     path="/CenterAdmin/NewDashboard"
//                     element={
//                       <AdminRoute>
//                         <NewDashboard />
//                       </AdminRoute>
//                     }
//                   />
//                   <Route
//                     path="/Employee/Dashboard"
//                     element={<EmployeeDashboard />}
//                   />
//                   <Route
//                     path="/NewUser/Dashboard"
//                     element={<NewUserDashboard />}
//                   />
//                 </Routes>
//               </MainLayout>
//             }
//           />
//         )}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//     </>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import MainLayout from "./Components/MainLayout";
// import CenterAdminRoutes from "./Routes/CenterAdminRoutes";
// import EmployeeRoutes from "./Routes/EmployeeRoutes";
// import LoginPage from "./auth/Loginpage";
// import RegistrationPage from "./auth/Registrationpage";
// import EmployeeDashboard from "./Pages/Employee/EmployeeDashboard";

// function App({ userType }) {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/*" element={<LoginPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/registration" element={<RegistrationPage />} />

//         {userType === "ADMIN" && (
//           <Route
//             path="/CenterAdmin/*"
//             element={<MainLayout userType={userType} />}
//           >
//             <Route
//               path="Dashboard"
//               element={<AdminRoute element={Dashboard} />}
//             />
//             <Route
//               path="NewDashboard"
//               element={<AdminRoute element={NewDashboard} />}
//             />
//           </Route>
//         )}

//         {userType === "EMPLOYEE" && (
//           <Route
//             path="/Employee/*"
//             element={<MainLayout userType={userType} />}
//           >
//             <Route
//               path="Dashboard"
//               element={<EmployeeDashboard />} // Add EmployeeDashboard component
//             />
//           </Route>
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import MainLayout from "./Components/MainLayout";
// import CenterAdminRoutes from "./Routes/CenterAdminRoutes";
// import EmployeeRoutes from "./Routes/EmployeeRoutes";
// import LoginPage from "./auth/Loginpage";
// import RegistrationPage from "./auth/Registrationpage";
// import AdminRoute from "./Routes/AdminRoute";
// import Dashboard from "./Pages/CenterAdmin/Dashboard";
// import EmployeeDashboard from "./Pages/Employee/EmployeeDashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/*" element={<LoginPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/registration" element={<RegistrationPage />} />

//         <Route path="/CenterAdmin/*" element={<MainLayout userType="ADMIN" />}>
//           <Route path="Dashboard" element={<Dashboard />} />
//         </Route>

//         <Route path="/Employee/*" element={<MainLayout userType="EMPLOYEE" />}>
//           <Route path="Dashboard" element={<EmployeeDashboard />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import LoginPage from "./auth/Loginpage";
import RegistrationPage from "./auth/Registrationpage";
import Dashboard from "./Pages/CenterAdmin/Dashboard";
import EmployeeDashboard from "./Pages/Employee/EmployeeDashboard";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />

        <Route path="/CenterAdmin/*" element={<PrivateRoute userType="ADMIN"><MainLayout userType="ADMIN" /></PrivateRoute>}>
          <Route path="Dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/Employee/*" element={<PrivateRoute userType="EMPLOYEE"><MainLayout userType="EMPLOYEE" /></PrivateRoute>}>
          <Route path="Dashboard" element={<EmployeeDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
