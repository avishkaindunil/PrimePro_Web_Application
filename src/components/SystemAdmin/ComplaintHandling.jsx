// ComplaintHandling.jsx
import { useNavigate } from 'react-router-dom';


const ComplaintHandling = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white shadow-md rounded-md ">
      <h2 className="text-xl font-bold mb-4 pl-44">System Inqueries</h2>
      <p className=" mb-4 pl-36">Manage and resolve user inquery efficiently.</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 pl-4 ml-48 rounded"
        onClick={() => navigate("/systemAdmin/complaints")}
      >
        View Inqueries
      </button>
    </div>
  );
};

export default ComplaintHandling;

 
  
  