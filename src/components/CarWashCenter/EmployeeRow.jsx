import React from 'react'
import ProfilePic from '../../assets/profilepic.png'
import { useNavigate } from 'react-router-dom'

const EmployeeRow = ({employee}) => {
console.log(employee);

  const navigate = useNavigate();

  const handleViewClick =()=>{
    navigate(`/carwashcenteradmin/employees/${employee.employeeId}`);
  }
  return (
    <>
        <div class="flex items-center justify-between bg-[#F7F7F7] shadow-md rounded-lg py-2 space-x-8 pr-7 w-[90%] pl-10 ml-10 cursor-pointer hover:bg-slate-200" onClick={handleViewClick}>
            <img src={ProfilePic} alt="Profile Image" class="w-11 h-11 rounded-full object-cover mr-4"/>
                <div class="text-lg text-slate-500">{employee.name}</div>
                <div class="text-lg text-slate-500">{employee.employeeId}</div>
            {/* <button class="bg-[#203aac] text-white rounded-full px-3 py-1" onClick={handleViewClick}>View Profile</button> */}
        </div>

    </>
  )
}

export default EmployeeRow
