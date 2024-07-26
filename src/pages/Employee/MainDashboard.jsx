import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function MainDashboard() {
    return (
        <>
            {/* <Sidebar /> */}
            {/* <Header /> */}
            <h2 className='text-black z-50'>Employee Main Dashboard</h2>

            <div className='flex flex-wrap gap-5'>
                <div className='w-1/2'>
                    <div className='bg-white rounded-lg shadow-md p-5'>
                        <h3 className='text-gray-700 text-xl'>Employee Details</h3>
                        {/* Employee details */}
                    </div>
                </div>
            </div>
        </>
    )
}