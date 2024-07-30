import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalenderwithCurrDate = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Calendar onChange={setDate} value={date} className={"rounded-lg border-none shadow-md p-2"}/>
      {/* <p>Selected Date: {date.toDateString()}</p> */}
    </div>
  );
};

export default CalenderwithCurrDate;
