import React from 'react'

const OneTask = ({ booking }) => {
  const formatTime = (time) => {
    return time.slice(0, 5);
  }

  return (
    <div>
      <div className="p-2 bg-white rounded-lg shadow-md">
        <h1 className="text-base">{booking.carName} - {booking.service}</h1>
        <p className="text-[#5F6165]">Booking ID - {booking.bookingId}</p>
        <p className="text-[#5F6165]">Customer ID - {booking.userID}</p>
        <p className="text-[#5F6165]">Start Time - {formatTime(booking.time)}</p>
      </div>
    </div>
  )
}

export default OneTask
