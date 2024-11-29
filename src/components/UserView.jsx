// import React from 'react'
import PropTypes from 'prop-types';
import Profilepic from '../assets/profilepic.png';
import { userTypes } from './Constants';

const UserView = () => {
  const storedUserData = localStorage.getItem("userData");

  const user = storedUserData ? JSON.parse(storedUserData) : null;
  return (
    <>
        <div className="bg-[#F9F9F9] rounded-[10px] m-7 ml-[40px] mr-[40px] shadow-lg p-4 text-center">
            <div className="box-border flex justify-center rounded-full"><img src={Profilepic}/></div>
            <div className='flex justify-center py-2 text-xl font-semibold'>{user?.name ? user?.name : "Binali"}</div>
            <div className='flex justify-center text-sm'>{user?.role == userTypes.EMPLOYEE ? "Auto Miraj Employee" : "Auto Miraj Branch Manager"}</div>            
        </div>
    </>
  )
}

UserView.propTypes = {
    userType: PropTypes.string.isRequired,
  };

export default UserView
