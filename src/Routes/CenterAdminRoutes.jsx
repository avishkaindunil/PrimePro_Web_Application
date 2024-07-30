import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/CenterAdmin/Dashboard'

const CenterAdminRoutes = () => {
  return (
    <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default CenterAdminRoutes
