import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker"
import PayrollSection from "../../components/Employee/PayrollSection"
import { useState } from 'react';
import { useEffect } from 'react';
import { getTotalWorkHoursAndOverTimeByEmployeeIdAndMonth } from './../../api/attendanceApiCalls';

const Payroll = () => {

  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data: attendanceData } =
          await getTotalWorkHoursAndOverTimeByEmployeeIdAndMonth(
            storedUserData.employeeId
          );
        setAttendance(attendanceData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task count:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [storedUserData.employeeId]);

  return (
    <div>
      <DateAndTimeTracker />
      <div className="bg-white my-8 p-4 rounded-lg">
        <PayrollSection attendance={attendance} />
      </div>
    </div>
  )
}

export default Payroll