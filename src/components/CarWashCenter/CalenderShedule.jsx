import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalenderShedule = () => {
  const [events, setEvents] = useState([]);
  const centerName = localStorage.getItem("CENTER");
  console.log(centerName);

  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/centerAdmin/get-all-bookings`);
      console.log(response);
      if (response.data) {
        // setBookings(response.data);
        const filteredBookings = response.data.filter(booking => booking.centerName === centerName);
        setEvents(mapBookingsToEvents(filteredBookings));
      }
    } catch (error) {
      console.log("Error fetching data: ", error)
    }
  }

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  // Function to map booking data to event format
  const mapBookingsToEvents = (bookings) => {
    return bookings.map((booking) => {
      // Parse the date and time values
      const startDateTime = new Date(booking.date);
      const [startHours, startMinutes] = booking.startTime.split(":");
      startDateTime.setHours(startHours, startMinutes);  // Set the start time

      const endDateTime = new Date(booking.date);
      const [endHours, endMinutes] = booking.endTime.split(":");
      endDateTime.setHours(endHours, endMinutes);  // Set the end time

      return {
        title: `${booking.service} - ${booking.carName}`,
        start: startDateTime,
        end: endDateTime,
        resource: `Event ${booking.bookingId}`,
      };
    });
  };

  // const [events, setEvents] = useState([
  //   {
  //     title: 'Car Wash - Toyota Prius',
  //     start: new Date(2024, 11, 2, 8, 0), // July is month 6 (0-based index)
  //     end: new Date(2024, 11, 2, 12, 0),
  //     resource: 'Event 1'
  //   },
  //   {
  //     title: 'Vehicle Waxing - Land Cruiser',
  //     start: new Date(2024,11, 2, 8, 0),
  //     end: new Date(2024, 11, 2, 12, 0),
  //     resource: 'Event 2'
  //   },
  //   {
  //     title: 'Full Service -  Honda',
  //     start: new Date(2024, 7, 1, 10, 0),
  //     end: new Date(2024, 7, 1, 11, 0),
  //     resource: 'Event 3'
  //   },
  //   {
  //     title: 'Car Wash - Toyota Prius',
  //     start: new Date(2024, 7, 1, 15, 0),
  //     end: new Date(2024, 7, 1, 16, 0),
  //     resource: 'Event 4'
  //   }
  // ]);

  return (
    <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="day"
        views={['day', 'week', 'month']}
        step={60}
        showMultiDayTimes
        eventPropGetter={(event) => ({
          className: "bg-blue-500 text-white rounded-lg p-2 shadow-md",
        })}
        />
    </div>
  );
};

export default CalenderShedule;
