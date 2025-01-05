import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalenderSchedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const centerName = localStorage.getItem("CENTER");

  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/centerAdmin/get-all-bookings`);
      if (response.data) {
        const filteredBookings = response.data.filter((booking) => booking.centerName === centerName);
        setEvents(mapBookingsToEvents(filteredBookings));
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const mapBookingsToEvents = (bookings) => {
    return bookings.map((booking) => {
      const startDateTime = new Date(booking.date);
      const [startHours, startMinutes] = booking.startTime.split(":");
      startDateTime.setHours(startHours, startMinutes);

      const endDateTime = new Date(booking.date);
      const [endHours, endMinutes] = booking.endTime.split(":");
      endDateTime.setHours(endHours, endMinutes);

      return {
        title: `${booking.service} - ${booking.carName}`,
        start: startDateTime,
        end: endDateTime,
      };
    });
  };

  const handleDayClick = (date) => {
    const dayEvents = events.filter((event) => moment(event.start).isSame(date, 'day'));
    setSelectedDayEvents(dayEvents);
  };

  const handleNavigate = (action) => {
    const newDate = new Date(currentDate);
    if (action === 'NEXT') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (action === 'PREV') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => handleNavigate('PREV')}
        >
          Previous
        </button>
        <h3 className="font-semibold">{moment(currentDate).format('MMMM YYYY')}</h3>
        <button
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => handleNavigate('NEXT')}
        >
          Next
        </button>
      </div>
      <br />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultDate={currentDate}
        defaultView="month"
        views={['month']}
        toolbar={false}
        onNavigate={(date) => setCurrentDate(date)}
        onSelectSlot={({ start }) => handleDayClick(start)}
        selectable
      />

      {selectedDayEvents.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Events for Selected Day:</h3>
          <ul className="list-disc list-inside">
            {selectedDayEvents.map((event, index) => (
              <li key={index}>
                {event.title} ({moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalenderSchedule;
