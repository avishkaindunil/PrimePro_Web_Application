// ComplaintHandling.jsx
import { useNavigate } from 'react-router-dom';

const ComplaintHandling = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white shadow-md rounded-md h-20">
      <div className="flex justify-between items-center mb-4">
        {/* System Inquiries Heading */}
        <h2 className="text-xl font-bold">System Inquiries</h2>

        {/* View Inquiries Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/systemAdmin/complaints")}
        >
          View Inquiries
        </button>
      </div>
    </div>
  );
};

export default ComplaintHandling;

 
  
  