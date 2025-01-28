import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OneTask from '../../components/CarWashCenter/OneTask';
import { publicAuthRequest } from '../../constants/requestMethods';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TasksAssign = () => {
  const navigate = useNavigate();

  const [isTaskAssignVisible, setIsTaskAssignVisible] = useState(false);
  const [isActiveTask, setIsActiveTask] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [formData, setFormData] = useState({ employeeId: '' });
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  // Fetch bookings from API
  const fetchBookingDetails = async () => {
    try {
      const response = await publicAuthRequest.get(`/centerAdmin/get-today-and-future-bookings`);
      if (response.data) {
        setBookings(response.data);
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Fetch employees from API
  const fetchEmployeeList = async () => {
    try {
      const response = await publicAuthRequest.get(`/centerAdmin/get-All-employees`);
      if (response.data) {
        setEmployeeList(response.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Filter bookings by selected date
  const filterBookingsByDate = (date) => {
    setSelectedDate(date);

    // Manually format the selectedDate to 'YYYY-MM-DD'
    const selectedDateString = date.toLocaleDateString('en-CA'); // 'en-CA' gives the 'YYYY-MM-DD' format

    // Filter bookings by matching the date part (YYYY-MM-DD)
    const filtered = bookings.filter((booking) => {
      return booking.date === selectedDateString;
    });

    setFilteredBookings(filtered);
    setCurrentPage(1); // Reset pagination to first page
  };

  // Initialize bookings and employees
  useEffect(() => {
    fetchBookingDetails();
    fetchEmployeeList();
  }, []); // This only runs once on mount

  // Filter bookings by today's date after fetching the bookings
  useEffect(() => {
    if (bookings.length > 0) {
      filterBookingsByDate(new Date()); // Automatically filter for today
    }
  }, [bookings]); // Only run this when bookings are fetched

  // Handle employee selection
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Assign a task to an employee
  const handleSave = async () => {
    const selectedBooking = filteredBookings[isActiveTask];
    if (!formData.employeeId) {
      Swal.fire('Error', 'Please select an employee.', 'error');
      return;
    }
  
    const payload = {
      employeeId: formData.employeeId,
      startTime: selectedBooking.startTime,
      endTime: selectedBooking.endTime,
      taskDescription: `${selectedBooking.carName} - ${selectedBooking.service}`,
      customerId: selectedBooking.userID,
      taskDate: selectedBooking.date, // Use booking date
      bookingId: selectedBooking.bookingId,
    };
  
    try {
      // Call the API to assign the task
      await publicAuthRequest.post(`/centerAdmin/assign-tasks`, payload);
  
      Swal.fire({
        title: 'Success',
        text: 'Task assigned successfully!',
        icon: 'success',
      }).then(() => {
        // Remove the assigned booking from both bookings and filteredBookings
        const updatedBookings = bookings.filter((booking) => booking.bookingId !== selectedBooking.bookingId);
        const updatedFilteredBookings = filteredBookings.filter((booking) => booking.bookingId !== selectedBooking.bookingId);
  
        setBookings(updatedBookings);
        setFilteredBookings(updatedFilteredBookings);
  
        // Reset the task assignment form and UI
        setIsTaskAssignVisible(false);
        setIsActiveTask(null);
        setFormData({ employeeId: '' });
      });
    } catch (error) {
      console.error('Error assigning task:', error);
      Swal.fire('Error', 'Failed to assign task. Try again later.', 'error');
    }
  };  

  // Toggle task assignment panel
  const handleOnclick = (index) => {
    if (isActiveTask === index) {
      setIsTaskAssignVisible(!isTaskAssignVisible);
    } else {
      setIsActiveTask(index);
      setIsTaskAssignVisible(true);
    }
  };

  // Change current page in pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsTaskAssignVisible(false);
    setIsActiveTask(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Assignment</h1>
      <div className="mb-6">
        <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-2">
          Select a date to filter bookings:
        </label>
        <DatePicker
          id="dateFilter"
          selected={selectedDate}
          onChange={filterBookingsByDate}
          className="p-2 border rounded-md"
          minDate={new Date()} // Disable past dates
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          {currentBookings.length > 0 ? (
            currentBookings.map((booking, index) => (
              <div
                key={index}
                className={`cursor-pointer ${
                  isActiveTask === index ? 'ring-2 ring-blue-500 rounded-lg' : 'bg-white'
                }`}
                onClick={() => handleOnclick((currentPage - 1) * bookingsPerPage + index)}
              >
                <OneTask booking={booking} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              <p>No bookings available for this date.</p>
            </div>
          )}
        </div>

        {isTaskAssignVisible && isActiveTask !== null && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Assign Task</h2>
            <div className="mb-2 text-gray-700">
              <span className="font-bold">Details: </span>
              {filteredBookings[isActiveTask].carName} - {filteredBookings[isActiveTask].service}
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Customer ID: {filteredBookings[isActiveTask].userID}
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                Assign to Employee
              </label>
              <select
                id="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border rounded-md"
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
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                onClick={handleSave}
              >
                Save Task
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
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
