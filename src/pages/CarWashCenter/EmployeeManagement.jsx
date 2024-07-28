import { useState } from 'react';
import React from 'react'
import EmpCategory from '../../components/CarWashCenter/EmpCategory';

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
        <div className="flex content-start">
          {EmployeeDivitions.map((item, index)=>(
            <EmpCategory 
            key={index} 
            item={item}
            isActive = {activeDivision===index}
            onClick ={()=>setActiveDivision(index)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default EmployeeManagement
