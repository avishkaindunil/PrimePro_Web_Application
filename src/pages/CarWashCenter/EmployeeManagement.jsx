import { useState } from 'react';
import React from 'react'
import EmpCategory from '../../components/CarWashCenter/EmpCategory';
import EmployeeRow from '../../components/CarWashCenter/EmployeeRow';
import EmpAmount from '../../components/CarWashCenter/EmpAmount';

const EmployeeManagement = () => {


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
    { id: 6, name: "John Doe", division: "Service Area" },
    { id: 7, name: "Jane Smith", division: "Casher Area" },
    { id: 8, name: "Jim Brown", division: "Stock Area" },
    { id: 9, name: "Jake White", division: "Service Area" },
    { id: 10, name: "Jill Black", division: "Stock Area" },
    { id: 11, name: "John Doe", division: "Service Area" },
    { id: 12, name: "Jane Smith", division: "Casher Area" },
    { id: 13, name: "Jim Brown", division: "Stock Area" },
    { id: 14, name: "Jake White", division: "Service Area" },
    { id: 15, name: "Jill Black", division: "Stock Area" }
  ];
  const [employees, setEmployees] = useState(allEmployees);
  const [activeDivision, setActiveDivision] = useState(null);
  const [divisionAmount,SetDivisionAmount] = useState(0);
  const [currentPage,setCurrentPage] =useState(1);
  const itemsPerPage = 3;


  const paginatedEmployees = employees.slice(
    (currentPage -1)*itemsPerPage,
    currentPage*itemsPerPage
  );

  const handlePageChange = (pageNumber)=>{
    setCurrentPage(pageNumber);
  };
  
  //set employees according to selected division
  const onClickEmployeeDivision =(index)=>{
    setActiveDivision(index);
    const selectedDivision = EmployeeDivitions[index].name;
    const filteredEmployees = allEmployees.filter(emp => emp.division ===selectedDivision);
    setEmployees(filteredEmployees);
    SetDivisionAmount(filteredEmployees.length)
  };
  
  const onSearch=(e)=>{
    setEmployees(allEmployees.filter(employee=>employee.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())));
  }

  const totalPages = Math.ceil(employees.length/itemsPerPage);
  
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Employees</h1>
        <div className="flex">
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
          <div className=" w-[70%] px-8 space-y-5  bg-white rounded-lg shadow-inner py-7 mt-7 pt-10">
          <input className="p-2 ml-10 rounded-md mb-5 bg-slate-200 w-[80%]" type='text' placeholder='search for a booking...' onChange={onSearch}/>
            {paginatedEmployees.length ? (paginatedEmployees.map(emp =>(
              <EmployeeRow key ={emp.id} employee={emp}/>
            ))):null}

            {employees.length > 0 ? (
                      <div className="ml-[450px] text-end">
                        <button 
                          disabled={currentPage === 1} 
                          onClick={() => handlePageChange(currentPage - 1)} 
                          className="p-2 m-2 bg-[#203aac] rounded-md text-[white]"
                        >
                          Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button 
                          disabled={currentPage === totalPages} 
                          onClick={() => handlePageChange(currentPage + 1)} 
                          className="p-2 m-2 bg-[#203aac] rounded-md text-[white]"
                        >
                          Next
                        </button>
                      </div>
                    ) : (
                      <div className="pl-32 text-xl italic opacity-50">No Employee available</div>  // Add an alternative UI here if necessary
                    )}
            
          </div>
          <div className="flex-col items-center justify-center w-[35%] h-full p-5 bg-white rounded-lg shadow-inner space-y-7 mt-7">
            <EmpAmount text={"Total employees"} empAmount={allEmployees.length}/>
            <EmpAmount text={"Onsite employees"} empAmount={allEmployees.length}/>
            {divisionAmount ? (<EmpAmount text={`${EmployeeDivitions[activeDivision].name} Employees`} empAmount={employees.length}/>
            ) : (console.log("No selected division"))}
          </div>
          
        </div>
        
      </div>
      
    </>
  )
}

export default EmployeeManagement
