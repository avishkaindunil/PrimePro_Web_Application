import { useState } from 'react';
import React from 'react'
import EmpCategory from '../../components/CarWashCenter/EmpCategory';
import EmployeeRow from '../../components/CarWashCenter/EmployeeRow';

const EmployeeManagement = () => {

  const [activeDivision, setActiveDivision] = useState(null);


  const EmployeeDivitions =[
    {name:"Service Area"},
    {name:"Casher Area"},
    {name:"Stock Area"}
  ];
  
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Employees</h1>
        <div className="flex items-center justify-center">
          {EmployeeDivitions.map((item, index)=>(
            <EmpCategory 
            key={index} 
            item={item}
            isActive = {activeDivision===index}
            onClick ={()=>setActiveDivision(index)}
            />
          ))}
        </div>
        <div className="flex justify-between space-x-10">
          <div className="w-3/4 px-10 py-4 space-y-2 bg-white rounded-lg shadow-inner mt-7">
            <EmployeeRow/>
            <EmployeeRow/>
            <EmployeeRow/>
            <EmployeeRow/>
            <EmployeeRow/>
          </div>
          <div className="w-1/4 p-4 bg-white rounded-lg shadow-inner mt-7">ammount</div>
        </div>
      </div>
    </>
  )
}

export default EmployeeManagement
