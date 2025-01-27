import React from 'react';

const OneTask = ({ booking }) => {
  const Scheduletime = (start, end) => {
    const starthour = start.getHours().toString().padStart(2, '0');
    const startminute = start.getMinutes().toString().padStart(2, '0');
    const endhour = end.getHours().toString().padStart(2, '0');
    const endminute = end.getMinutes().toString().padStart(2, '0');

    return `${starthour}:${startminute} - ${endhour}:${endminute}`;
  };

  // Convert date and time to Date objects
  const bookingDate = new Date(booking.date);  // Full date from booking
  const startTimeStr = booking.startTime.split(":");
  const endTimeStr = booking.endTime.split(":");

  const startTime = new Date(bookingDate);
  startTime.setHours(parseInt(startTimeStr[0]), parseInt(startTimeStr[1]), parseInt(startTimeStr[2]));

  const endTime = new Date(bookingDate);
  endTime.setHours(parseInt(endTimeStr[0]), parseInt(endTimeStr[1]), parseInt(endTimeStr[2]));

  // Highlight current time period
  const now = new Date();
  const isCurrent = now >= startTime && now <= endTime;

  return (
    <div
      className={`p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all ${
        isCurrent ? 'bg-green-100 border-2 border-green-600' : 'bg-white'
      }`}
    >
      <h1 className="text-lg font-semibold text-gray-800">
        {booking.carName} - {booking.service}
      </h1>
      <p className="text-sm text-gray-600">
        Customer ID: <span className="font-medium">{booking.userID}</span>
      </p>
      <p className="text-sm text-gray-500">
        {Scheduletime(startTime, endTime)}
      </p>
      {isCurrent && (
        <p className="text-sm font-bold text-green-700 mt-2">Happening Now!</p>
      )}
    </div>
  );
};

export default OneTask;
