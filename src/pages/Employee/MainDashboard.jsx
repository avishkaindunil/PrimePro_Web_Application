import DashboardBoxes from "../../components/Employee/DashboardBoxes";
import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker";
import DashboardChart from './../../components/Employee/DashboardChart';
import DashboardSchedule from './../../components/Employee/DashboardSchedule';

const boxContent = [
  {
    title: "Total Tasks Completed",
    value: "18",
    icon: "faTasks",
    color: "rgba(5, 0, 255, 0.17)",
    iconColor: "#2948AB",
  },
  {
    title: "Total Salary",
    value: "LKR 25000",
    icon: "faChartBar",
    color: "#4ADEDE",
    iconColor: "#02A8B0",
  },
  {
    title: "Days Worked",
    value: "18",
    icon: "faCalendarAlt",
    color: "rgba(191, 121, 246, 0.40)",
    iconColor: "#2338EE",
  },
];

export default function MainDashboard() {
  return (
    <>
      <DateAndTimeTracker />
      <DashboardBoxes content={boxContent} />
      <div className="flex flex-row gap-12 px-8">
        <div className="basis-2/3">
          <DashboardChart />
        </div>
        <div className="basis-1/3">
          <DashboardSchedule />
        </div>
      </div>
    </>
  );
}
