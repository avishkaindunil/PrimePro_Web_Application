
  // DataAnalytics.jsx

  import Button from '../../components/CarWashCenter/Button';
  import { useNavigate } from 'react-router-dom';

  const DataAnalytics = () => {
    const navigate = useNavigate();

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 pl-44">Data Analytics</h2>
      <p className=" mb-4 pl-36">show system data properly.</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 pl-4 ml-48 rounded"
        onClick={() => navigate("/systemAdmin/dataAnalytics")}
      >
        view Analytics
      </button>
    </div>
  );
};
  
  export default DataAnalytics;