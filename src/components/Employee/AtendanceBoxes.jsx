const AtendanceBoxes = ({attendance}) => {

  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const boxClass =
    "flex flex-col py-8 px-16 rounded-md bg-[#061651] text-white items-center justify-center w-64";

  const takenLeaves = (12 + 8 + 6) - (storedUserData.noOfAnnualLeaves + storedUserData.noOfCasualLeaves + storedUserData.noOfMedicalLeaves);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex gap-4">
        <div className={boxClass}>
          <div>{storedUserData.noOfAnnualLeaves}</div>
          <div>Annual Leaves</div>
        </div>
        <div className={boxClass}>
          <p>{attendance.totalOvertimeHours} Hours</p>
          <p>Overtime</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className={boxClass}>
          <p>{storedUserData.noOfCasualLeaves} Leaves</p>
          <p>Casual Leaves</p>
        </div>
        <div className={boxClass}>
          <p>{takenLeaves} Leaves</p>
          <p>Taken</p>
        </div>
      </div>
    </div>
  );
};

export default AtendanceBoxes;
