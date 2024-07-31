import { useState } from 'react';
import Swal from 'sweetalert2';

const scheduleData = [
    {
        id: 1,
        name: "John Doe",
        description: "Car Wash",
        vehicle: "Toyota Camry",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        location: "Maryville",
        status: "COMPLETED"
    },
    {
        id: 2,
        name: "Jane Smith",
        description: "Car Wash",
        vehicle: "Ford Mustang",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        location: "Jacksonville",
        status: "ACCEPTED"
    },
    {
        id: 3,
        name: "David Johnson",
        description: "Car Wash",
        vehicle: "BMW 3 Series",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        location: "Austin",
        status: "REJECTED"
    },
    {
        id: 4,
        name: "Mary Brown",
        description: "Car Wash",
        vehicle: "Chevrolet Malibu",
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        location: "New York",
        status: "PENDING"
    }
];

const TaskScheduler = () => {
    const [tasks, setTasks] = useState(scheduleData);

    const handleChangeStatus = (id, currentStatus) => {
        if (currentStatus === "COMPLETED" || currentStatus === "REJECTED") {
            Swal.fire({
                icon: 'info',
                title: 'Status Change',
                text: `This task is already ${currentStatus.toLowerCase()} and cannot be changed.`
            });
        } else {
            Swal.fire({
                title: 'Change Task Status',
                input: 'select',
                inputOptions: {
                    'PENDING': 'Pending',
                    'ACCEPTED': 'Accepted',
                    'REJECTED': 'Rejected',
                    'COMPLETED': 'Completed'
                },
                inputPlaceholder: 'Select new status',
                showCancelButton: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value) {
                            resolve();
                        } else {
                            resolve('You need to select a status');
                        }
                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const updatedTasks = tasks.map(task =>
                        task.id === id ? { ...task, status: result.value } : task
                    );
                    setTasks(updatedTasks);
                }
            });
        }
    };

    return (
        <div className="container mx-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Service</th>
                        <th className="py-2 px-4 border-b">Start Time</th>
                        <th className="py-2 px-4 border-b">End Time</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {tasks.map((data) => (
                        <tr key={data.id}>
                            <td className="py-2 px-4 border-b">{`${data.vehicle} - ${data.description}`}</td>
                            <td className="py-2 px-4 border-b">{data.startTime}</td>
                            <td className="py-2 px-4 border-b">{data.endTime}</td>
                            <td className={`py-2 px-4 border-b ${
                                data.status === 'PENDING' ? 'text-yellow-500' :
                                data.status === 'ACCEPTED' ? 'text-blue-500' :
                                data.status === 'COMPLETED' ? 'text-green-500' : 'text-red-500'
                            }`}>
                                {data.status}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    className={`py-1 px-3 rounded ${
                                        data.status === 'PENDING' ? 'bg-yellow-500 text-white' :
                                        data.status === 'ACCEPTED' ? 'bg-blue-500 text-white' :
                                        data.status === 'COMPLETED' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                    }`}
                                    onClick={() => handleChangeStatus(data.id, data.status)}
                                >
                                    Change Status
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskScheduler;
