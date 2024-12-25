import { useState } from "react";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const ProfileImage = ({ storedUserData, onUpdate }) => {
  // const storedUserData = JSON.parse(localStorage.getItem("userData"));
  
  const [profileImage, setProfileImage] = useState(storedUserData.profilePictureUrl);
  const [file, setFile] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const imageURL = URL.createObjectURL(imageFile);
    setProfileImage(imageURL);
    setFile(imageFile);

    // Firebase storage setup
    const fileName = `${new Date().getTime()}_${imageFile.name}`;
    const storage = getStorage(app); // Ensure 'app' is your Firebase app instance
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    // Start the file upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Image upload failed:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Image upload failed!",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          // Show confirmation dialog
          Swal.fire({
            title: "Confirm Upload",
            text: "Do you want to save this image as your profile picture?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#378cbb",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, save it!",
          }).then((result) => {
            if (result.isConfirmed) {
              // Pass the URL to onUpdate if confirmed
              onUpdate(downloadURL);
              Swal.fire({
                icon: "success",
                title: "Image Saved",
                text: "Your profile picture has been updated!",
              });
            } else {
              // Reset to previous image if cancelled
              setProfileImage(storedUserData.profilePictureUrl);
            }
          });
        });
      }
    );
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
              app
              <FontAwesomeIcon icon={faCamera} className="text-gray-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
