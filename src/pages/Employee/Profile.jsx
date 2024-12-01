import DateAndTimeTracker from "../../components/Employee/DateAndTimeTracker";
import ProfileImage from "../../components/Employee/ProfileImage";
import ProfileInformation from "../../components/Employee/ProfileInformation";

const Profile = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  
  return (
    <div>
      <DateAndTimeTracker />
      <div className="bg-white rounded-lg p-8 my-12">
        <div className="text-2xl text-black font-bold">
          <h1>Edit Profile</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="basis-1/2">
            <ProfileImage />
          </div>
          <div className="basis-1/2">
            <ProfileInformation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
