import { useEffect, useState } from "react";

const DateAndTimeTracker = () => {
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const time = now.toLocaleTimeString();
            const date = now.toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                daySuffix: "numeric",
            });
            setCurrentTime(time);
            setCurrentDate(date);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex">
            <div className="flex justify-around w-full bg-white rounded-lg shadow-md font-medium">
                <div className="flex justify-center items-center p-5">
                    <h3 className="text-[#5F6165] text-xl">Current Date : </h3>
                    <h3 className="text-black text-xl px-2">{currentDate}</h3>
                </div>
                <div className="flex justify-center items-center p-5">
                    <h3 className="text-[#5F6165] text-xl">Current Time : </h3>
                    <h3 className="text-black text-xl px-2">{currentTime}</h3>
                </div>
            </div>
        </div>
    );
};

export default DateAndTimeTracker;
