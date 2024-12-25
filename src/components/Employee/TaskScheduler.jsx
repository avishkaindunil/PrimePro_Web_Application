import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { updateTaskStatus } from "./../../api/taskApiCalls";

const TaskScheduler = ({ tasksData }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const isInitialRender = useRef(true); // Tracks the first render

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDate();

  // Initialize tasks on the first render
  useEffect(() => {
    console.log("Task data change");
    console.log(tasksData);
    setLoading(true);
    const formattedTasks = tasksData.map((task) => ({
      id: task.id,
      name: `Customer ${task.customerId}`,
      description: task.taskDescription.split(" - ")[0],
      vehicle: task.taskDescription.split(" - ")[1] || "Unknown Vehicle",
      startTime: new Date(
        `${task.taskDate.split("T")[0]}T${task.startTime}`
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      endTime: new Date(
        `${task.taskDate.split("T")[0]}T${task.endTime}`
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      location: "Branch Location",
      status: task.taskStatus,
      taskDate: task.taskDate.split("T")[0], // Extract date in YYYY-MM-DD format
    }));
    setTasks(formattedTasks);
    isInitialRender.current = false;
    setLoading(false);
  }, [tasksData]);

  const handleChangeStatus = (id, currentStatus) => {
    if (currentStatus === "COMPLETED") {
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, status: result.value } : task
          );
          setTasks(updatedTasks);

          const tasksDataDetails = {
            taskId: id,
            status: result.value,
          };

          await updateTaskStatusDetails(tasksDataDetails);
        }
      });
    }
  };

  const updateTaskStatusDetails = async (tasksDataDetails) => {
    try {
      setLoading(true);
      const { data: taskDataDetails } = await updateTaskStatus(tasksDataDetails);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Task Status Update Success.",
      });
    } catch (error) {
      console.error("Error fetching task status:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating task status.",
      });
    }
  };

  return !loading ? (
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
                    data.taskDate !== todayDate
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed opacity-60"
                      : data.status === "PENDING"
                      ? "bg-yellow-500 text-white"
                      : data.status === "ACCEPTED"
                      ? "bg-blue-500 text-white"
                      : data.status === "COMPLETED"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  onClick={() => handleChangeStatus(data.id, data.status)}
                  disabled={data.taskDate !== todayDate}
                  title={
                    data.taskDate !== todayDate
                      ? "You can only change today's tasks"
                      : "Change Task Status"
                  }
                >
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default TaskScheduler;
