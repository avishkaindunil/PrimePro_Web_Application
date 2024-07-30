
import React from 'react';
import TaskAssign from '../../components/CarWashCenter/TaskAssign';
import DetailsFrame from '../../components/CarWashCenter/DetailsFrame';


const TasksAssign = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-[#D3E1E8] min-h-screen p-6">
          
            <div className="w-[494px] h-[44px] bg-white shadow-lg rounded-lg ml-2 flex items-center justify-between px-4 py-2 mb-6 ">
                <span>Current Date: 22nd July 2024</span>
                <span>Current Time: 14:42pm</span>
            </div>
            <div className="grid grid-cols-2 bg-white w-[1074px] h-[749px] p-8 rounded-lg shadow-lg ms-8 ">
              
              <TaskAssign/>
                <div className="grid grid-cols-2 ms-8 mx-20">
                    <div className="w-[415px] h-[403px] ms-8 mx-20">
                       
                         
                        <DetailsFrame />
                    </div>
                   
                </div>
                <div className="self-end mx-auto mr-0.5 mb-10">
                <button className="w-60 border rounded-full p-2 mb-10 mr-0.5 mt-2 bg-blue-900 text-white  hover:bg-indigo-800">
                     Save
                </button>
                </div>
            </div>
            
           
        </div>
    );
};

export default TasksAssign;


// import React from 'react'

// const TasksAssign = () => {
//   return (
//     <div>
//       Task Assign
//     </div>
//   )
// }

// export default TasksAssign

