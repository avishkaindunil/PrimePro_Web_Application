import React from 'react'


const OneTask = ({booking}) => {

    const Scheduletime=(start,end)=>{
        const starthour = start.getHours().toString().padStart(2, '0');
        const startminute = start.getMinutes().toString().padStart(2, '0');
        const endhour = end.getHours().toString().padStart(2, '0');
        const endminute = end.getMinutes().toString().padStart(2, '0');
    
        return `${starthour}:${startminute} - ${endhour}:${endminute}`;
        
    }
  return (
    <div>
      <div className="p-2 bg-white rounded-lg shadow-md">
                <h1 className="text-base">{booking.carName} - {booking.service}</h1>
                <p className="text-[#5F6165]">Customer ID - {booking.userID}</p>

                {/* <p>{today}</p> */}
            </div>
    </div>
  )
}

export default OneTask
