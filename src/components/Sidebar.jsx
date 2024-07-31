import PropTypes from "prop-types"; // Import PropTypes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCalendarAlt,
  faUsers,
  faTasks,
  faChartBar,
  faHeadset,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UserView from "./UserView";
import Logo from "../assets/Logo.png";
import { employeeSidebarTabNames, userTypes, carwashcenterSidebarTabNames } from "./Constants";
import UserService from '../service/UserService';
import { useNavigate } from "react-router-dom";

function getIcon(iconName) {
  switch (iconName) {
    case 'faTachometerAlt':
      return faTachometerAlt;
    case 'faUsers':
      return faUsers;
    case 'faCalendarAlt':
      return faCalendarAlt;
    case 'faTasks':
      return faTasks;
    case 'faChartBar':
      return faChartBar;
    case 'faHeadset':
      return faHeadset;
    default:
      return null;
  }
}

const SideBar = ({ userType }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('handlesubmit');
    UserService.logout();

    navigate('/login');
  };

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
              {/* <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-4 text-lg" />
              <span>Logout</span>
            </li> */}
          </ul>
        );

      case userTypes.CAR_WASH_CENTER_ADMIN:
        return (
          <ul className="space-y-4">
           
            {carwashcenterSidebarTabNames.map((item, index) => (
              <Link key={index} to={`/${item.url.toLowerCase()}`}>
                <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200">
                  <FontAwesomeIcon icon={getIcon(item.icon)} className="mr-4 text-lg" />
                  <span>{item.name}</span>
                </li>
              </Link>
            ))}
             {/* <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-4 text-lg" />
              <span>Logout</span>
            </li> */}
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
      <ul>
      <li className="flex items-center p-2 m-4 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-4 text-lg" />
              <span>Logout</span>
      </li>
      </ul>
    </div>
  );
};

// Define prop types
SideBar.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default SideBar;
