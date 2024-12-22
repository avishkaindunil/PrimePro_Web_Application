import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SheduleDetails from '../../components/CarWashCenter/SheduleDetails'
import OneTask from '../../components/CarWashCenter/OneTask';
import axios from 'axios';
import { publicAuthRequest } from '../../constants/requestMethods';

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
      const response = await publicAuthRequest.get(`/centerAdmin/get-today-bookings`);
      console.log(response.data);
      if (response.data) {
        const filteredBookings = response.data.filter(booking => booking.taskAssigned === false);
        setBookings(filteredBookings);
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
  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSave = async () => {
    const { employeeId, startTime, endTime } = formData;
    const selectedBooking = bookings[isActiveTask];
    const payload = {
      employeeId,
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      taskDescription: `${selectedBooking.carName} - ${selectedBooking.service}`,
      customerId: selectedBooking.userID,
      taskDate: new Date().toISOString().split('T')[0],
      bookingId: selectedBooking.bookingId,
    };

    try {
      const response = await publicAuthRequest.post(`/centerAdmin/assign-tasks`, payload);
      console.log("Task assigned successfully:", response.data);
      setIsTaskAssignVisible(false);
      navigate("/carwashcenteradmin/taskassign");
    } catch (error) {
      console.log("Error saving task:", error);
    }
    console.log(payload);
  };



  const handleOnclick = (index) => {

    // setIsActiveTask(index);

    if (isActiveTask == index) {
      setIsTaskAssignVisible(!isTaskAssignVisible);
    } else {
      setIsActiveTask(isActiveTask);
      setIsTaskAssignVisible(true);
      // setIsTaskAssignVisible(isTaskAssignVisible);      
    }

    setIsActiveTask(index);
    // return isActiveTask;
    // setIsActiveTask(index);

  };



  const addInputFeild = () => {


    // setAssineeCount(assigneeCount+1);
    // setIsTaskAssignVisible(true);
    // ()=>handleOnclick(index);
    // setIsActiveTask(index);


  }

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
      <h1 className="text-2xl font-bold">Task Assign</h1>
      <div className="flex flex-cols">
        <div className="w-3/5 h-full m-5 space-y-4">
          {bookings.map((booking, index) => (
            <div key={index} className="cursor-pointer" onClick={() => handleOnclick(index)}>
              <OneTask booking={booking} />
            </div>
          ))}
        </div>
        {isTaskAssignVisible && (
          <div className="w-2/5 p-4 m-3 space-y-4 bg-white rounded-lg shadow-lg" id='assigndiv' >
            <div className="text-lg">Details</div>
            <div className="pl-3">{bookings[isActiveTask].carName} - {bookings[isActiveTask].service}</div>
            <p className="text-[#5F6165]">Customer ID - {bookings[isActiveTask].userID}</p>
            {/* <div className="pl-3">{Scheduletime(bookings[isActiveTask].start, bookings[isActiveTask].end)}</div> */}
            <form id="form" onSubmit={(e) => e.preventDefault()}>
              {/* Employee Dropdown */}
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

              {/* Start Time */}
              <div className="mb-4">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  onChange={handleInputChange}
                  value={formData.startTime}
                />
              </div>

              {/* End Time */}
              <div className="mb-4">
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  onChange={handleInputChange}
                  value={formData.endTime}
                />
              </div>

              {/* Save Button */}
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
