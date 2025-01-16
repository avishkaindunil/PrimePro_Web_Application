import React from 'react';

const WorkProgress = ({ item }) => {
  return (
    <div className="m-4 p-6 rounded-xl text-[#000000] bg-white shadow-lg border border-gray-200  w-full">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`${
            item[9] === 'ACCEPTED'
              ? 'bg-red-700'
              : item.status === 'PENDING'
              ? 'bg-yellow-500'
              : 'bg-green-700'
          } w-12 h-12 rounded-full`}
        ></div>
        <div className="flex-1 ml-4">
          <h1 className="text-lg font-semibold">{item[5]}</h1>
          <p className="text-gray-600">{item[6]}</p>
          <p className="text-gray-600">{item[4]}</p>
        </div>
      </div>
      <div className="border-t border-gray-300 pt-4">
        <h2 className="text-md font-medium mb-2">Assigned Employee</h2>
        <ul className="list-disc list-inside text-gray-700">
          {/* {item.employees.map((employee, index) => ( */}
            <li className="text-sm">{item[10]} - {item[11]}</li>
          {/* ))} */}
        </ul>
      </div>
    </div>
  );
};

export default WorkProgress;

