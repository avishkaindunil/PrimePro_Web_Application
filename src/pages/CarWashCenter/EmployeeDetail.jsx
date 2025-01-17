import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserView from '../../components/UserView';
import ProfilePic from '../../assets/profilepic.png'
import axios from 'axios';

const EmployeeDetail = () => {
    const { id } = useParams();
    const [employeeDetails, setEmployeeDetails] = useState({
        name: '',
        email: '',
        designation: '',
        city: '',
        phoneNumber: '',
        dateOfBirth: '',
        nic: '',
        casualLeave: '',
        annualLeave: '',
    })

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/centerAdmin/get-employee-details/${id}`);
            console.log(response.data);
            if (response.data) {
                setEmployeeDetails(response.data);
            }
        } catch (error) {
            console.log("Error fetching data: ", error)
        }
    }

    useEffect(() => {
        fetchEmployeeDetails()
    }, [id]);

    return (
        <>
            {/* {id} */}
            <div className="flex justify-between px-16 py-8 space-x-8 bg-white rounded-lg shadow-lg">
                {/* user view and current alocated slot */}
                <div className="flex flex-col items-center justify-center h-full">
                    {/* <UserView/> */}
                    <div className="m-3 rounded-full">
                        <img src={ProfilePic} className="h-[40vh]" />
                    </div>
                    <div class="mt-8 bg-white rounded-lg py-4 text-center shadow-lg w-[80%] mx-auto">
                        <p class="text-gray-600 m-1">Currently Allocated to slot</p>
                        <p class="text-3xl font-bold text-white bg-blue-500 rounded-full mx-20 my-3 py-3">{(employeeDetails.currentAllocSlot !== 0) ? employeeDetails.currentAllocSlot : "-"}</p>
                    </div>
                </div>
                {/* employee detail section */}
                <div className="items-center w-2/3 h-full p-5 m-5 border border-gray-300 rounded">
                    <h2 class="text-2xl font-semibold mb-4">Personal Details</h2>
                    <form class="space-y-4">
                        <div className="">
                            <label class="block text-gray-700 font-bold">Full Name:</label>
                            <input type="text" class="w-full mt-1 p-2 border border-gray-300 rounded" value={employeeDetails.name} />
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label class="block text-gray-700 font-bold">Phone no:</label>
                                <input type="text" class="w-full mt-1 p-2 border border-gray-300 rounded" value={employeeDetails.phoneNumber} />
                            </div>
                            <div className="w-1/2">
                                <label class="block text-gray-700 font-bold">Email:</label>
                                <input type="email" class="w-full mt-1 p-2 border border-gray-300 rounded" value={employeeDetails.email} />
                            </div>
                        </div>
                        <div className="">
                            <label class="block text-gray-700 font-bold">Address:</label>
                            <input type="text" class="w-full mt-1 p-2 border border-gray-300 rounded" value={employeeDetails.city} />
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/3">
                                <label class="block text-gray-700 font-bold">Designation:</label>
                                <input type="text" class="w-full mt-1 p-2 border border-gray-300 rounded" value={employeeDetails.designation} />
                            </div>
                            <div className="w-1/3">
                                <label class="block text-gray-700 font-bold">Date of Birth:</label>
                                <input type="text" class="w-full mt-1 p-2 border border-gray-300 rounded" value={formatDate(employeeDetails.dateOfBirth)} />
                            </div>
                            <div className="w-1/3">
                                <label class="block text-gray-700 font-bold">NIC:</label>
                                <input type="email" class="w-full mt-1 p-2 border border-gray-300 rounded" value={employeeDetails.nic} />
                            </div>
                        </div>
                        <div class="flex space-x-4">
                            <div class="w-1/3">
                                <label class="block text-gray-700 font-bold">No. of worked days:</label>
                                <input type="number" class="w-full mt-1 p-2 border border-gray-300 rounded" value="45" />
                            </div>
                            <div class="w-1/3">
                                <label class="block text-gray-700 font-bold">No. of Annual Leaves:</label>
                                <input type="number" class="w-full mt-1 p-2 border border-gray-300 rounded" value={employeeDetails.annualLeave} />
                            </div>
                            <div class="w-1/3">
                                <label class="block text-gray-700 font-bold">No. of Casual Leaves:</label>
                                <input type="number" class="w-full mt-1 p-2 border border-gray-300 rounded" value={employeeDetails.casualLeave} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EmployeeDetail;
