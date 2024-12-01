import { useState } from "react";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileImage = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  
  const [profileImage, setProfileImage] = useState(storedUserData.profilePictureUrl);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const imageURL = URL.createObjectURL(imageFile);
    setProfileImage(imageURL);
  };

  const triggerFileInput = () => {
    document.getElementById('profileImageInput').click();
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="relative w-1/3 p-4">
          <div
            className="rounded-full overflow-hidden w-60 h-60 cursor-pointer"
            onClick={triggerFileInput}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-gray-300 w-full h-full flex justify-center items-center">
                <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-6xl" />
              </div>
            )}
          </div>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {!profileImage && (
            <div
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer"
              onClick={triggerFileInput}
            >
              <FontAwesomeIcon icon={faCamera} className="text-gray-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
