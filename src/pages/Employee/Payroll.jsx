import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker"
import PayrollSection from "../../components/Employee/PayrollSection"


const Payroll = () => {
  return (
    <div>
      <DateAndTimeTracker />
      <div className="bg-white my-8 p-4 rounded-lg">
        <PayrollSection />
      </div>
    </div>
  )
}

export default Payroll