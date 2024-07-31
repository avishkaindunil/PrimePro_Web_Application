export const employeeSidebarTabNames = [
    { name: "Home", icon: "faTachometerAlt", url: "employee/dashboard"},
    { name: "Profile", icon: "faUsers", url: "employee/profile" },
    { name: "Calender", icon: "faUsers", url: "employee/calendar" },
    { name: "Attendance", icon: "faUsers", url: "employee/attendance" },
    { name: "Payroll", icon: "faCalendarAlt", url: "employee/payroll" },
    { name: "Custom Support", icon: "faUsers", url: "employee/customSupport" }
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