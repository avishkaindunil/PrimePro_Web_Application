import React, { useState } from 'react'
import ReportCharts from '../../components/CarWashCenter/ReportCharts'
import { set } from 'react-hook-form';

const CustomSupport = () => {


  const [error,setError] = useState('');
  
  const [reportType,setReportType] = useState({

    from:'',
    to:'',
    type:''
  });
 

  const onChange =(e)=>{
    const{name,value}=e.target;
    setReportType((prevReportType)=>({
      ...prevReportType,
      [name]:value
    }));
    setError('');
  };
  const handleOnclick =()=>{
    console.log(reportType);
    if(reportType.from>reportType.to){
      setError("Check the time duration again!!");
    }else{
      switch (reportType.type){
        case "All bookings":
          return 1;
        case "service types":
          return 2;
        case "Attendence of employees":
          return 3;
        default:
          return null;
      }
    }
    
    // const newWindow = window.open('http://localhost/report','_blank');
    // newWindow.onload =()=>{
    //   ReactDOM.render(<ReportCharts/>,newWindow.document.getElementsByTagName('body'));
    // }
    
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Generate Reports</h1>
      {/* <ReportCharts/> */}
      <div className="flex flex-wrap m-6">
        <input className="p-2 ml-5 rounded-md w-[20%] mb-5 bg-slate-200" type='date' name="from" id='from' onChange={onChange} value={reportType.from}/>
        <input className="p-2 ml-5 rounded-md w-[20%] mb-5 bg-slate-200" type='date' name='to' id='to' onChange={onChange} value={reportType.to}/>
        <select className="p-2 ml-5 rounded-md w-[20%] mb-5  bg-slate-200" type='select' name='type' onChange={onChange} value={reportType.type}>
          <option value='All bookings'>All bookings</option>
          <option value='service types'>service types</option>
          <option value='Attendence of employees'>Attendence of employees</option>
        </select>
        <button className="p-2 ml-5 rounded-md w-[20%] mb-5 bg-[#203aac] text-white" onClick={handleOnclick}>Generate</button>
        <p className="italic text-center text-red-700">{error}</p>
      </div>
    </div>
  )
}

export default CustomSupport
