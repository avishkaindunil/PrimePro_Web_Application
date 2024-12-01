import DashboardBoxes from "../../components/Employee/DashboardBoxes";
import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker";
import DashboardChart from "./../../components/Employee/DashboardChart";
import DashboardSchedule from "./../../components/Employee/DashboardSchedule";
import { useState, useEffect } from "react";
import { getTaskCountByEmployeeId } from "./../../api/taskApiCalls";

export default function MainDashboard() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [taskCount, setTaskCount] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0); // Fetch or calculate this value if necessary
  const [totalDaysWork, setTotalDaysWork] = useState(0); // Fetch or calculate this value if necessary
  const [boxContent, setBoxContent] = useState([]);
  const [loading, setLoading] = useState(true);

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
        title: "Total Salary",
        value: "LKR " + totalSalary,
        icon: "faChartBar",
        color: "#4ADEDE",
        iconColor: "#02A8B0",
      },
      {
        title: "Days Worked",
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
            <DashboardSchedule />
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}
