const dummyData = [
    {
        date: '2024-07-16',
        checkInTime: '09:00 AM',
        checkOutTime: '06:00 PM',
        overtime: '2 hours',
        workhours: '8 hours',
        approval: 'Approved'
    },
    {
        date: '2024-07-17',
        checkInTime: '09:30 AM',
        checkOutTime: '06:30 PM',
        overtime: '1 hour',
        workhours: '8 hours',
        approval: 'Approved'
    },
    // Add more dummy data here if needed
];

const AttendanceSummary = () => {
    return (
        <div className="container mx-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Check in Time</th>
                        <th className="py-2 px-4 border-b">Check out Time</th>
                        <th className="py-2 px-4 border-b">Overtime</th>
                        <th className="py-2 px-4 border-b">Workhours</th>
                        <th className="py-2 px-4 border-b">Approval</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {dummyData.map((data, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{data.date}</td>
                            <td className="py-2 px-4 border-b">{data.checkInTime}</td>
                            <td className="py-2 px-4 border-b">{data.checkOutTime}</td>
                            <td className="py-2 px-4 border-b">{data.overtime}</td>
                            <td className="py-2 px-4 border-b">{data.workhours}</td>
                            <td className="py-2 px-4 border-b">{data.approval}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AttendanceSummary;