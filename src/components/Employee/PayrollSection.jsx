import PayrollBoxes from "./PayrollBoxes";
import PayrollChartSection from "./PayrollChartSection";

const payrollContent = [
    {
        icon: "faCalendarAlt",
        title: "LKR 25000",
        description: "Total payroll",
        url: "/employee/payroll"
    },
    {
        icon: "faUsers",
        title: "25th Nov 2024",
        description: "Start Date",
        url: "/employee/payroll"
    },
    {
        icon: "faTasks",
        title: "24th Oct 2024",
        description: "Pay Day",
        url: "/employee/payroll"
    }
];

const PayrollSection = () => {
  return (
    <div>
        <PayrollBoxes content={payrollContent} />
        <PayrollChartSection />
    </div>
  )
}

export default PayrollSection