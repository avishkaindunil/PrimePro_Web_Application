import React from 'react'

const bookings =[
    {
        title: 'Car Wash - Toyota Prius',
        start: new Date(2024, 6, 30, 8, 0), // July is month 6 (0-based index)
        end: new Date(2024, 6, 30, 12, 0),
        resource: 'Event 1'
      },
      {
        title: 'Vehicle Waxing - Land Cruiser',
        start: new Date(2024, 6, 31, 8, 0),
        end: new Date(2024, 6, 31, 9, 0),
        resource: 'Event 2'
      },
      {
        title: 'Full Service -  Honda',
        start: new Date(2024, 7, 1, 10, 0),
        end: new Date(2024, 7, 1, 11, 0),
        resource: 'Event 3'
      },
      {
        title: 'Car Wash - Toyota Prius',
        start: new Date(2024, 7, 1, 15, 0),
        end: new Date(2024, 7, 1, 16, 0),
        resource: 'Event 4'
      },
      {
        title: 'Car Wash - Toyota Prius',
        start: new Date(2024, 7, 1, 15, 0),
        end: new Date(2024, 7, 1, 16, 0),
        resource: 'Event 4'
      },
      {
        title: 'Car Wash - Toyota Prius',
        start: new Date(2024, 7, 1, 15, 0),
        end: new Date(2024, 7, 1, 16, 0),
        resource: 'Event 4'
      }
];

const today = new Date();

const Scheduletime=(start,end)=>{
    const starthour = start.getHours().toString().padStart(2, '0');
    const startminute = start.getMinutes().toString().padStart(2, '0');
    const endhour = end.getHours().toString().padStart(2, '0');
    const endminute = end.getMinutes().toString().padStart(2, '0');

    return `${starthour}:${startminute} - ${endhour}:${endminute}`;
    
}

const SheduleDetails = () => {
  return (
    <>
        {bookings.map((booking)=>(
            <div className="p-2 bg-white rounded-lg shadow-md">
                <h1 className="text-base">{booking.title}</h1>
                <p className="text-[#5F6165]">{Scheduletime(booking.start, booking.end)}</p>
                {/* <p>{today}</p> */}
            </div>
        ))}
        
    </>
  )
}

export default SheduleDetails
