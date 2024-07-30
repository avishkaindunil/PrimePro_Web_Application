import React from 'react'
import DateAndTimeTracker from '../../components/Employee/DateAndTimeTracker'
import CalenderShedule from '../../components/CarWashCenter/CalenderShedule'
import CalenderwithCurrDate from '../../components/CarWashCenter/CalenderwithCurrDate'

const BookingCalendar = () => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="w-4/6 p-5">
          <DateAndTimeTracker/>
          <div className="mt-5">
            <CalenderShedule/>
          </div>
        </div>
        <div className="w-2/6 p-5">
          <CalenderwithCurrDate/>
        </div>
      </div>
    </div>
  )
}

export default BookingCalendar
