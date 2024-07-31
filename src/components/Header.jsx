// import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';


const AppHeader = () => {
  return (
    <div className="w-full">
     
      <div className="flex items-center justify-end mr-8 bg-white h-[55px]">
      <h3 className="text-xl font-bold text-indigo-950 ">Auto Miraj Car Center</h3>
        <FontAwesomeIcon className="text-xl ml-96" icon={faBell}/></div>
    </div>
  )
}

AppHeader.propTypes = {
  userType: PropTypes.string.isRequired,
};


export default AppHeader