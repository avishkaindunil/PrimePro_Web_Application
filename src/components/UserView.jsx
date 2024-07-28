// import React from 'react'
import PropTypes from 'prop-types';
import Profilepic from '../assets/profilepic.png';

const UserView = () => {
  return (
    <>
        <div className="bg-[#F9F9F9] rounded-[10px] m-7 ml-[40px] mr-[40px] shadow-lg">
            <div className="box-border flex justify-center rounded-full"><img src={Profilepic}/></div>
            <div className='flex justify-center'>Howard</div>
            <div className='flex justify-center'>Auto Miraj HR</div>            
        </div>
    </>
  )
}

UserView.propTypes = {
    userType: PropTypes.string.isRequired,
  };

export default UserView