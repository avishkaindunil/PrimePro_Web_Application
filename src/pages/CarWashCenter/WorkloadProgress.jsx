import React, { useState } from 'react'
import WorkProgress from '../../components/CarWashCenter/WorkProgress'

const WorkloadProgress = () => {

  const items=[
    {name:"car",status:"pending",employees:["employee1","employee2","employee3"],starttime:8,endtime:10},
    {name:"van",status:"accepted",employees:["employee1","employee2"],starttime:8,endtime:10},
    {name:"bus",status:"done",employees:["employee1","employee2","employee3"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2","employee3"],starttime:8,endtime:10},
    {name:"item1",status:"pending",employees:["employee1"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2","employee3"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2","employee3"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2","employee3"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2","employee3"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2","employee3"],starttime:8,endtime:10}
  ];
  const [Items,setItems] = useState(items);
  const [currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 4; //Numbers of items per page


  const onSerach =(e)=>{
    // console.log(e.target.value);
    setItems(items.filter(item=>item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())));
    // e.preventDefault();
    
  }
  
  const paginatedItems = Items.slice(
    (currentPage -1)*itemsPerPage,
    currentPage*itemsPerPage
  );

  const handlePageChange = (pageNumber)=>{
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(Items.length/itemsPerPage);
  
  return (
    <div>
      <h1 className="text-xl font-bold">Workload Progress</h1>
      <input className="p-2 m-3 rounded-md w-[55%]" type='text' placeholder='search for a booking...' onChange={onSerach}/>
      {paginatedItems.map((item)=>(
        <WorkProgress item={item}/>
      ))}
      
      <div>
      {/* {Array.from({ length: totalPages }, (_, index) => (
        <button 
          key={index} 
          onClick={() => handlePagesChange(index+1)} // Adjust to page number (1-based)
        >
          {index + 1}
        </button>
      ))} */}
      <div className="mr-[400px] text-end">
        <button 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="p-2 m-2 bg-gray-300 rounded-md"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="p-2 m-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
        
      </div>
    </div>
  )
}

export default WorkloadProgress
