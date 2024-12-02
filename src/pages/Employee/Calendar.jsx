import CalendarWithCurrentDate from "../../components/Employee/CalenderWithCurrentDate";
import DateAndTimeTracker from "./../../components/Employee/DateAndTimeTracker";
import DashboardSchedule from "./../../components/Employee/DashboardSchedule";
import CalenderSchedule from "../../components/Employee/CalenderSchedule";
import TaskScheduler from "../../components/Employee/TaskScheduler";
import { useEffect, useState } from 'react';
import { getAllTaskByEmployeeId } from './../../api/taskApiCalls';

const Calendar = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data: taskData } = await getAllTaskByEmployeeId(storedUserData.employeeId);
        setTasks(taskData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task count:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [storedUserData.employeeId]);

  return !loading ? (
    <div>
      <DateAndTimeTracker />
      <div className="flex gap-4 items-start">
        <div className="basis-2/3 my-8 flex flex-col justify-center">
          <div className="bg-white p-4 flex items-center justify-center rounded-md">
            <CalenderSchedule tasks={tasks} />
          </div>
          <div className="mt-8 bg-white p-4 rounded-md">
            <TaskScheduler tasksData={tasks} />
          </div>
        </div>
        <div className="basis-1/3 flex flex-col items-start justify-center">
          <div>
            <h1 className="text-2xl font-semibold my-8">Calendar</h1>
            <CalendarWithCurrentDate />
          </div>
          <div className="my-6">
            <DashboardSchedule tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Calendar;
