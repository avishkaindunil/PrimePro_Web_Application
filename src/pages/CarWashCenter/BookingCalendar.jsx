import React from 'react'
import DateAndTimeTracker from '../../components/Employee/DateAndTimeTracker'
import CalenderShedule from '../../components/CarWashCenter/CalenderShedule'
import CalenderwithCurrDate from '../../components/CarWashCenter/CalenderwithCurrDate'
import SheduleDetails from '../../components/CarWashCenter/SheduleDetails'

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
          {/* <CalenderwithCurrDate/> */}
          <div className="mt-5 ">
            <h1 className="pb-3 text-2xl font-semibold">Shedules for Today</h1>
            <div className="h-full space-y-2 overflow-y-scroll will-change-scroll">
              <SheduleDetails/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingCalendar
