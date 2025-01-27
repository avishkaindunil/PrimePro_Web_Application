import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { publicAuthRequest } from '../../constants/requestMethods';

const localizer = momentLocalizer(moment);

const CalenderSchedule = () => {
  const [events, setEvents] = useState([]);
  const [dateBookings, setDateBookings] = useState({});
  const [selectedDayBookings, setSelectedDayBookings] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);

  const centerName = localStorage.getItem('CENTER');

  const fetchBookingDetails = async () => {
    try {
      const response = await publicAuthRequest.get(
        `/centerAdmin/get-all-bookings`
      );
      if (response.data) {
        console.log(response.data);
        const filteredBookings = response.data.filter(
          (booking) => booking.centerName === centerName
        );
        const groupedBookings = groupBookingsByDate(filteredBookings);
        setDateBookings(groupedBookings);
        setEvents(mapBookingsToEvents(groupedBookings));
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const groupBookingsByDate = (bookings) => {
    return bookings.reduce((acc, booking) => {
      const date = moment(booking.date).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(booking); // Store full booking details
      return acc;
    }, {});
  };

  const mapBookingsToEvents = (groupedBookings) => {
    return Object.entries(groupedBookings).map(([date, bookings]) => {
      const eventDate = new Date(date);
      return {
        title: `${bookings.length}`, // Display count
        start: eventDate,
        end: eventDate,
        bookings, // Store full booking details
      };
    });
  };

  const handleDayClick = (date) => {
    const dateKey = moment(date).format('YYYY-MM-DD');
    const bookings = dateBookings[dateKey] || [];
    setSelectedDayBookings(bookings);
    setShowPopup(true);
  };

  const CustomEvent = ({ event }) => {
    return (
      <div
        style={{
          position: 'relative',
          backgroundColor: 'transparent',
          textAlign: 'center',
        }}
      >
        {event.title && (
          <span
            style={{
              background: '#007bff',
              color: '#fff',
              borderRadius: '50%',
              padding: '5px',
              minWidth: '20px',
              display: 'inline-block',
              fontSize: '12px',
              textAlign: 'center',
            }}
          >
            {event.title}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
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
        components={{
          event: CustomEvent,
        }}
        onSelectEvent={(event) => handleDayClick(event.start)}
        selectable
      />

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Bookings for Selected Day: {selectedDayBookings.length}
            </h3>
            {selectedDayBookings.length > 0 ? (
              <ul className="list-disc list-inside">
                {selectedDayBookings.map((booking, index) => (
                  <li key={index}>
                    <strong>{booking.service}</strong> - {booking.carName} 
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings for this day.</p>
            )}
            <button
              className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalenderSchedule;
