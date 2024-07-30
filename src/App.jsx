
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppHeader from "./Components/Header";
import SideBar from "./Components/SideBar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import CenterAdminRoutes from "./Routes/CenterAdminRoutes";
import EmployeeRoutes from "./Routes/EmployeeRoutes";
import MainLayout from "./Components/MainLayout";
import Dashboard from "./Pages/CenterAdmin/Dashboard";
import LoginPage from "./auth/Loginpage";
import RegistrationPage from "./auth/Registrationpage";
import NewDashboard from "./Pages/CenterAdmin/NewDashboard.";
import AdminRoute from "./Routes/AdminRoute";

function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/*" element={<LoginPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/registration" element={<RegistrationPage />} />

          <Route
            path="/CenterAdmin/Dashboard"
            element={<AdminRoute element={Dashboard} />}
          />
          <Route
            path="/CenterAdmin/NewDashboard"
            element={<AdminRoute element={NewDashboard} />}
          />
        </Routes>
      </BrowserRouter>
    </>

// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
import CarWashCenterAdminRoutes from "./routes/CarWashCenterRoutes";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Auth/Login";
import RegisterNavigation from "./pages/Auth/RegisterNavigation";

const userType = "CarWashCenterAdmin";
// const isLogin = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {!userType ? (
          <>
            <Route path="*" element={<Login />} />
            <Route path="/register" element={<RegisterNavigation />} />
          </>
        ) : (
          <Route path="/*" element={<MainLayout userType={userType} />}>
            {userType === "CarWashCenterAdmin" && (
              <Route
                path="CarWashCenterAdmin/*"
                element={<CarWashCenterAdminRoutes />}
              />
            )}
            {userType === "Employee" && (
              <Route path="employee/*" element={<EmployeeRoutes />} />
            )}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>

  );
}

export default App;


// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from './components/common/Navbar';
// import LoginPage from './components/auth/LoginPage';
// import RegistrationPage from './components/auth/RegistrationPage';
// import FooterComponent from './components/common/Footer';
// import UserService from './components/service/UserService';
// import UpdateUser from './components/userspage/UpdateUser';
// import UserManagementPage from './components/userspage/UserManagementPage';
// import ProfilePage from './components/userspage/ProfilePage';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import {MainDashboard } from '../pages'
// // import MainDashboard from './pages/CarWashCenter/MainDashboard';
// // import BookingCalendar from './pages/CarWashCenter/BookingCalendar';
// // import EmployeeManagement from './pages/CarWashCenter/EmployeeManagement';
// // import WorkloadProgress from './pages/CarWashCenter/WorkloadProgress';
// // import TasksAssign from './pages/CarWashCenter/TasksAssign';
// // import CustomSupport from './pages/CarWashCenter/CustomSupport';
// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';
// import AppHeader from './components/Header'
// import SideBar from './components/Sidebar'
// import CarWashCenterAdminRoutes from './routes/CarWashCenterRoutes'
// import EmployeeRoutes from './routes/EmployeeRoutes'
// import MainLayout from './components/MainLayout'

// const userType ='CenterAdmin';


// function App() {

//   return (

//     <BrowserRouter>
//       <div className="App">
//         <Navbar />
//         <div className="content">
//           <Routes>
//             <Route exact path="/" element={<LoginPage />} />
//             <Route exact path="/login" element={<LoginPage />} />
//             <Route path="/profile" element={<ProfilePage />} />

//
//             {UserService.adminOnly() && (
//               <>
//                 <Route path="/register" element={<RegistrationPage />} />
//                 <Route path="/admin/user-management" element={<UserManagementPage />} />
//                 <Route path="/update-user/:userId" element={<UpdateUser />} />
//               </>
//             )}
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </div>
//         <FooterComponent />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

// <Routes>
//           <Route path="/" element={<MainLayout userType={userType} />}>
//             {userType === "CenterAdmin" && (
//               <Route path="/*" element={<CenterAdminRoutes />} />
//             )}
//             {userType === "Employee" && (
//               <Route path="/*" element={<EmployeeRoutes />} />
//             )}
//           </Route>
//           <Route path="/login" element={<LoginPage/>} />
//         </Routes>

//     <>
//     <BrowserRouter>

//         <Routes>
//           <Route path="/" element={<MainLayout userType={userType}/>}>
//               {userType ==="CarWashCenterAdmin" &&<Route path='/*' element={<CarWashCenterAdminRoutes/>}/>}
//               {userType ==="Employee" && <Route path='/*' element={<EmployeeRoutes/>}/>}
//             </Route>
//         </Routes>

//     </BrowserRouter>
//     </>

//   );
// };

// export default App;

// // export default function App() {
// //   return (
// //     <div>
// //       <BrowserRouter>
// //         <Routes>
// //           <Route index element={<MainDashboard />} />
// //           <Route path="/main-dashboard" element={<MainDashboard />} />
// //           <Route path="/booking-calendar" element={<BookingCalendar />} />
// //           <Route path="/employee-management" element={<EmployeeManagement />} />
// //           <Route path="/workload-progress" element={<WorkloadProgress />} />
// //           <Route path="/tasks-assign" element={<TasksAssign />} />
// //           <Route path="/custom-support" element={<CustomSupport />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </div>
// //   )
// // }

// // function AppOne() {

// //   return (
// //     <>
// //    <h1 className="text-3xl font-bold underline bg-red-500">
// //       Hello world!
// //     </h1>
// //     </>
// //   )
// // }

