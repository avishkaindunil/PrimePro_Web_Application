// import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';


const AppHeader = () => {
  return (
    <div className="w-full">
      {/* <header className="h-6 bg-black"></header> */}
      <div className="flex items-center justify-end mr-8 bg-white h-[55px]"><FontAwesomeIcon className="text-xl" icon={faBell}/></div>
    </div>
  )
}

AppHeader.propTypes = {
  userType: PropTypes.string.isRequired,
};


export default AppHeader