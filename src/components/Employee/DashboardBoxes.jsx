import PropTypes from "prop-types";
import {
  faCalendarAlt,
  faTasks,
  faChartBar,
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
    default:
      return null;
  }
}
const DashboardBoxes = ({ content }) => {
  return (
    <div className="flex gap-16 items-center justify-center cursor-pointer px-8">
      {content.map((item, index) => (
        <div
          key={index}
          style={{ backgroundColor: item.color, borderColor: item.color }}
          className="flex flex-1 justify-evenly my-12 px-4 py-8 rounded-lg shadow-md text-2xl items-center"
        >
          <div className="flex flex-col gap-2 items-start">
            <div className="text-xl lg:text-2xl text-center">{item.title}</div>
            <div className="text-2xl lg:text-3xl font-medium">{item.value}</div>
          </div>

          <div>
            <FontAwesomeIcon
              icon={getIcon(item.icon)}
              style={{ backgroundColor: item.iconColor }}
              className="text-2xl p-4 text-white rounded-full z-30"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Define the prop types
DashboardBoxes.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired, // Assuming icon is a React node
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
};

export default DashboardBoxes;
