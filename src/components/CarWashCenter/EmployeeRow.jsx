import React from 'react'
import ProfilePic from '../../assets/profilepic.png'
import { useNavigate } from 'react-router-dom'

const EmployeeRow = ({employee}) => {

  const navigate = useNavigate();

  const handleViewClick =()=>{
    navigate(`/carwashcenteradmin/employees/${employee.id}`);
  }
  return (
    <>
        <div class="flex items-center justify-between bg-[#F7F7F7] shadow-md rounded-lg py-1 space-x-8 px-7">
            <img src={ProfilePic} alt="Profile Image" class="w-11 h-11 rounded-full object-cover mr-4"/>
                <div class="text-lg text-slate-500">{employee.name}</div>
            <button class="bg-blue-500 text-white rounded-full px-3 py-1" onClick={handleViewClick}>View Profile</button>
        </div>

    </>
  )
}

export default EmployeeRow
