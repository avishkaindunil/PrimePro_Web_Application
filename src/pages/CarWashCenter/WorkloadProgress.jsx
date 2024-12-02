import React, { useState } from 'react'
import WorkProgress from '../../components/CarWashCenter/WorkProgress'

const WorkloadProgress = () => {

  const items=[
    {name:"car",status:"pending",employees:["employee1","employee2"],starttime:8,endtime:10},
    {name:"van",status:"accepted",employees:["employee1","employee2"],starttime:8,endtime:10},
    {name:"bus",status:"done",employees:["employee1","employee2"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2"],starttime:8,endtime:10},
    {name:"item1",status:"pending",employees:["employee1"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2"],starttime:8,endtime:10}
  ];
  const [Items,setItems] = useState(items);
  const [currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 4; //Numbers of items per page
  const [status,setStatus] = useState('');


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

  const getStatus = (status)=>{
    setStatus(status);
    setItems(items.filter(item=>item.status.toLocaleLowerCase()==status.toLocaleLowerCase()));
  }

  const totalPages = Math.ceil(Items.length/itemsPerPage);
  
  return (
    <div>
      <h1 className="text-xl font-bold">Workload Progress</h1>
      <div className="p-6 mt-5 ml-6 mr-6 bg-gray-200 rounded-2xl">
        <input className="p-2 ml-5 rounded-md w-[55%] mb-5" type='text' placeholder='search for a booking...' onChange={onSerach}/>
        <div className="flex ">
          <div className='w-[60%]'>
            {paginatedItems.map((item,index)=>(
              <WorkProgress key={index} item={item}/>
            ))}
          </div>
          <div className='w-[35%%] ml-10  align-middle justify-center items-center text-center'>
          <h1 className="text-2xl font-bold">Today Summery</h1>
          <div className="space-y-4">
          <div className="flex items-center justify-center py-5 m-3 space-x-8 align-middle rounded-lg bg-slate-300 px-9" >
              {/* <div className="w-6 h-6 bg-red-700 rounded-full"></div> */}
              <h1 className="text-lg">Total Bookings : 10</h1>
            </div>
            <div className="flex items-center justify-center py-5 m-3 space-x-8 align-middle rounded-lg cursor-pointer bg-slate-300 px-9" onClick={()=>getStatus('done')}>
              <div className="w-6 h-6 bg-green-700 rounded-full"></div>
              <h1 className="text-lg">Completed Bookings : 10</h1>
            </div>
            <div className="flex items-center justify-center py-5 m-3 space-x-8 align-middle rounded-lg cursor-pointer bg-slate-300 px-9" onClick={()=>getStatus('pending')}>
            <div className="w-6 h-6 bg-yellow-700 rounded-full"></div>
              <h1 className="text-lg">Ongoing bookings : 5</h1>
            </div>
            <div className="flex items-center justify-center py-5 m-3 space-x-8 align-middle rounded-lg cursor-pointer bg-slate-300 px-9" onClick={()=>getStatus('accepted')}>
            <div className="w-6 h-6 bg-red-700 rounded-full"></div>
              <h1 className="text-lg">Accepted bookings : 6</h1>
            </div>
          </div>
          </div>
          
        </div>
        
        
        <div>
        {/* {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index} 
            onClick={() => handlePagesChange(index+1)} // Adjust to page number (1-based)
          >
            {index + 1}
          </button>
        ))} */}
                    {Items.length > 0 ? (
                      <div className="mr-[450px] text-end">
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
                      <div className="pl-32 text-xl italic opacity-50">No booking available</div>  // Add an alternative UI here if necessary
                    )}
                  
        </div>
      </div>
      
    </div>
  )
}

export default WorkloadProgress
