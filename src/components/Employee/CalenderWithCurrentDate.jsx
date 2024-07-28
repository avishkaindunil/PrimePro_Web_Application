import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
    {/* <div className="flex justify-center items-center h-screen bg-gray-100"> */}
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="react-calendar"
        />
      </div>
    </div>
  );
};

export default MyCalendar;
