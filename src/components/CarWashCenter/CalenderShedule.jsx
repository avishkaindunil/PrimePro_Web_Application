import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalenderShedule = () => {
  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: new Date(2024, 6, 30, 8, 0), // July is month 6 (0-based index)
      end: new Date(2024, 6, 30, 9, 0),
      resource: 'Event 1'
    },
    {
      title: 'Event 2',
      start: new Date(2024, 6, 31, 8, 0),
      end: new Date(2024, 6, 31, 9, 0),
      resource: 'Event 2'
    },
    {
      title: 'Event 3',
      start: new Date(2024, 7, 1, 10, 0),
      end: new Date(2024, 7, 1, 11, 0),
      resource: 'Event 3'
    },
    {
      title: 'Event 4',
      start: new Date(2024, 7, 1, 15, 0),
      end: new Date(2024, 7, 1, 16, 0),
      resource: 'Event 4'
    }
  ]);

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
