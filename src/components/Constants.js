export const employeeSidebarTabNames = [
    { name: "Home", icon: "faHome", url: "employee/dashboard" },
    { name: "Profile", icon: "faUser", url: "employee/profile" },
    { name: "Task Schedule", icon: "faCalendarCheck", url: "employee/calendar" },
    { name: "Attendance", icon: "faCheckSquare", url: "employee/attendance" },
    { name: "Payroll", icon: "faMoneyCheckAlt", url: "employee/payroll" },
    { name: "Apply Leave", icon: "faCalendarCheck", url: "employee/leave" },
    { name: "Leave History", icon: "faCalendarCheck", url: "employee/leaveHistory" },
    { name: "Custom Support", icon: "faHeadset", url: "employee/customSupport" }
];

export const userTypes = {
    EMPLOYEE: "EMPLOYEE",
    CUSTOMER: "CUSTOMER",
    CAR_WASH_CENTER_ADMIN: "ADMIN",
    SYSTEM_ADMIN: "SYSTEMADMIN"
}

export const carwashcenterSidebarTabNames =[
    {name:"Dashboard", icon:"faTachometerAlt" , url:"CarWashCenterAdmin/dashboard"},
    {name:"Booking Calendar", icon:"faCalendarAlt", url:"CarWashCenterAdmin/bookingCalender"},
    {name:"Employees", icon:"faUsers", url:"CarWashCenterAdmin/employees"},
    {name:"Task Assign", icon:"faTasks", url:"CarWashCenterAdmin/taskAssign"},
    {name:"Workload Progress", icon:"faChartBar", url:"CarWashCenterAdmin/workloadProgress"},
    // {name:"Custom Support", icon:"faHeadset", url:"CarWashCenterAdmin/customSupport"},
    {name:"Reports", icon:"faHeadset", url:"CarWashCenterAdmin/reports"},
    {name:"Attendance Approve", icon:"faHeadset", url:"CarWashCenterAdmin/attendanceApproval"},
    // {name:"Leave Request", icon:"faHeadset", url:"CarWashCenterAdmin/leaverequest"}
];


export const systemAdminSidebarTabNames =[
    {name:"Dashboard", icon:"faTachometerAlt" , url:"systemAdmin/dashboard"},
    // {name:"Car Centers", icon:"faHome", url:"systemAdmin/CarCenters"},
    // {name:"Technical Support", icon:"faHeadset", url:"systemAdmin/technicalSupport"},
    // {name:"Data Analytics", icon:"faTasks", url:"systemAdmin/dataAnalytics"},
    {name:"System Users", icon:"faUsers", url:"systemAdmin/users"},
    {name:"Employees", icon:"faChartBar", url:"systemAdmin/employeesReport"},
    {name:"Attendance", icon:"faChartBar", url:"systemAdmin/attendanceReport"},
    // {name:"System Security", icon:"faUsers", url:"systemAdmin/monitorSystemSecurity"},
    // {name:"Policy Development", icon:"faHeadset", url:"systemAdmin/policyDevelopment"}

   
];

export const bookingStatus = {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED",
    COMPLETED: "COMPLETED"
}