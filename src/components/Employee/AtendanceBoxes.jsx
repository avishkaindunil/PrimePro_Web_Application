const AtendanceBoxes = () => {
    const boxClass = "flex flex-col py-8 px-16 rounded-md bg-[#061651] text-white items-center justify-center w-64";
  
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex gap-4">
          <div className={boxClass}>
            <div>{21}</div>
            <div>Working Days</div>
          </div>
          <div className={boxClass}>
            <p>{10} Hours</p>
            <p>Overtime</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className={boxClass}>
            <p>{5} Leaves</p>
            <p>Allocated</p>
          </div>
          <div className={boxClass}>
            <p>{2} Leaves</p>
            <p>Taken</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AtendanceBoxes;