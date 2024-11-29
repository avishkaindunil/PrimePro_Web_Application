import React, { useState } from 'react'
import SheduleDetails from '../../components/CarWashCenter/SheduleDetails'
import OneTask from '../../components/CarWashCenter/OneTask';



const TasksAssign = () => {

  const [isTaskAssignVisible, setIsTaskAssignVisible] = useState(false);
  const [isActiveTask, setIsActiveTask] = useState('');
  
  const handleOnclick =(index)=>{

    // setIsActiveTask(index);
    
    if(isActiveTask==index){
      setIsTaskAssignVisible(!isTaskAssignVisible);
    } else {
      setIsActiveTask(isActiveTask);
      // setIsTaskAssignVisible(isTaskAssignVisible);
     console.error("error");
      
    };
    
    setIsActiveTask(index);
    // return isActiveTask;
    // setIsActiveTask(index);
    
  };

  const bookings =[
    {
        title: 'Car Wash - Toyota Prius',
        start: new Date(2024, 6, 30, 8, 0), // July is month 6 (0-based index)
        end: new Date(2024, 6, 30, 12, 0),
        resource: 'Event 1'
      },
      {
        title: 'Vehicle Waxing - Land Cruiser',
        start: new Date(2024, 6, 31, 8, 0),
        end: new Date(2024, 6, 31, 9, 0),
        resource: 'Event 2'
      },
      {
        title: 'Full Service -  Honda',
        start: new Date(2024, 7, 1, 10, 0),
        end: new Date(2024, 7, 1, 11, 0),
        resource: 'Event 3'
      },
      {
        title: 'Car Wash - Toyota Prius',
        start: new Date(2024, 7, 1, 15, 0),
        end: new Date(2024, 7, 1, 16, 0),
        resource: 'Event 4'
      }
  ];

  const Scheduletime=(start,end)=>{
    const starthour = start.getHours().toString().padStart(2, '0');
    const startminute = start.getMinutes().toString().padStart(2, '0');
    const endhour = end.getHours().toString().padStart(2, '0');
    const endminute = end.getMinutes().toString().padStart(2, '0');

    return `${starthour}:${startminute} - ${endhour}:${endminute}`;
    
}
  return (
    <>
    <h1 className="text-xl font-bold">Task Assign</h1>
    <div className="flex flex-cols">
      <div className="w-3/5 h-full m-5 space-y-4">
        {bookings.map((booking, index)=>(
          <div className="cursor-pointer" onClick={()=>handleOnclick(index)}>
            <OneTask booking={booking}/>
            
          </div>
        ))}
      </div>
      {isTaskAssignVisible && (
        <div className="w-2/5 p-4 m-5 space-y-4 bg-white rounded-lg shadow-lg" id='assigndiv' >
        <div className="text-lg">Details</div>
        <div className="pl-3">{bookings[isActiveTask].title}</div>
        <div className="pl-3">{Scheduletime(bookings[isActiveTask].start, bookings[isActiveTask].end)}</div>
        <input type="text" class="w-full mt-1 p-2 border border-gray-300 rounded" placeholder='Assignee 1'/>
        <input type="text" class="w-full mt-1 p-2 border border-gray-300 rounded" placeholder='+add more'/>
        <button className="items-center justify-center w-full text-white bg-blue-700 rounded-full">Save</button>

        
      </div>
      )}
      
    </div>
    </>
  )
}

export default TasksAssign
