import React, { useState } from 'react'
import SheduleDetails from '../../components/CarWashCenter/SheduleDetails'
import OneTask from '../../components/CarWashCenter/OneTask';



const TasksAssign = () => {

  const [isTaskAssignVisible, setIsTask] = useState(false)
;
  const handleOnclick =()=>{
    const assigndiv = document.getElementById('assigndiv');
  }

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
  return (
    <div className="flex flex-cols">
      <div className="w-3/5 h-full m-5 space-y-4">
        {bookings.map((booking)=>(
          <OneTask booking={booking} onClick={handleOnclick(booking)}/>
        ))}
      </div>
      <div className="w-2/5" id='assigndiv' >
        div 2
      </div>
    </div>
  )
}

export default TasksAssign;

