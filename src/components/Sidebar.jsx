// import React from 'react';
import PropTypes from "prop-types"; // Import PropTypes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCalendarAlt,
  faUsers,
  faTasks,
  faChartBar,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UserView from "./UserView";
import Logo from "../assets/Logo.png";
import { employeeSidebarTabNames, userTypes } from "./Constants";

function getIcon(iconName) {
  switch (iconName) {
    case 'faTachometerAlt':
      return faTachometerAlt;
    case 'faUsers':
      return faUsers;
    case 'faCalendarAlt':
      return faCalendarAlt;
    default:
      return null;
  }
}

const SideBar = ({ userType }) => {
  const getSideBarItems = () => {
    switch (userType) {
      case userTypes.EMPLOYEE:
        return (
          <ul className="space-y-4">
            {employeeSidebarTabNames.map((item, index) => (
              <Link key={index} to={`/${item.url.toLowerCase()}`}>
                <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200">
                  <FontAwesomeIcon icon={getIcon(item.icon)} className="mr-4 text-lg" />
                  <span>{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        );

      case userTypes.CAR_WASH_CENTER_ADMIN:
        return (
          <ul className="space-y-4">
            <Link to="/main-dashboard">
              <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200">
                <FontAwesomeIcon
                  icon={faTachometerAlt}
                  className="mr-4 text-lg"
                />
                <span>Dashboard</span>
              </li>
            </Link>
            <Link to="/booking-calendar">
              <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="mr-4 text-lg"
                />
                <span>Booking Calendar</span>
              </li>
            </Link>
            <Link to="/employees">
              <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200">
                <FontAwesomeIcon icon={faUsers} className="mr-4 text-lg" />
                <span>Employees</span>
              </li>
            </Link>
            <Link to="/task-assign">
              <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200">
                <FontAwesomeIcon icon={faTasks} className="mr-4 text-lg" />
                <span>Task Assign</span>
              </li>
            </Link>
            <Link to="/workload-progress">
              <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200">
                <FontAwesomeIcon icon={faChartBar} className="mr-4 text-lg" />
                <span>Workload Progress</span>
              </li>
            </Link>
            <Link to="/customsupport">
              <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200">
                <FontAwesomeIcon icon={faHeadset} className="mr-4 text-lg" />
                <span>Custom support</span>
              </li>
            </Link>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="top-0 h-screen bg-white border">
      <img className="flex justify-center p-3 m-2" src={Logo} alt="Logo" />
      <UserView />
      {getSideBarItems()}
    </div>
  );
};

// Define prop types
SideBar.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default SideBar;
