import AtendanceBoxes from "../../components/Employee/AtendanceBoxes";
import AttendanceChart from "../../components/Employee/AttendanceChart";
import AttendanceSummary from "../../components/Employee/AttendanceSummary";
import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker";
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllAttendanceByEmployeeId, getTotalWorkHoursAndOverTimeByEmployeeIdAndMonth } from './../../api/attendanceApiCalls';

const Attendance = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data: attendanceData } = await getAllAttendanceByEmployeeId(storedUserData.employeeId);
        setAttendance(attendanceData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task count:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [storedUserData.employeeId, flag]);

  useEffect(()=>{
    updateAttendanceDate();
  },[]);

  const updateAttendanceDate = async () => {
    // window.location.reload();
    try {
      setLoading(true);
      const { data: attendanceData } = await getTotalWorkHoursAndOverTimeByEmployeeIdAndMonth(storedUserData.employeeId);
      setAttendanceData(attendanceData);
      setFlag(!flag);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching task count:", error);
      setLoading(false);
    }
  }

  return !loading ? (
    <div>
      <DateAndTimeTracker />
      <div className="bg-white my-8 p-8 rounded-lg">
        <AtendanceBoxes attendance={attendanceData} />
        <div className="pt-12">
          <AttendanceSummary attendance={attendance} onUpdate={updateAttendanceDate} />
        </div>
        <div className="pt-12">
          <AttendanceChart />
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Attendance;
