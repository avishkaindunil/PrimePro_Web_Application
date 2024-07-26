import React from 'react';
import AppHeader from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ userType }) => {
  return (
    <div className='flex h-screen'>
      <div className="fixed w-[230px]">
        <SideBar userType={userType} />
      </div>
      <div className="ml-[230px] flex-1 flex flex-col">
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

export default MainLayout;
