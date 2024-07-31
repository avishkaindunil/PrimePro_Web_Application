// src/components/TaskAssign.jsx
import React from 'react';

const TaskAssign = () => {
    return (
        <div className= "bg-white  p-6 space-y-6">
            <div className="grid grid-cols-2 ">
                <p className="text-gray-500 mt-1">On 23rd July 2024 at 8.30am</p>
                
            </div>
            <div className="space-y-2">
                <div>
                    <label className="block text-gray-700 font-semibold">TASK NAME</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg p-2 mt-3"
                        placeholder="Enter task name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold"></label>
                    <button className="flex items-center justify-center w- text-white bg-blue-900  hover:bg-indigo-800  p-2 mt-1 font-normal px-6 py-2 rounded-full">
                        <span className="material-icons"></span> Attach
                    </button>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Description</label>
                    <textarea
                        className="w-full border rounded-lg p-2 mt-3"
                        placeholder="Add a description ..."
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Status</label>
                    <select className="text-white w-75 border rounded-lg p-2 mt-3 bg-blue-900  hover:bg-indigo-800 font-normal px-6 py-2  ">
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Pending</option>
                    </select>
                </div>
                {/* <div className="text-right">
                    <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
                        Save
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default TaskAssign;
