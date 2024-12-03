import PayrollCurrentPaymentChart from "./PayrollCurrentPaymentChart";
import PayrollPreviousPaymentChart from "./PayrollPreviousPaymentChart";

const PayrollChartSection = ({monthlySalary,overtimeSalary}) => {
  return (
    <div className="flex justify-evenly items-start p-8">
      <div className="basis-3/5 flex flex-col gap-8">
        <div className="text-2xl font-semibold">
          Salary for the past 5 months
        </div>
        <div className="px-8 m-4">
          <PayrollPreviousPaymentChart />
        </div>
      </div>
      <div className="basis-2/5 flex flex-col gap-8">
        <div className="text-2xl font-semibold">Salary for Current Month</div>
        <div className="px-8 m-4">
          <PayrollCurrentPaymentChart monthlySalary={monthlySalary} overtimeSalary={overtimeSalary} />
        </div>
      </div>
    </div>
  );
};

export default PayrollChartSection;
