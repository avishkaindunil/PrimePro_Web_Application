import React from "react";
// import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="border-b border-gray-200 mb-6">
        <ul className="flex space-x-6">
          <li className="pb-2 border-b-2 border-blue-500 text-blue-900">Profile</li>
          <li className="pb-2 cursor-pointer">My details</li>
          <li className="pb-2 cursor-pointer">Password</li>
          <li className="pb-2 cursor-pointer">Email</li>
          <li className="pb-2 cursor-pointer">Notification</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-4">Profile</h3>
        <p className="text-gray-600 mb-6">Update your photo and personal details here.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700">Live in</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value="Kottawa,Colombo"  />
          </div>
          <div>
            <label className="block text-gray-700">Street Address</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value="360/2 kottawa"  />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value="automiraj@gmail.com" />
          </div>
          <div>
            <label className="block text-gray-700">Date Of Birth</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value="07.12.1980"  />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700">Gender</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value="Male"  />
          </div>
        </div>

        <div className="flex items-center mb-6">
          <img className="w-16 h-16 rounded-full mr-4" src="../assets/profilepic.png" alt="Profile" />
          <div>
            <button className="text-blue-500 mr-2">Update</button>
            {/* <button className="text-red-500">Delete</button> */}
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Social Profiles</label>
          <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm mb-4" value="facebook.com/" readOnly />
          <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value="twitter.com/" readOnly />
        </div>
      </div>
    </div>
  );
};

export default Settings;


// const Settings = () => {
//   return (

//     <div>
//         <h1> Admin settings</h1>
//     </div>
//   );
// };
// export default Settings;