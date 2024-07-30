import AtendanceBoxes from "../../components/Employee/AtendanceBoxes";
import AttendanceChart from "../../components/Employee/AttendanceChart";
import AttendanceSummary from "../../components/Employee/AttendanceSummary";
import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker";

const Attendance = () => {
  return (
    <div>
      <DateAndTimeTracker />
      <div className="bg-white my-8 p-8 rounded-lg">
        <AtendanceBoxes />
        <div className="pt-12">
          <AttendanceSummary />
        </div>
        <div className="pt-12">
          <AttendanceChart />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
