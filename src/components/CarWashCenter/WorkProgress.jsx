// import React from 'react'

// const WorkProgress = ({item}) => {
//     // console.log(item);
    
//   return (
//     <div className={` m-4 p-2 rounded-xl text-[#000000] bg-slate-300`}>
    
//       <div className="flex flex-wrap items-center content-center justify-between px-20 m-2">
//       <div className={`${item.status =="accepted" ? "bg-red-700":item.status=="pending" ? "bg-yellow-700":"bg-green-700"} w-10 h-10 rounded-full`}></div>
//         <div>
//         <h1 className="text-base">{item.name}</h1>
//         <p className="">{item.starttime} - {item.endtime}</p>
//         </div>
//         <div>
//             {(item.employees).map((employee ,index)=>(
//                 <p key={index} className="">{employee}</p>
//             ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WorkProgress


import React from 'react';

const WorkProgress = ({ item }) => {
  return (
    <div className="m-4 p-6 rounded-xl text-[#000000] bg-white shadow-lg border border-gray-200  w-full">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`${
            item.status === 'accepted'
              ? 'bg-green-700'
              : item.status === 'pending'
              ? 'bg-yellow-500'
              : 'bg-red-700'
          } w-12 h-12 rounded-full`}
        ></div>
        <div className="flex-1 ml-4">
          <h1 className="text-lg font-semibold">{item.name}</h1>
          <p className="text-gray-600">{item.starttime} - {item.endtime}</p>
        </div>
      </div>
      <div className="border-t border-gray-300 pt-4">
        <h2 className="text-md font-medium mb-2">Assigned Employees:</h2>
        <ul className="list-disc list-inside text-gray-700">
          {item.employees.map((employee, index) => (
            <li key={index} className="text-sm">{employee}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkProgress;

