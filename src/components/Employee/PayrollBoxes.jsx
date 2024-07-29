import PropTypes from "prop-types";
import {
  faCalendarAlt,
  faTasks,
  faChartBar,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getIcon(iconName) {
  switch (iconName) {
    case "faChartBar":
      return faChartBar;
    case "faTasks":
      return faTasks;
    case "faCalendarAlt":
      return faCalendarAlt;
    case "faUsers":
        return faUsers;
    default:
      return null;
  }
}

const PayrollBoxes = ({ content }) => {
  return (
    <div className="flex gap-4 p-4 justify-evenly items-center">
      {content.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center py-4 px-8 w-80 bg-white rounded-md shadow-md border border-solid border-black/50"
        >
          <FontAwesomeIcon
            icon={getIcon(item.icon)}
            style={{ backgroundColor: item.iconColor }}
            className="text-2xl p-4 text-black rounded-full z-30"
          />
          {/* <i className={`fas ${item.icon} text-4xl text-blue-500`}></i> */}
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="text-gray-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

PayrollBoxes.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PayrollBoxes;
