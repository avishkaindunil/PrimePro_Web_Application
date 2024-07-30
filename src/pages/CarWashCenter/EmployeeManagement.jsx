import { useState } from 'react';
import React from 'react'
import EmpCategory from '../../components/CarWashCenter/EmpCategory';
import EmployeeRow from '../../components/CarWashCenter/EmployeeRow';
import EmpAmount from '../../components/CarWashCenter/EmpAmount';

const EmployeeManagement = () => {

  const [activeDivision, setActiveDivision] = useState(null);
  const [employees, setEmployees] = useState([]);

  const EmployeeDivitions =[
    {name:"Service Area"},
    {name:"Casher Area"},
    {name:"Stock Area"}
  ];

  //example employees
  const allEmployees = [
    { id: 1, name: "John Doe", division: "Service Area" },
    { id: 2, name: "Jane Smith", division: "Casher Area" },
    { id: 3, name: "Jim Brown", division: "Stock Area" },
    { id: 4, name: "Jake White", division: "Service Area" },
    { id: 5, name: "Jill Black", division: "Stock Area" },
  ];

  //set employees according to selected division
  const onClickEmployeeDivision =(index)=>{
    setActiveDivision(index);
    const selectedDivision = EmployeeDivitions[index].name;
    const filteredEmployees = allEmployees.filter(emp => emp.division ===selectedDivision);
    setEmployees(filteredEmployees);
  };
  
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
            onClick ={()=>onClickEmployeeDivision(index)}
            />
          ))}
        </div>
        <div className="flex justify-between space-x-10">
          <div className="w-3/4 px-10 py-4 space-y-2 bg-white rounded-lg shadow-inner mt-7">
            {employees.length ? (employees.map(emp =>(
              <EmployeeRow key ={emp.id} employee={emp}/>
            ))):(allEmployees.map(emp =>(
              <EmployeeRow key = {emp.id} employee={emp}/>
            )))}
            
          </div>
          <div className="w-1/4 p-4 bg-white rounded-lg shadow-inner space-y-7 mt-7">
            <EmpAmount text={"Total employees"} empAmount={allEmployees.length}/>
            {employees.length ? (<EmpAmount text={`${EmployeeDivitions[activeDivision].name} Employees`} empAmount={employees.length}/>
            ) : (console.log("No selected division"))}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeManagement
