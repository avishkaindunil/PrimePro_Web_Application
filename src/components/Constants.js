import { iconName } from "@fortawesome/free-brands-svg-icons/fa42Group";

export const employeeSidebarTabNames = [
    { name: "Home", icon: "faTachometerAlt", url: "employee/dashboard"},
    { name: "Profile", icon: "faUsers", url: "employee/profile" },
    { name: "Calender", icon: "faUsers", url: "employee/calendar" },
    { name: "Payroll", icon: "faCalendarAlt", url: "employee/payroll" },
    { name: "Custom Support", icon: "faUsers", url: "employee/customSupport" }
];

export const userTypes = {
    EMPLOYEE: "Employee",
    CUSTOMER: "Customer",
    CAR_WASH_CENTER_ADMIN: "CarWashCenterAdmin"
}

export const carwashcenterSidebarTabNames =[
    {name:"Dashboard", icon:"faTachometerAlt" , url:"CarWashCenterAdmin/dashboard"},
    {name:"Booking Calendar", icon:"faCalendarAlt", url:"CarWashCenterAdmin/bookingCalender"},
    {name:"Employees", icon:"faUsers", url:"CarWashCenterAdmin/employees"},
    {name:"Task Assign", icon:"faTasks", url:"CarWashCenterAdmin/taskAssign"},
    {name:"Workload Progress", icon:"faChartBar", url:"CarWashCenterAdmin/workloadProgress"},
    {name:"Custom Support", icon:"faHeadset", url:"CarWashCenterAdmin/customSupport"}
];