import React from "react";

const OneTask = ({ booking }) => {
  const formatTime = (time) => {
    return time.slice(0, 5);
  };

  return (
    <div>
      <div className="p-2 bg-white rounded-lg shadow-md pl-9 ">
        
          <h1 className="mb-2 text-lg font-semibold ">
            {booking.carName} - {booking.service}
          </h1>
          
        <div className="flex justify-center space-x-10 ">
        <p className="text-[#5F6165] border-r-2 border-x-black pr-10">Booking ID - {booking.bookingId}</p>
        <p className="text-[#5F6165]  border-r-2 border-x-black pr-10">Customer ID - {booking.userID}</p>
        <p className="text-[#5F6165]">
          Start Time - {formatTime(booking.time)}
        </p>
        </div>
        
      </div>
    </div>
  );
};

export default OneTask;
