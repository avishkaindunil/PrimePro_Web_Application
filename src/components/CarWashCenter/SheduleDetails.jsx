import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router is used
import { publicAuthRequest } from "../../constants/requestMethods";
import Swal from "sweetalert2";

const SheduleDetails = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await publicAuthRequest.get(`/centerAdmin/get-all-bookings`);
        const parsedBookings = response.data.map((booking) => ({
          id: booking.bookingId,
          title: `${booking.carName || "Unknown Car"} - ${booking.service || "Unknown Service"}`,
          bookingDate: booking.date,
          taskStatus: booking.taskAssigned ? "Assigned" : "Not Assigned",
          customerName: booking.customer_name || "N/A",
        }));

        setBookings(parsedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch bookings. Please try again later.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    fetchBookings();
  }, []);

  const handleNavigate = (bookingId) => {
    navigate(`/carwashcenteradmin/taskassign`, { state: { bookingId } });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">Task Assign History</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2">{booking.title}</h2>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Customer:</span> {booking.customerName}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Date:</span> {booking.bookingDate}
              </p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  booking.taskStatus === "Assigned" ? "text-green-500" : "text-red-500"
                }`}
              >
                Status: {booking.taskStatus}
              </p>
              <button
                onClick={() => !booking.taskAssigned && handleNavigate(booking.id)}
                disabled={booking.taskStatus === "Assigned"}
                className={`w-full mt-4 px-4 py-2 rounded transition-colors ${
                  booking.taskStatus === "Assigned"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {booking.taskStatus === "Assigned" ? "Already Assigned" : "Assign Task"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SheduleDetails;
