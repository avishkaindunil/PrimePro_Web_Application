import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
    console.log("Date change");
    console.log(newDate);
  };

  return (
    <div>
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
