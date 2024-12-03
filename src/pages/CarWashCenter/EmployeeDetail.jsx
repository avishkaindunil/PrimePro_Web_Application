import React from 'react'
import { useParams } from 'react-router-dom'
import UserView from '../../components/UserView';

const EmployeeDetail = () => {

    const {id} = useParams();

  return (
    <>
        {/* {id} */}
        <div className="flex justify-between px-16 py-8 space-x-8 bg-white rounded-lg shadow-lg">
            {/* user view and current alocated slot */}
            <div className="flex-col justify-center h-full p-7">
                <UserView/>
                <div class="mt-8 bg-blue-100 rounded-lg py-4 items-center text-center">
                    <p class="text-gray-600">Allocated to slot</p>
                    <p class="text-3xl font-bold text-blue-500">5</p>
                </div>
            </div>
            {/* employee detail section */}
            <div className="items-center w-2/3 h-full p-5 m-5 border border-gray-300 rounded">
                <h2 class="text-2xl font-semibold mb-4">Personal Details</h2>
                <form class="space-y-4">
                    <div className="">
                        <label class="block text-gray-700 font-bold">Full Name:</label>
                        <input type="text" class="w-full mt-1 p-2 border border-gray-300 rounded" value="name"/>
                    </div>
                    <div className="">
                        <label class="block text-gray-700 font-bold">Phone no.:</label>
                        <input type="text" class="w-full mt-1 p-2 border border-gray-300 rounded" value="phone number"/>
                    </div>
                    <div className="">
                        <label class="block text-gray-700 font-bold">Email:</label>
                        <input type="email" class="w-full mt-1 p-2 border border-gray-300 rounded" value="email"/>
                    </div>
                    <div className="">
                        <label class="block text-gray-700 font-bold">Address:</label>
                        <input type="text" class="w-full mt-1 p-2 border border-gray-300 rounded" value="address"/>
                    </div>
                    <div class="flex space-x-4">
                    <div class="w-1/2">
                            <label class="block text-gray-700 font-bold">No. of worked days:</label>
                            <input type="number" class="w-full mt-1 p-2 border border-gray-300 rounded" value="45"/>
                    </div>
                    <div class="w-1/2">
                            <label class="block text-gray-700 font-bold">No. of Leaves:</label>
                            <input type="number" class="w-full mt-1 p-2 border border-gray-300 rounded" value="4"/>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default EmployeeDetail
