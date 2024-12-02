import React from 'react'

const WorkProgress = ({item}) => {
    // console.log(item);
    
  return (
    <div className={` m-4 p-2 rounded-2xl text-[#000000] bg-slate-300`}>
    
      <div className="flex flex-wrap items-center content-center justify-between px-20 m-2">
      <div className={`${item.status =="accepted" ? "bg-red-700":item.status=="pending" ? "bg-yellow-700":"bg-green-700"} w-10 h-10 rounded-full`}></div>
        <div>
        <h1 className="text-base">{item.name}</h1>
        <p className="">{item.starttime} - {item.endtime}</p>
        </div>
        <div>
            {(item.employees).map((employee ,index)=>(
                <p key={index} className="">{employee}</p>
            ))}
        </div>
      </div>
    </div>
  )
}

export default WorkProgress
