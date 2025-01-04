import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const EmployeesReport = () => {
  const [employeeSummaries, setEmployeeSummaries] = useState([]);
  const [salaryData, setSalaryData] = useState({});

  useEffect(() => {
    // Fetch employee data
    axios.get("http://localhost:8080/reports/employee-summary").then((res) => setEmployeeSummaries(res.data));
    axios.get("http://localhost:8080/reports/salary-summary").then((res) => setSalaryData(res.data));
  }, []);

  const salaryChart = {
    labels: Object.keys(salaryData.salaryBrackets || {}),
    datasets: [
      {
        label: "Number of Employees",
        data: Object.values(salaryData.salaryBrackets || {}),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employee Overview</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold">Salary Distribution</h2>
          <Bar data={salaryChart} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Employee Details</h2>
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Branch</th>
                <th>Designation</th>
                <th>Phone</th>
                <th>Base Salary</th>
              </tr>
            </thead>
            <tbody>
              {employeeSummaries.map((employee) => (
                <tr key={employee.employeeId}>
                  <td>{employee.fullName}</td>
                  <td>{employee.branchName}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.baseSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesReport;
