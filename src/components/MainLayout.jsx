// import React from 'react';
import AppHeader from './Header';
import SideBar from './Sidebar';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';


const MainLayout = ({ userType }) => {
  return (
    <div className='flex h-screen w-screen flex-row border overflow-hidden'>
      <div className="w-[230px] flex-shrink-0">
        <SideBar userType={userType} />
      </div>
      <div className="flex-1 flex flex-col w-full">
        <div className="header">
          <AppHeader />
        </div>
        <div className='content flex-1 overflow-auto bg-[#D3E1E8] p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
    userType: PropTypes.string.isRequired,
  };
  
export default MainLayout;