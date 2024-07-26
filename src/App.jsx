// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
import CarWashCenterAdminRoutes from './routes/CarWashCenterRoutes';
import EmployeeRoutes from './routes/EmployeeRoutes';
import MainLayout from './components/MainLayout';

const userType = 'CarWashCenterAdmin'; 

function App() {
  return (
    <BrowserRouter>
      <MainLayout userType={userType}>
        <Routes>
          
          {userType === "CarWashCenterAdmin" && <Route path='/*' element={<CarWashCenterAdminRoutes />} />}
          {userType === "Employee" && <Route path='/*' element={<EmployeeRoutes />} />}
          
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;















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
// //    <h1 className="text-3xl font-bold bg-red-500 underline">
// //       Hello world!
// //     </h1>
// //     </>
// //   )
// // }


