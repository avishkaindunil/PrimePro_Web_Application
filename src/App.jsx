import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import {MainDashboard } from '../pages'
import MainDashboard from './pages/MainDashboard';
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
          <Route path="/maindashboard" element={<MainDashboard />} />
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


