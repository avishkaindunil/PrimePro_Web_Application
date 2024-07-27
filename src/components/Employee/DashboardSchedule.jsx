import OneSchedule from "./OneSchedule"

const scheduleData = [
    {
        id: 1,
        name: "John Doe",
        description: "Car Wash",
        vehicle: "Toyota Camry",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        location: "Maryville"
    },
    {
        id: 2,
        name: "Jane Smith",
        description: "Car Wash",
        vehicle: "Ford Mustang",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        location: "Jacksonville"
    },
    {
        id: 3,
        name: "David Johnson",
        description: "Car Wash",
        vehicle: "BMW 3 Series",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        location: "Austin"
    },
    {
        id: 4,
        name: "Mary Brown",
        description: "Car Wash",
        vehicle: "Chevrolet Malibu",
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        location: "New York"
    }
]

const DashboardSchedule = () => {
  return (
    <div>
        <h1 className="text-2xl text-black font-semibold mx-2">Scheduled for this day</h1>
        <div className="flex flex-col my-4">
            <OneSchedule schedule={scheduleData} />
        </div>
    </div>
  )
}

export default DashboardSchedule