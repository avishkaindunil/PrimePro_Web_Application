import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker";
import ProfileImage from "../../components/Employee/ProfileImage";
import ProfileInformation from "../../components/Employee/ProfileInformation";
import { useState } from 'react';

const Profile = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [userData, setUserData] = useState({
    name: storedUserData.name,
    dateOfBirth: storedUserData.dateOfBirth,
    phoneNumber: storedUserData.phoneNumber,
    profilePictureUrl: storedUserData.profilePictureUrl
  });
  const [profilePictureUrl, setProfilePictureUrl] = useState(storedUserData.profilePictureUrl);

  const handleProfileUpdate = (updatedData) => {
    setUserData({
      name: updatedData.name,
      dateOfBirth: updatedData.dateOfBirth,
      phoneNumber: updatedData.phoneNumber,
      profilePictureUrl: userData.profilePictureUrl
    });

    const updatedUserData = {
      ...storedUserData,
      name: updatedData.fullName,
      dateOfBirth: updatedData.dob,
      phoneNumber: updatedData.phoneNumber,
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));
  };

  const handleProfilePictureUpdate = (profilePictureUrlData) => {
    setProfilePictureUrl(profilePictureUrlData);

    setUserData({
      name: userData.name,
      dateOfBirth: userData.dateOfBirth,
      phoneNumber: userData.phoneNumber,
      profilePictureUrl: profilePictureUrlData
    });

    const updatedUserData = {
      ...storedUserData,
      profilePictureUrl: profilePictureUrlData,
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));
  }

  return (
    <div>
      <DateAndTimeTracker />
      <div className="bg-white rounded-lg p-8 my-12">
        <div className="text-2xl text-black font-bold">
          <h1>Edit Profile</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="basis-1/2">
            <ProfileImage storedUserData={storedUserData} onUpdate={handleProfilePictureUpdate} />
          </div>
          <div className="basis-1/2">
            <ProfileInformation storedUserData={storedUserData} onUpdate={handleProfileUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
