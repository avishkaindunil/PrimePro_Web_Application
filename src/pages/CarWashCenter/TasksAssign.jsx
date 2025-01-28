import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OneTask from '../../components/CarWashCenter/OneTask';
import { publicAuthRequest } from '../../constants/requestMethods';
import Swal from 'sweetalert2';

const TasksAssign = () => {
  const navigate = useNavigate();

  const [isTaskAssignVisible, setIsTaskAssignVisible] = useState(false);
  const [isActiveTask, setIsActiveTask] = useState();
  const [employeeList, setEmployeeList] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  // Get the current page's bookings
  const currentBookings = bookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  const fetchBookingDetails = async () => {
    try {
      const response = await publicAuthRequest.get(`/centerAdmin/get-today-bookings`);
      if (response.data) {
        console.log(response.data);
        
        const filteredBookings = response.data.filter((booking) => !booking.taskAssigned);
        setBookings(filteredBookings);
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  const fetchEmployeeList = async () => {
    try {
      const response = await publicAuthRequest.get(`/centerAdmin/get-All-employees`);
      if (response.data) {
        setEmployeeList(response.data);
      }
    } catch (error) {
      console.log('Error fetching employees: ', error);
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
      startTime: selectedBooking.startTime,
      endTime: selectedBooking.endTime,
      taskDescription: `${selectedBooking.carName} - ${selectedBooking.service}`,
      customerId: selectedBooking.userID,
      taskDate: new Date().toISOString().split('T')[0],
      bookingId: selectedBooking.bookingId,
    };

    try {
      await publicAuthRequest.post(`/centerAdmin/assign-tasks`, payload);

      Swal.fire({
        title: 'Task Assigned Successfully!',
        text: 'The task has been assigned to the selected employee.',
        icon:"success",
        width:'350px',
        confirmButtonText:"Ok",
        customClass:{
          title: 'text-lg font-semibold text-black',
          confirmButton: 'px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300 ease-out transform hover:scale-105',
        }
      }).then(() => {
        const updatedBookings = bookings.filter((_, index) => index !== isActiveTask);
        setBookings(updatedBookings);
        setIsTaskAssignVisible(false);
        setIsActiveTask(null);
      });
    } catch (error) {
      console.log('Error saving task:', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error assigning the task. Please try again.',
        icon:"error",
        width:'350px',
        confirmButtonText:"Ok",
        customClass:{
          title: 'text-lg font-semibold text-black',
          confirmButton: 'px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 ease-out transform hover:scale-105',
        }
      });
    }
  };

  const handleOnclick = (index) => {
    if (isActiveTask === index) {
      setIsTaskAssignVisible(!isTaskAssignVisible);
    } else {
      setIsActiveTask(index);
      setIsTaskAssignVisible(true);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsTaskAssignVisible(false); // Reset task assign visibility on page change
    setIsActiveTask(null); // Reset active task on page change
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Task Assignment</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2 space-y-4">
          {currentBookings.length > 0 ? (
            currentBookings.map((booking, index) => (
              <div
                key={index}
                className={` ${
                  isActiveTask === index ? 'ring-2 ring-blue-500 rounded-lg' : ''
                }`}
                onClick={() => handleOnclick((currentPage - 1) * bookingsPerPage + index)}
              >
                <OneTask booking={booking} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-lg">No bookings available for this page.</p>
            </div>
          )}
        </div>

        {isTaskAssignVisible && isActiveTask !== null && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Assign Task</h2>
            <div className="mb-2 text-gray-700">
              <span className="font-bold">Details: </span>
              {bookings[isActiveTask].carName} - {bookings[isActiveTask].service}
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Customer ID: {bookings[isActiveTask].userID}
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                Assign to Employee
              </label>
              <select
                id="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Employee</option>
                {employeeList.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="w-full py-2 mt-4 text-white transition-all bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={handleSave}
              >
                Save Task
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md transition-all ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TasksAssign;
