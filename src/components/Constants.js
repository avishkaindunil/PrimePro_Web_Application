export const employeeSidebarTabNames = [
    { name: "Home", icon: "faHome", url: "employee/dashboard" },
    { name: "Profile", icon: "faUser", url: "employee/profile" },
    { name: "Task Schedule", icon: "faCalendarCheck", url: "employee/calendar" },
    { name: "Attendance", icon: "faCheckSquare", url: "employee/attendance" },
    { name: "Payroll", icon: "faMoneyCheckAlt", url: "employee/payroll" },
    { name: "Custom Support", icon: "faHeadset", url: "employee/customSupport" }
];

export const userTypes = {
    EMPLOYEE: "EMPLOYEE",
    CUSTOMER: "CUSTOMER",
    CAR_WASH_CENTER_ADMIN: "CAR_WASH_CENTER_ADMIN"
}

export const carwashcenterSidebarTabNames =[
    {name:"Dashboard", icon:"faTachometerAlt" , url:"CarWashCenterAdmin/dashboard"},
    {name:"Booking Calendar", icon:"faCalendarAlt", url:"CarWashCenterAdmin/bookingCalender"},
    {name:"Employees", icon:"faUsers", url:"CarWashCenterAdmin/employees"},
    {name:"Task Assign", icon:"faTasks", url:"CarWashCenterAdmin/taskAssign"},
    {name:"Workload Progress", icon:"faChartBar", url:"CarWashCenterAdmin/workloadProgress"},
    {name:"Custom Support", icon:"faHeadset", url:"CarWashCenterAdmin/customSupport"}
];