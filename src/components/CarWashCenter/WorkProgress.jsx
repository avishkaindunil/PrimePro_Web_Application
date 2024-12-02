import React from 'react'

const WorkProgress = ({item}) => {
    // console.log(item);
    
  return (
    <div className={`w-[55%] ${item.status =="accepted" ? "bg-[#f65050]":item.status=="pending" ? "bg-[#ccb025]":"bg-[#3aba49]"} m-4 p-2 rounded-2xl`}>
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
