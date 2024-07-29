import AtendanceBoxes from "../../components/Employee/AtendanceBoxes"
import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker"

const Attendance = () => {
  return (
    <div>
      <DateAndTimeTracker />
      <div className="bg-white my-8 p-8 rounded-lg">
        <AtendanceBoxes />
      </div>
    </div>
  )
}

export default Attendance