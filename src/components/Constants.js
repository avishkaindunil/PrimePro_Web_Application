import { iconName } from "@fortawesome/free-brands-svg-icons/fa42Group";

export const employeeSidebarTabNames = [
    { name: "Home", icon: "faTachometerAlt", url: "employee/dashboard"},
    { name: "Profile", icon: "faUsers", url: "employee/profile" },
    { name: "Calender", icon: "faUsers", url: "employee/calendar" },
    { name: "Payroll", icon: "faCalendarAlt", url: "employee/payroll" },
    { name: "Custom Support", icon: "faUsers", url: "employee/customSupport" },
    { name: "Settings", icon: "faCog", url:"employee/settings"},
    { name: "Logout" , icon: "faSignOutAlt", url:"employee/logout"}
];

export const userTypes = {
    EMPLOYEE: "EMPLOYEE",
    CUSTOMER: "Customer",
    CAR_WASH_CENTER_ADMIN: "ADMIN"
}

export const carwashcenterSidebarTabNames =[

    {name:"Dashboard", icon:"faTachometerAlt" , url:"CarWashCenter/dashboard"},
    {name:"Booking Calendar", icon:"faCalendarAlt", url:"CarWashCenter/BookingCalendar"},
    {name:"Employees", icon:"faUsers", url:"CarWashCenter/Employee"},
    {name:"Task Assign", icon:"faTasks", url:"CarWashCenter/TaskAssign"},
    {name:"Workload Progress", icon:"faChartBar", url:"CarWashCenter/WorkloadProgress"},
    {name:"Custom Support", icon:"faHeadset", url:"CarWashCenter/CustomSupport"}

];