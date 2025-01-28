import { useState, useEffect } from 'react';
import WorkProgress from '../../components/CarWashCenter/WorkProgress';
import { publicAuthRequest } from '../../constants/requestMethods';

const WorkloadProgress = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchBookingDetails = async () => {
    try {
      const response = await publicAuthRequest.get(`/centerAdmin/get-workload-progress`);
      if (response.data) {
        setItems(response.data);
        setFilteredItems(response.data);
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const onSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilteredItems(
      items.filter((item) => item[4].toLowerCase().includes(searchValue))
    );
    setCurrentPage(1);
  };

  const getStatus = (status) => {
    setFilteredItems(
      items.filter((item) => item.status.toLowerCase() === status.toLowerCase())
    );
    setCurrentPage(1);
  };

  const totalPages = filteredItems?.length
    ? Math.ceil(filteredItems.length / itemsPerPage)
    : 1;

  const paginatedItems =
    filteredItems?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let completedBookings = items.filter((item) => item[11] == 'COMPLETED');
  let acceptedBookings = items.filter((item) => item[11] == 'ACCEPTED');
  let OngoingBookings = items.filter((item) => item[11] == 'PENDING');

  return (
    <div>
      <div className="p-6 mt-1 ml-3 mr-3 bg-white rounded-2xl">
        <h1 className="p-1 mb-3 ml-5 text-2xl font-bold">Workload Progress</h1>
        <div className="flex">
          <div className="w-[65%] pt-6">
            <input
              className="p-2 ml-5 mb-1 rounded-md w-[100%] bg-slate-200"
              type="text"
              placeholder="Search for a booking..."
              onChange={onSearch}
            />
            <div className="grid grid-cols-3 gap-4 pt-8">
              {paginatedItems.map((item, index) => (
                <WorkProgress key={index} item={item} />
              ))}
            </div>
            <div>
              {filteredItems.length > 0 ? (
                <div className="text-center">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-2 mb-2 bg-[#203aac] rounded-md text-[white]"
                  >
                    &lt;
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-2 m-2 bg-[#203aac] rounded-md text-[white]"
                  >
                    &gt;
                  </button>
                </div>
              ) : (
                <div className="pl-32 text-xl italic opacity-50">
                  No booking available
                </div>
              )}
            </div>
          </div>
          <div className="w-[35%] ml-10 text-center">
            <h1 className="text-2xl font-bold">Today's Summary</h1>
            <div className="space-y-4">
              <div className="flex items-center justify-center py-5 m-3 space-x-8 text-white bg-indigo-600 rounded-lg px-9">
                <h1 className="text-lg">Total Bookings: {items.length}</h1>
              </div>
              <div
                className="flex items-center justify-center py-5 m-3 space-x-8 text-white bg-indigo-600 rounded-lg cursor-pointer px-9"
                onClick={() => getStatus('DONE')}
              >
                <div className="w-6 h-6 bg-green-300 rounded-full"></div>
                <h1 className="text-lg">
                  Completed Bookings: {completedBookings.length}
                </h1>
              </div>
              <div
                className="flex items-center justify-center py-5 m-3 space-x-8 text-white bg-indigo-600 rounded-lg cursor-pointer px-9"
                onClick={() => getStatus('PENDING')}
              >
                <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
                <h1 className="text-lg">
                  Ongoing Bookings: {OngoingBookings.length}
                </h1>
              </div>
              <div
                className="flex items-center justify-center py-5 m-3 space-x-8 text-white bg-indigo-600 rounded-lg cursor-pointer px-9"
                onClick={() => getStatus('ACCEPTED')}
              >
                <div className="w-6 h-6 bg-red-300 rounded-full"></div>
                <h1 className="text-lg">
                  Accepted Bookings: {acceptedBookings.length}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkloadProgress;
