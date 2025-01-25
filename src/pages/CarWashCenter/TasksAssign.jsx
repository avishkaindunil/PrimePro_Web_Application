import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SheduleDetails from '../../components/CarWashCenter/SheduleDetails'
import OneTask from '../../components/CarWashCenter/OneTask';
import axios from 'axios';
import { publicAuthRequest } from '../../constants/requestMethods';
import Swal from "sweetalert2";

const TasksAssign = () => {
  const navigate = useNavigate();

  const [isTaskAssignVisible, setIsTaskAssignVisible] = useState(false);
  const [isActiveTask, setIsActiveTask] = useState();
  const [assigneeCount, setAssineeCount] = useState(1);
  const [employeeList, setEmployeeList] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const centerName = localStorage.getItem("CENTER");
  console.log(centerName);

  const fetchBookingDetails = async () => {
    try {
      const response = await publicAuthRequest.get(`/centerAdmin/not-task-assigned`);
      console.log(response.data);
      if (response.data) {
        setBookings(response.data);
      }
    } catch (error) {
      console.log("Error fetching data: ", error)
    }
  }

  const fetchEmployeeList = async () => {
    try {
      const response = await publicAuthRequest.get(`/centerAdmin/get-All-employees`);
      if (response.data) {
        setEmployeeList(response.data);
      }
    } catch (error) {
      console.log("Error fetching employees: ", error);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
    fetchEmployeeList();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    const { employeeId } = formData;
    const selectedBooking = bookings[isActiveTask];
    const payload = {
      employeeId,
      taskDescription: `${selectedBooking.carName} - ${selectedBooking.service}`,
      customerId: selectedBooking.userID,
      taskDate: new Date().toISOString().split('T')[0],
      bookingId: selectedBooking.bookingId,
    };

    try {
      const response = await publicAuthRequest.post(`/centerAdmin/assign-tasks`, payload);
      console.log("Task assigned successfully:", response.data);
      setIsTaskAssignVisible(false);
      // alert("Successfully assigned tasks!")
      Swal.fire({
        title:"Successfully assigned tasks!",
        icon:"success",
        width:'350px',
        confirmButtonText:"Ok",
        customClass:{
          title: 'text-lg font-semibold text-black',
          confirmButton: 'px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300 ease-out transform hover:scale-105',
        }
      });
      navigate("/CarWashCenterAdmin/taskAssign");
    } catch (error) {
      console.log("Error saving task:", error);
      // alert("Task assign failed!")
      Swal.fire({
        title:"Failed to assign employee!",
        text:"Select an employee",
        icon:"error",
        width:'350px',
        confirmButtonText:"Ok",
        customClass:{
          title: 'text-lg font-semibold text-black',
          confirmButton: 'px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 ease-out transform hover:scale-105',
        }
      });
    }
    console.log(payload);
  };

  const handleOnclick = (index) => {
    if (isActiveTask == index) {
      setIsTaskAssignVisible(!isTaskAssignVisible);
    } else {
      setIsActiveTask(isActiveTask);
      setIsTaskAssignVisible(true);
    }
    setIsActiveTask(index);
  };


  // const bookings =[
  //   {
  //       title: 'Car Wash - Toyota Prius',
  //       start: new Date(2024, 6, 30, 8, 0), // July is month 6 (0-based index)
  //       end: new Date(2024, 6, 30, 12, 0),
  //       resource: 'Event 1'
  //     },
  //     {
  //       title: 'Vehicle Waxing - Land Cruiser',
  //       start: new Date(2024, 6, 31, 8, 0),
  //       end: new Date(2024, 6, 31, 9, 0),
  //       resource: 'Event 2'
  //     },
  //     {
  //       title: 'Full Service -  Honda',
  //       start: new Date(2024, 7, 1, 10, 0),
  //       end: new Date(2024, 7, 1, 11, 0),
  //       resource: 'Event 3'
  //     },
  //     {
  //       title: 'Car Wash - Toyota Prius',
  //       start: new Date(2024, 7, 1, 15, 0),
  //       end: new Date(2024, 7, 1, 16, 0),
  //       resource: 'Event 4'
  //     }
  // ];

  const Scheduletime = (start, end) => {
    const starthour = start.getHours().toString().padStart(2, '0');
    const startminute = start.getMinutes().toString().padStart(2, '0');
    const endhour = end.getHours().toString().padStart(2, '0');
    const endminute = end.getMinutes().toString().padStart(2, '0');

    return `${starthour}:${startminute} - ${endhour}:${endminute}`;

  }
  return (
    <>
      <div className="flex flex-cols">
        <div className="w-3/5 h-full p-4 m-5 mb-2 space-y-4 bg-gray-100 rounded-lg">
          <h1 className="text-2xl font-bold">Task Assign</h1>
          {bookings.length > 0 ? (bookings.map((booking, index) => (
            <div className="cursor-pointer" onClick={() => handleOnclick(index)}>
              <OneTask booking={booking} />
            </div>
          ))) : (
            <div className="italic text-center text-gray-600">There is no more bookings today to assign tasks.</div>
          )}
        </div>
        {isTaskAssignVisible && (
          <div className="w-2/5 p-4 m-3 space-y-4 bg-white rounded-lg shadow-lg" id='assigndiv' >
            <div className="text-lg font-semibold">Details</div>
            <div className="pl-3">{bookings[isActiveTask].carName} - {bookings[isActiveTask].service}</div>
            <p className="text-[#5F6165]">Customer ID - {bookings[isActiveTask].userID}</p>
            <form id="form" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                  Select Employee
                </label>
                <select
                  id="employeeId"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  onChange={handleInputChange}
                  value={formData.employeeId}
                >
                  <option value="">Select Employee</option>
                  {employeeList.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="items-center justify-center w-full p-1 my-5 text-white bg-blue-700 rounded-full"
                onClick={handleSave}
              >
                Save
              </button>
            </form>



          </div>
        )}

      </div>
    </>
  )
}

export default TasksAssign
