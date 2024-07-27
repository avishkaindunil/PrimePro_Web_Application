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
          className="flex-1 border my-12 p-4 rounded-lg shadow-md"
        >
          <div className="text-2xl text-center py-4">{item.title}</div>
          <div className="flex justify-evenly py-2 text-2xl items-center">
            {/* <div className="text-3xl font-medium bg-white py-2 px-4 rounded-lg">{item.value}</div> */}
            <div className="text-3xl font-medium">{item.value}</div>
            <div className="">
              <FontAwesomeIcon
                icon={getIcon(item.icon)}
                style={{ backgroundColor: item.iconColor }}
                className="text-2xl p-4 text-white rounded-full z-30"
              />
            </div>
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
