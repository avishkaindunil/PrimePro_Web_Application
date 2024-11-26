import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "./scheduler.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: "John Doe - Toyota Camry",
    start: new Date(2024, 11, 26, 9, 0), // Year, Month (0-based), Date, Hours, Minutes
    end: new Date(2024, 11, 26, 10, 0),
    location: "Maryville",
  },
  {
    id: 2,
    title: "Jane Smith - Ford Mustang",
    start: new Date(2024, 11, 26, 10, 0),
    end: new Date(2024, 11, 26, 11, 0),
    location: "Jacksonville",
  },
  {
    id: 3,
    title: "David Johnson - BMW 3 Series",
    start: new Date(2024, 11, 26, 11, 0),
    end: new Date(2024, 11, 26, 12, 0),
    location: "Austin",
  },
  {
    id: 4,
    title: "Mary Brown - Chevrolet Malibu",
    start: new Date(2024, 11, 26, 12, 0),
    end: new Date(2024, 11, 26, 13, 0),
    location: "New York",
  },
];

const CalenderSchedule = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-4xl">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={(event) => ({
          className: "bg-blue-500 text-white rounded-lg p-2 shadow-md",
        })}
      />
    </div>
    // <div className="flex justify-center items-center h-screen bg-gray-100">
    //   <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-4xl">

    //   </div>
    // </div>
  );
};

export default CalenderSchedule;
