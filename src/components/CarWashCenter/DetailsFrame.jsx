// src/components/DetailsFrame.jsx
import React from 'react';

const DetailsFrame = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4 w-[415px] h-[403px] mt-20">
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Details</h2>
            </div>
            <div>
                <label className="block text-gray-700 font-medium">Assignee</label>
                <input
                    type="text"
                    className="w-full border rounded-lg p-2 mt-1"
                    placeholder="Assignee 1"
                />
                <input
                    type="text"
                    className="w-full border rounded-lg p-2 mt-2"
                    placeholder="Assignee 2"
                />
                <button className="w-60 border rounded-full p-2 mt-2 bg-blue-900 text-white  hover:bg-indigo-800">
                     Add more
                </button>
            </div>
            <div>
                <label className="block text-gray-700 font-medium">Comments</label>
                <textarea
                    className="w-full border rounded-lg p-2 mt-1"
                    placeholder="Add a comment ..."
                ></textarea>
            </div>
        </div>
    );
};

export default DetailsFrame;
