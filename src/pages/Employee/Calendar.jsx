import CalendarWithCurrentDate from "../../components/Employee/CalenderWithCurrentDate";
import DateAndTimeTracker from "./../../components/Employee/DateAndTimeTracker";
import DashboardSchedule from "./../../components/Employee/DashboardSchedule";
import CalenderSchedule from "../../components/Employee/CalenderSchedule";
import TaskScheduler from "../../components/Employee/TaskScheduler";
import { useEffect, useState } from "react";
import { getAllTaskByEmployeeId, getAllTasksByEmployeeId } from "./../../api/taskApiCalls";

const Calendar = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [allFilteredTasks, setFilteredAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data: taskData } = await getAllTaskByEmployeeId(storedUserData.employeeId);
        console.log(taskData);
        setTasks(taskData);
        setFilteredAllTasks(taskData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task count:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [storedUserData.employeeId]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data: taskData } = await getAllTasksByEmployeeId(storedUserData.employeeId);
        console.log("All task");
        console.log(taskData);
        setAllTasks(taskData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task count:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [storedUserData.employeeId]);

  // Filter tasks for the selected date
  // const filteredTasks = tasks.filter((task) => {
  //   const taskDate = new Date(task.date).toDateString();
  //   return taskDate === selectedDate.toDateString();
  // });

  // const filteredAllTasks = allTasks.filter((task) => {
  //   const taskDate = new Date(task.date).toDateString();
  //   return taskDate === selectedDate.toDateString();
  // });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const changeDate = (newDate) => {
    console.log(newDate.toDateString());
    setSelectedDate(newDate);

    const filteredAllTasks = allTasks.filter((task) => {
      return task.taskDate == formatDate(newDate);
    });

    setFilteredAllTasks(filteredAllTasks);

    console.log(allFilteredTasks);
  }

  return !loading ? (
    <div>
      <DateAndTimeTracker />
      <div className="flex gap-8 items-start">
        <div className="basis-2/3 my-8 flex flex-col justify-center">
          <div className="bg-white p-4 flex items-center justify-center rounded-md">
            <CalenderSchedule tasks={allTasks} />
          </div>
          <div className="mt-8 bg-white p-4 rounded-md">
            <TaskScheduler tasksData={allFilteredTasks} />
          </div>
        </div>
        <div className="basis-1/3 flex flex-col items-start justify-center">
          <div>
            <h1 className="text-2xl font-semibold my-8">Calendar</h1>
            <CalendarWithCurrentDate onDateChange={changeDate} />
          </div>
          <div className="my-6">
            <DashboardSchedule tasks={allFilteredTasks} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Calendar;
