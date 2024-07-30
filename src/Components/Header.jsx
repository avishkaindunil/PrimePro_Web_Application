import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'

const AppHeader = () => {
  return (
    <div className="">
      {/* <header className="h-6 bg-black"></header> */}
      <div className="flex items-center justify-end mr-8 bg-white h-[55px]"><FontAwesomeIcon className="text-xl" icon={faBell}/></div>
    </div>
  )
}

export default AppHeader
