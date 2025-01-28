import React from 'react'
import DateAndTimeTracker from '../../components/Employee/DateAndTimeTracker'
import CalenderShedule from '../../components/CarWashCenter/CalenderShedule'
import SheduleDetails from '../../components/CarWashCenter/SheduleDetails'

const BookingCalendar = () => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="w-3/6 px-5">
          {/* <CalenderwithCurrDate/> */}
          <div className="mt-5">
            <div className="h-full space-y-2 overflow-y will-change-scroll">
              <SheduleDetails />
            </div>
          </div>
        </div>
        <div className="w-3/6 px-5">
          {/* <DateAndTimeTracker/> */}
          <div className="mt-5">
            <CalenderShedule />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingCalendar
