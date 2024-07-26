import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppHeader from './Components/Header'
import SideBar from './Components/SideBar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import CenterAdminRoutes from './Routes/CenterAdminRoutes'
import EmployeeRoutes from './Routes/EmployeeRoutes'
import MainLayout from './Components/MainLayout'
import Dashboard from './Pages/CenterAdmin/Dashboard'


const userType ='CenterAdmin';

function App() {

  return (
    <>
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<MainLayout userType={userType}/>}>
              {userType ==="CenterAdmin" &&<Route path='/*' element={<CenterAdminRoutes/>}/>}
              {userType ==="Employee" && <Route path='/*' element={<EmployeeRoutes/>}/>}
            </Route>
        </Routes>
    
    </BrowserRouter>
    </>
         
    
    
  );
};

export default App
