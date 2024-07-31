import CalendarWithCurrentDate from "../../components/Employee/CalenderWithCurrentDate";
import DateAndTimeTracker from "./../../components/Employee/DateAndTimeTracker";
import DashboardSchedule from "./../../components/Employee/DashboardSchedule";
import CalenderSchedule from "../../components/Employee/CalenderSchedule";
import TaskScheduler from "../../components/Employee/TaskScheduler";

const Calendar = () => {
  // Your code for fetching and managing schedule data goes here

  return (
    <div>
      <DateAndTimeTracker />
      <div className="flex gap-4 items-start">
        <div className="basis-2/3 my-8 flex flex-col justify-center">
          <div className="bg-white p-4 flex items-center justify-center rounded-md">
            <CalenderSchedule />
          </div>
          <div className="mt-8 bg-white p-4 rounded-md">
            <TaskScheduler />
          </div>
        </div>
        <div className="basis-1/3 flex flex-col items-start justify-center">
          <div>
            <h1 className="text-2xl font-semibold my-8">Calendar</h1>
            <CalendarWithCurrentDate />
          </div>
          <div className="my-6">
            <DashboardSchedule />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
