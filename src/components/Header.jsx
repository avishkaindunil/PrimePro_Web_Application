// import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AppHeader = () => {
  const navigate = useNavigate();
  const handleIconClick = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      }
    });
  };
  return (
    <div className="w-full">
      {/* <header className="h-6 bg-black"></header> */}
      <div className="flex items-center justify-end mr-8 bg-white h-[55px]">
        <FontAwesomeIcon className="text-xl" icon={faBell} />
        <FontAwesomeIcon
          className="text-xl px-4"
          onClick={handleIconClick}
          icon={faSignOutAlt}
        />
      </div>
    </div>
  );
};

AppHeader.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default AppHeader;
