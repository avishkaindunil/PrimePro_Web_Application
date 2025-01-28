import PayrollBoxes from "./PayrollBoxes";
import PayrollChartSection from "./PayrollChartSection";

const PayrollSection = ({ attendance }) => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  // (Monthly Rate/200) * 1.5
  const monthlyRate = (storedUserData.baseSalary / 200) * 1.5;
  const monthlySalary = storedUserData.baseSalary + monthlyRate * attendance.totalOvertimeHours;
  const perDaySalary = storedUserData.baseSalary / 30;

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });

  const payrollContent = [
    {
      icon: "faCalendarAlt",
      title: "LKR " + monthlyRate * attendance.totalOvertimeHours,
      description: "Overtime Payroll (until "+formattedDate+")",
      url: "/employee/payroll",
    },
    {
      icon: "faTasks",
      title: "LKR " + monthlySalary,
      description: "Total Payroll (for full month)",
      url: "/employee/payroll",
    },
    {
      icon: "faUsers",
      title: "30th "+currentMonth+" 2024",
      description: "Pay Day",
      url: "/employee/payroll",
    },
  ];

  return (
    <div>
      <PayrollBoxes content={payrollContent} />
      <PayrollChartSection monthlySalary={storedUserData.baseSalary} overtimeSalary={monthlyRate * attendance.totalOvertimeHours} />
    </div>
  );
};

export default PayrollSection;
