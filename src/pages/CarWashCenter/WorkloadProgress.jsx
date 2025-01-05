import React, { useState, useEffect } from 'react'
import WorkProgress from '../../components/CarWashCenter/WorkProgress';
import axios from 'axios';

const WorkloadProgress = () => {
  const [bookings, setBookings] = useState([]);
  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/centerAdmin/get-today-all-bookings`);
      console.log(response.data);
      if (response.data) {
        setBookings(response.data);
      }
    } catch (error) {
      console.log("Error fetching data: ", error)
    }
  }

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const items = [
    { name: "car", status: "pending", employees: ["employee1", "employee2"], starttime: 8, endtime: 10 },
    { name: "van", status: "accepted", employees: ["employee1", "employee2"], starttime: 8, endtime: 10 },
    { name: "bus", status: "done", employees: ["employee1", "employee2"], starttime: 8, endtime: 10 },
    { name: "truck", status: "done", employees: ["employee1", "employee2"], starttime: 8, endtime: 10 },
    { name: "item1", status: "pending", employees: ["employee1"], starttime: 8, endtime: 10 },
    { name: "truck", status: "done", employees: ["employee1", "employee2"], starttime: 8, endtime: 10 },
    { name: "truck", status: "done", employees: ["employee1", "employee2"], starttime: 8, endtime: 10 },
    { name: "truck", status: "done", employees: ["employee1", "employee2"], starttime: 8, endtime: 10 },
    { name: "truck", status: "done", employees: ["employee1", "employee2"], starttime: 8, endtime: 10 },
    { name: "truck", status: "done", employees: ["employee1", "employee2"], starttime: 8, endtime: 10 }
  ];
  const [Items, setItems] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [status, setStatus] = useState('');


  const onSerach = (e) => {
    // console.log(e.target.value);
    setItems(items.filter(item => item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())));
    // e.preventDefault();

  }

  const paginatedItems = Items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatus = (status) => {
    setStatus(status);
    setItems(items.filter(item => item.status.toLocaleLowerCase() == status.toLocaleLowerCase()));
  }

  const totalPages = Math.ceil(Items.length / itemsPerPage);

  return (
    <div>
      <div className="p-6 mt-1 ml-3 mr-3 bg-white rounded-2xl">
        <h1 className="text-2xl font-bold p-1 ml-5 mb-3">Workload Progress</h1>
        <div className="flex">
          <div className="w-[65%]">
            <input className="p-2 ml-5 mb-1 rounded-md w-[100%] bg-slate-200" type='text' placeholder='search for a booking...' onChange={onSerach} />
            <div className="grid grid-cols-3 gap-4">
              {paginatedItems.map((item, index) => (
                <WorkProgress key={index} item={item} />
              ))}
            </div>
            <div>
              {Items.length > 0 ? (
                <div className="text-center">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-2 mb-2 bg-[#203aac] rounded-md text-[white]"
                  >
                    &lt;
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-2 m-2 bg-[#203aac] rounded-md text-[white]"
                  >
                    &gt;
                  </button>
                </div>
              ) : (
                <div className="pl-32 text-xl italic opacity-50">No booking available</div>  // Add an alternative UI here if necessary
              )}

            </div>
          </div>
          <div className='w-[35%] ml-10  align-middle justify-center items-center text-center'>
            <h1 className="text-2xl font-bold">Today's Summery</h1>
            <div className="space-y-4">
              <div className="flex items-center justify-center py-5 m-3 space-x-8 align-middle rounded-lg bg-indigo-600 text-white px-9" >
                <h1 className="text-lg">Total Bookings : 10</h1>
              </div>
              <div className="flex items-center justify-center py-5 m-3 space-x-8 align-middle rounded-lg cursor-pointer bg-indigo-600 text-white px-9" onClick={() => getStatus('done')}>
                <div className="w-6 h-6 bg-green-700 rounded-full"></div>
                <h1 className="text-lg">Completed Bookings : 10</h1>
              </div>
              <div className="flex items-center justify-center py-5 m-3 space-x-8 align-middle rounded-lg cursor-pointer bg-indigo-600 text-white px-9" onClick={() => getStatus('pending')}>
                <div className="w-6 h-6 bg-yellow-700 rounded-full"></div>
                <h1 className="text-lg">Ongoing bookings : 5</h1>
              </div>
              <div className="flex items-center justify-center py-5 m-3 space-x-8 align-middle rounded-lg cursor-pointer bg-indigo-600 text-white px-9" onClick={() => getStatus('accepted')}>
                <div className="w-6 h-6 bg-red-700 rounded-full"></div>
                <h1 className="text-lg">Accepted bookings : 6</h1>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default WorkloadProgress
