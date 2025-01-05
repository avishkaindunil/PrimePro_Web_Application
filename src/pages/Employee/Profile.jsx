import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker";
import ProfileImage from "../../components/Employee/ProfileImage";
import ProfileInformation from "../../components/Employee/ProfileInformation";
import { useState } from 'react';
import { UpdateEmployee } from './../../api/employeeApiCalls';
import Swal from "sweetalert2";

const Profile = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: storedUserData.name,
    dateOfBirth: storedUserData.dateOfBirth,
    phoneNumber: storedUserData.phoneNumber,
    profilePictureUrl: storedUserData.profilePictureUrl
  });
  const [profilePictureUrl, setProfilePictureUrl] = useState(storedUserData.profilePictureUrl);

  const handleProfileUpdate = async (updatedData) => {
    const data = {
      name: updatedData.name,
      dateOfBirth: updatedData.dateOfBirth,
      phoneNumber: updatedData.phoneNumber,
      profilePictureUrl: storedUserData.profilePictureUrl
    }

    console.log("User Data: ", data);

    const updatedUserData = {
      ...storedUserData,
      name: updatedData.name,
      dateOfBirth: updatedData.dateOfBirth,
      phoneNumber: updatedData.phoneNumber,
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    await updateEmployee(data);
  };

  const handleProfilePictureUpdate = async (profilePictureUrlData) => {
    setProfilePictureUrl(profilePictureUrlData);

    const data = {
      name: storedUserData.name,
      dateOfBirth: storedUserData.dateOfBirth,
      phoneNumber: storedUserData.phoneNumber,
      profilePictureUrl: profilePictureUrlData
    }

    console.log("Profile Picture Url: ", profilePictureUrl);
    console.log("User Data: ", data);

    const updatedUserData = {
      ...storedUserData,
      profilePictureUrl: profilePictureUrlData,
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    await updateEmployee(data);
  }

  const updateEmployee = async (updatedUserData) => {
    try {
      setLoading(true);
      const { data: taskData } = await UpdateEmployee(storedUserData.employeeId, storedUserData.token, updatedUserData);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Employee Update Success."
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        window.location.reload();
      });
      
    } catch (error) {
      console.error("Error fetching task count:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating employee.",
      });
    }
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
