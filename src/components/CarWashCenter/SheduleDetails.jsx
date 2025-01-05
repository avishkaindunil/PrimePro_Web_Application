import React, { useState, useEffect } from 'react';
import { publicAuthRequest } from '../../constants/requestMethods';

const SheduleDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startTime, setStartTime] = useState('');
  const centerName = localStorage.getItem("CENTER");
  console.log(centerName);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await publicAuthRequest.get(`/centerAdmin/not-time-allocated`);
        console.log(response);
        const filteredBookings = response.data.filter(booking => booking.centerName === centerName);
        const parsedBookings = filteredBookings.map((booking) => {
          return {
            id: booking.bookingId,
            title: `${booking.carName} - ${booking.service}`,
            bookingDate: booking.date.split('T')[0],
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

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedBooking(null);
    setStartTime('');
  };

  const handleAllocateTime = async () => {
    if (!startTime) {
      alert('Please enter a valid start time.');
      return;
    }
    try {
      const response = await publicAuthRequest.post(`/centerAdmin/allocate-time/${selectedBooking.id}`, null, {
        params: { startTime },
      });
      console.log('Booking updated:', response.data);
      setShowPopup(false);
      alert('Time allocated successfully!');
    
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
      <h1 className="pb-3 text-2xl font-semibold">Bookings for Time Allocate</h1>
      {bookings.map((booking, index) => (
        <div key={index} className="p-2 mb-2 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-semibold">{booking.title}</h1>
              <p className="text-gray-600">{booking.bookingDate}</p>
            </div>
            <button
              onClick={() => handleAllocateClick(booking)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Allocate Time
            </button>
          </div>
        </div>
      ))}

      {showPopup && selectedBooking && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ zIndex: 1000 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Allocate Time for {selectedBooking.title}
            </h2>
            <label className="block text-gray-700 mb-2">
              Start Time:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="block w-full mt-1 border rounded px-2 py-1"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePopupClose}
                className="mr-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAllocateTime}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Allocate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SheduleDetails;
