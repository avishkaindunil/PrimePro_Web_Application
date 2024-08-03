import React from "react";

function Card({ title, value, icon }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 ">
            <div className="flex items-center justify-between">
                <div className="flex items-center">

                
                {icon}
                <h3 className="text-lg font-medium">{title}</h3>

                </div>
                <h2 className="text-2xl font-bold">{value}</h2>


            </div>

        </div>


    );
}
export default Card;