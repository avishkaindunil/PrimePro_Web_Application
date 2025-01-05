import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { publicAuthRequest } from '../../constants/requestMethods';

const Scheduletime = (start, end) => {
  const starthour = start.getHours().toString().padStart(2, '0');
  const startminute = start.getMinutes().toString().padStart(2, '0');
  const endhour = end.getHours().toString().padStart(2, '0');
  const endminute = end.getMinutes().toString().padStart(2, '0');

  return `${starthour}:${startminute} - ${endhour}:${endminute}`;
};

const SheduleDetails = () => {
  const [bookings, setBookings] = useState([]);
  const centerName = localStorage.getItem("CENTER");
  console.log(centerName);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await publicAuthRequest.get(`/centerAdmin/get-all-bookings`);
        const filteredBookings = response.data.filter(booking => booking.centerName === centerName);
        const parsedBookings = filteredBookings.map((booking) => {
          const startDateTime = new Date(`${booking.date.split('T')[0]}T${booking.startTime}`);
          const endDateTime = new Date(`${booking.date.split('T')[0]}T${booking.endTime}`);

          return {
            title: `${booking.service} - ${booking.carName}`,
            start: startDateTime,
            end: endDateTime,
            resource: `Event ${booking.bookingId}`,
            taskStatus : booking.taskStatus
          };
        });


        setBookings(parsedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="pb-3 text-2xl font-semibold">Shedules for Today</h1>
      {bookings.map((booking, index) => (
        <div key={index} className="p-2 mb-2 bg-white rounded-lg shadow-md">
          <h1 className="text-base font-semibold">{booking.title}</h1>
          <p className="text-gray-600">{Scheduletime(booking.start, booking.end)}</p>
          <p className="text-[#5F6165]">{booking.taskStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default SheduleDetails;


