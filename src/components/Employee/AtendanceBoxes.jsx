import { useEffect, useState } from 'react';
import { getTotalWorkHoursAndOverTimeByEmployeeIdAndMonth } from './../../api/attendanceApiCalls';

const AtendanceBoxes = () => {

  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const boxClass =
    "flex flex-col py-8 px-16 rounded-md bg-[#061651] text-white items-center justify-center w-64";

  const takenLeaves = (21 + 7) - (storedUserData.noOfAnnualLeaves + storedUserData.noOfCasualLeaves);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data: attendanceData } = await getTotalWorkHoursAndOverTimeByEmployeeIdAndMonth(storedUserData.employeeId);
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
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex gap-4">
        <div className={boxClass}>
          <div>{storedUserData.noOfAnnualLeaves}</div>
          <div>Annual Leaves</div>
        </div>
        <div className={boxClass}>
          <p>{attendance.totalOvertimeHours} Hours</p>
          <p>Overtime</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className={boxClass}>
          <p>{storedUserData.noOfCasualLeaves} Leaves</p>
          <p>Casual Leaves</p>
        </div>
        <div className={boxClass}>
          <p>{takenLeaves} Leaves</p>
          <p>Taken</p>
        </div>
      </div>
    </div>
  );
};

export default AtendanceBoxes;
