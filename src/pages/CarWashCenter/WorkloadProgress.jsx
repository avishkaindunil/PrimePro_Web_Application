import React, { useState } from 'react'
import WorkProgress from '../../components/CarWashCenter/WorkProgress'

const WorkloadProgress = () => {

  const items=[
    {name:"car",status:"pending",employees:["employee1","employee2","employee3"],starttime:8,endtime:10},
    {name:"van",status:"accepted",employees:["employee1","employee2"],starttime:8,endtime:10},
    {name:"bus",status:"done",employees:["employee1","employee2","employee3"],starttime:8,endtime:10},
    {name:"truck",status:"done",employees:["employee1","employee2","employee3"],starttime:8,endtime:10},
    {name:"item1",status:"pending",employees:["employee1"],starttime:8,endtime:10}
  ];
  const [Items,setItems] = useState(items);


  const onSerach =(e)=>{
    // console.log(e.target.value);
    setItems(items.filter(item=>item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())));
    // e.preventDefault();
    
  }
  
  return (
    <div>
      <h1 className="text-xl font-bold">Workload Progress</h1>
      <input className="p-2 m-3 rounded-md w-[55%]" type='text' placeholder='search for a booking...' onChange={onSerach}/>
      {Items.map((item)=>(
        <WorkProgress item={item}/>
      ))}
    </div>
  )
}

export default WorkloadProgress
