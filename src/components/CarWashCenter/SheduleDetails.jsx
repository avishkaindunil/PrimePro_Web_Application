import React, { useState, useEffect } from 'react';
import { publicAuthRequest } from '../../constants/requestMethods';
import { faL } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

const SheduleDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCantAllocate, setCantAllocate] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startTime, setStartTime] = useState('');
  const centerName = localStorage.getItem("CENTER");
  console.log(centerName);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // const response = await publicAuthRequest.get(`/centerAdmin/not-time-allocated`);
        const response = await publicAuthRequest.get(`/centerAdmin/get-all-bookings`);
        console.log(response);
        // const filteredBookings = response.data.filter(booking => booking.centerName === centerName);
        const parsedBookings = response.data.map((booking) => {
          return {
            id: booking.bookingId,
            title: `${booking.carName} - ${booking.service}`,
            bookingDate: booking.date,
            resource: `Event ${booking.bookingId}`,
            taskStatus: booking.taskStatus,
          };
        });

        setBookings(parsedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleAllocateClick = (booking) => {
    setSelectedBooking(booking);
    setShowPopup(true);
  };

  const handleCantAllocateClick = (booking) => {
    setSelectedBooking(booking);
    setShowPopup(false);
    setCantAllocate(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setCantAllocate(false);
    setSelectedBooking(null);
    setStartTime('');
  };

  const handleAllocateTime = async () => {
    if (!startTime) {
      // alert('Please enter a valid start time.');
      Swal.fire({
              title:"Please enter a valid time!",
              icon:"error",
              width:'350px',
              confirmButtonText:"Ok",
              customClass:{
                title: 'text-lg font-semibold text-black',
                confirmButton: 'px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 ease-out transform hover:scale-105',
              }
            });
      return;
    }
    try {
      const response = await publicAuthRequest.post(`/centerAdmin/allocate-time/${selectedBooking.id}`, null, {
        params: { startTime },
      });
      console.log('Booking updated:', response.data);
      setShowPopup(false);
      // alert('Time allocated successfully!');
      Swal.fire({
        title:"Time allocated successfully!",
        icon:"success",
        width:'350px',
        confirmButtonText:"Ok",
        customClass:{
          title: 'text-lg font-semibold text-black',
          confirmButton: 'px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300 ease-out transform hover:scale-105',
        }
      });

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== selectedBooking.id)
      );
    } catch (error) {
      console.error('Error allocating time:', error);
      // alert('An error occurred while allocating time.');
      Swal.fire({
        title:"An error occurred while allocating time!",
        text:`${error}`,
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

  const handleCantAllocateTime = async () => {
    try {
      const response = await publicAuthRequest.post(`/centerAdmin/cant-allocate-time/${selectedBooking.id}`);
      console.log('Booking updated:', response.data);
      setCantAllocate(false);
      // alert('Your response is recorded!');
      Swal.fire({
        title:"Your response is notified to the customer!",
        icon:"warning",
        width:'350px',
        confirmButtonText:"Ok",
        customClass:{
          title: 'text-lg font-semibold text-black',
          confirmButton: 'px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all duration-300 ease-out transform hover:scale-105',
        }
      });

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== selectedBooking.id)
      );
    } catch (error) {
      console.error('Error allocating time:', error);
      alert('An error occurred while allocating time.');
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="pb-3 text-2xl font-semibold">Booking History</h1>
      {bookings.map((booking, index) => (
        <div key={index} className="p-2 px-5 mb-2 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-base font-semibold">{booking.title}</h1>
              <p className="text-gray-600">{booking.bookingDate}</p>
            </div>
            <div>
              {/* <button
                onClick={() => handleCantAllocateClick(booking)}
                className="px-4 py-2 mr-4 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Can't Allocate
              </button>
              <button
                onClick={() => handleAllocateClick(booking)}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Allocate Time
              </button> */}
            </div>
          </div>
        </div>
      ))}

      {showPopup && selectedBooking && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ zIndex: 1000 }}
        >
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-lg font-semibold">
              Allocate Time for {selectedBooking.title}
            </h2>
            <label className="block mb-2 text-gray-700">
              Start Time:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="block w-full px-2 py-1 mt-1 border rounded"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePopupClose}
                className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAllocateTime}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Allocate
              </button>
            </div>
          </div>
        </div>
      )}

      {showCantAllocate && selectedBooking && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ zIndex: 1000 }}
        >
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-lg font-semibold">
              Are you sure can't allocate Time for:  {selectedBooking.title}
            </h2>
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePopupClose}
                className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleCantAllocateTime}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SheduleDetails;
