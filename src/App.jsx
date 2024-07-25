import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import {MainDashboard } from '../pages'
import MainDashboard from './pages/MainDashboard';
import BookingCalendar from './pages/BookingCalendar';
import EmployeeManagement from './pages/EmployeeManagement';
import WorkloadProgress from './pages/WorkloadProgress';
import TasksAssign from './pages/TasksAssign';
import CustomSupport from './pages/CustomSupport';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainDashboard />} />
          <Route path="/main-dashboard" element={<MainDashboard />} />
          <Route path="/booking-calendar" element={<BookingCalendar />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
          <Route path="/workload-progress" element={<WorkloadProgress />} />
          <Route path="/tasks-assign" element={<TasksAssign />} />
          <Route path="/custom-support" element={<CustomSupport />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

// function AppOne() {

//   return (
//     <>
//    <h1 className="text-3xl font-bold bg-red-500 underline">
//       Hello world!
//     </h1>
//     </>
//   )
// }


