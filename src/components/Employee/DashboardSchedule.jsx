import OneSchedule from "./OneSchedule";

// const scheduleData = [
//     {
//         id: 1,
//         name: "John Doe",
//         description: "Car Wash",
//         vehicle: "Toyota Camry",
//         startTime: "09:00 AM",
//         endTime: "10:00 AM",
//         location: "Maryville",
//         status: "PENDING"
//     },
//     {
//         id: 2,
//         name: "Jane Smith",
//         description: "Car Wash",
//         vehicle: "Ford Mustang",
//         startTime: "10:00 AM",
//         endTime: "11:00 AM",
//         location: "Jacksonville",
//         status: "ACCEPTED"
//     },
//     {
//         id: 3,
//         name: "David Johnson",
//         description: "Car Wash",
//         vehicle: "BMW 3 Series",
//         startTime: "11:00 AM",
//         endTime: "12:00 PM",
//         location: "Austin",
//         status: "REJECTED"
//     },
//     {
//         id: 4,
//         name: "Mary Brown",
//         description: "Car Wash",
//         vehicle: "Chevrolet Malibu",
//         startTime: "12:00 PM",
//         endTime: "01:00 PM",
//         location: "New York",
//         status: "COMPLETED"
//     }
// ]

const DashboardSchedule = ({ tasks }) => {

  const scheduleData = tasks.map((task) => ({
    id: task.id,
    name: `Customer ${task.customerId}`,
    description: task.taskDescription,
    // vehicle: task.taskDescription.split(" - ")[0], 
    startTime: formatTime(task.startTime),
    endTime: formatTime(task.endTime),
    location: "Colombo",
    status: task.taskStatus,
  }));

  return (
    <div>
      <h1 className="text-2xl text-black font-semibold mx-2">
        Scheduled for this day
      </h1>
      <div className="flex flex-col my-4">
        <OneSchedule schedule={scheduleData} />
      </div>
    </div>
  );

};

const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${formattedHour}:${minute} ${period}`;
  };

export default DashboardSchedule;
