import Profilepic from "../assets/profilepic.png";
import { useUserContext } from "../UserProvider";
import { userTypes } from "./Constants";

const UserView = () => {
  const { userData } = useUserContext(); // Access the user data from context

  return (
    <div className="bg-[#F9F9F9] rounded-[10px] m-7 ml-[40px] mr-[40px] shadow-lg p-4 text-center">
      <div className="box-border flex justify-center rounded-full">
        <img
          src={userData?.profilePictureUrl || Profilepic}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover"
        />
      </div>
      <div className="flex justify-center font-semibold py-2 text-xl">
        {userData?.name}
      </div>
      <div className="flex flex-col justify-center text-sm">
        {userData?.role === userTypes.EMPLOYEE ? (
          <>
            <div>Colombo 07</div>
            <div>{userData?.designation}</div>
          </>
        ) : (
          <>
            <div>Colombo 07</div>
            <div>Branch Manager</div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserView;
