import React from 'react';

const WorkProgress = ({ item }) => {
  console.log(item);
  
  return (
    <div className="m-4 p-4 rounded-xl text-[#000000] bg-white shadow-lg border border-gray-200  w-full">
      <div className={`flex items-center justify-between mb-4 p-2 rounded-xl ${
            item[11] == 'ACCEPTED'
              ? 'bg-red-200'
              : item[11] == 'PENDING'
              ? 'bg-yellow-100'
              : 'bg-green-100'
          }`}>
        {/* <div
          className={`${
            item[9] == 'ACCEPTED'
              ? 'bg-red-700'
              : item[9] == 'PENDING'
              ? 'bg-yellow-500'
              : 'bg-green-700'
          } w-12 h-12 rounded-full`}
        ></div> */}
        <div className="flex-1 ml-4">
          <h1 className="text-lg font-semibold">{item[4]}</h1>
          <p className="text-gray-600">Booking ID - {item[0]}</p>
          <p className="text-gray-600">{item[5]}</p>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-300">
        <h2 className="mb-2 font-medium text-md">Assigned Employee</h2>
        <ul className="text-gray-700 list-disc list-inside">
          {/* {item.employees.map((employee, index) => ( */}
            <li className="text-sm">{item[12]} - {item[11]}</li>
          {/* ))} */}
        </ul>
      </div>
    </div>
  );
};

export default WorkProgress;

