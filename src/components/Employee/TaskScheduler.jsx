import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const TaskScheduler = ({ tasksData }) => {
  // Map tasksData to match the scheduleData structure
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const formattedTasks = tasksData.map((task) => ({
      id: task.id,
      name: `Customer ${task.customerId}`, // Placeholder, adjust as needed
      description: task.taskDescription.split(" - ")[0], // Extract description
      vehicle: task.taskDescription.split(" - ")[1] || "Unknown Vehicle", // Extract vehicle
      startTime: new Date(`${task.taskDate.split("T")[0]}T${task.startTime}`)
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      endTime: new Date(`${task.taskDate.split("T")[0]}T${task.endTime}`)
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      location: "Branch Location", // Placeholder for location
      status: task.taskStatus,
    }));
    setTasks(formattedTasks);
  }, [tasksData]);

  const handleChangeStatus = (id, currentStatus) => {
    if (currentStatus === "COMPLETED" || currentStatus === "REJECTED") {
      Swal.fire({
        icon: "info",
        title: "Status Change",
        text: `This task is already ${currentStatus.toLowerCase()} and cannot be changed.`,
      });
    } else {
      const newStatusOptions =
        currentStatus === "ACCEPTED"
          ? { PENDING: "Pending" }
          : currentStatus === "PENDING"
          ? { COMPLETED: "Completed" }
          : {
              PENDING: "Pending",
              ACCEPTED: "Accepted",
              REJECTED: "Rejected",
              COMPLETED: "Completed",
            };

      Swal.fire({
        title: "Change Task Status",
        input: "select",
        inputOptions: newStatusOptions,
        inputPlaceholder: "Select new status",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve();
            } else {
              resolve("You need to select a status");
            }
          });
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedTasks = tasks.map((task) =>
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
              <td
                className={`py-2 px-4 border-b ${
                  data.status === "PENDING"
                    ? "text-yellow-500"
                    : data.status === "ACCEPTED"
                    ? "text-blue-500"
                    : data.status === "COMPLETED"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {data.status}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className={`py-1 px-3 rounded ${
                    data.status === "PENDING"
                      ? "bg-yellow-500 text-white"
                      : data.status === "ACCEPTED"
                      ? "bg-blue-500 text-white"
                      : data.status === "COMPLETED"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
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
