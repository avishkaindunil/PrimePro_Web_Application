import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalenderSchedule = ({ tasks }) => {
  const events = tasks.map((task) => ({
    id: task.id,
    title: `${task.taskDescription.split(" - ")[0]} - ${task.taskDescription.split(" - ")[1]}`,
    start: new Date(
      `${task.taskDate.split("T")[0]}T${task.startTime}`
    ), 
    end: new Date(`${task.taskDate.split("T")[0]}T${task.endTime}`),
    location: "Branch Location",
  }));

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
  );
};

export default CalenderSchedule;
