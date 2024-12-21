import PropTypes from "prop-types";

const OneSchedule = ({ schedule }) => {
  return (
    <div>
      {schedule.map((schedule) => (
        <div key={schedule.id} className="flex flex-col items-center text-lg bg-white px-2 py-4 rounded-lg my-2 font-normal">
          <h3 className="text-lg text-black">
            {/* {schedule.description} - {schedule.vehicle} */}
            {schedule.description}
          </h3>
          <p style={{ color: "rgba(0, 0, 0, 0.49)" }}>
            {schedule.startTime} - {schedule.endTime}
          </p>
        </div>
      ))}
    </div>
  );
};

OneSchedule.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      vehicle: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OneSchedule;
