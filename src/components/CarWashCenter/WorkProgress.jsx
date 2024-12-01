import React from 'react'

const WorkProgress = ({item}) => {
    // console.log(item);
    
  return (
    <div className={`w-[55%] ${item.status =="accepted" ? "bg-red-600":item.status=="pending" ? "bg-yellow-600":"bg-green-600"} m-4 p-2 rounded-2xl`}>
      <div className="flex flex-wrap items-center content-center justify-between px-20 m-2">
        <div>
        <h1 className="text-base">{item.name}</h1>
        <p className="text-[#e8e5e5]">{item.starttime} - {item.endtime}</p>
        </div>
        <div>
            {(item.employees).map((employee ,index)=>(
                <p key={index} className="text-[#e8e5e5]">{employee}</p>
            ))}
        </div>
      </div>
    </div>
  )
}

export default WorkProgress
