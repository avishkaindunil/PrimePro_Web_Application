import { useState } from "react";

const Profile = () => {
  const [profileImage, setProfileImage] = useState("");

  const handleImageChange = (event) => {
    // Handle the logic to update the profile image here
    // For example, you can set the profile image URL to the state
    const imageFile = event.target.files[0];
    const imageURL = URL.createObjectURL(imageFile);
    setProfileImage(imageURL);
  };

  return (
    <div>
      <div>
        <h1>My Profile</h1>
      </div>
      <div className="flex">
        <div className="w-1/3 p-4">
          <div className="rounded-full overflow-hidden w-40 h-40">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-gray-300 w-full h-full"></div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4"
          />
        </div>
        <div className="w-2/3 p-4">
          <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
