import DashboardBoxes from "../../components/Employee/DashboardBoxes";
import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker";
import DashboardChart from "./../../components/Employee/DashboardChart";
import DashboardSchedule from "./../../components/Employee/DashboardSchedule";
import { useState, useEffect } from "react";
import { getAllTaskByEmployeeId, getTaskCountByEmployeeId } from "./../../api/taskApiCalls";

export default function MainDashboard() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [taskCount, setTaskCount] = useState(0);
  const [totalSalary, setTotalSalary] = useState(storedUserData.baseSalary); // Fetch or calculate this value if necessary
  const [totalDaysWork, setTotalDaysWork] = useState(storedUserData.noOfAnnualLeaves); // Fetch or calculate this value if necessary
  const [boxContent, setBoxContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTaskCount = async () => {
      try {
        setLoading(true);
        const { data: taskData } = await getTaskCountByEmployeeId(storedUserData.employeeId);
        setTaskCount(taskData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task count:", error);
        setLoading(false);
      }
    };

    fetchTaskCount();
  }, [storedUserData.employeeId]);

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

  useEffect(() => {
    // Update the box content when taskCount, totalSalary, or totalDaysWork changes
    setBoxContent([
      {
        title: "Total Tasks Completed",
        value: taskCount,
        icon: "faTasks",
        color: "rgba(5, 0, 255, 0.17)",
        iconColor: "#2948AB",
      },
      {
        title: "Base Salary",
        value: "LKR " + totalSalary,
        icon: "faChartBar",
        color: "#4ADEDE",
        iconColor: "#02A8B0",
      },
      {
        title: "Remaining Annual Leaves",
        value: totalDaysWork,
        icon: "faCalendarAlt",
        color: "rgba(191, 121, 246, 0.40)",
        iconColor: "#2338EE",
      },
    ]);
  }, [taskCount, totalSalary, totalDaysWork]);

  return !loading ? (
    <>
      <DateAndTimeTracker />
      <DashboardBoxes content={boxContent} />
      <div className="flex flex-row gap-12 px-8">
        <div className="basis-2/3">
          <DashboardChart />
        </div>
        <div className="basis-1/3">
          <div>
            <DashboardSchedule tasks={tasks} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}
