import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SignIn } from "../../api/userApiCalls";
import { userTypes } from "../../components/Constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const storedUserData = localStorage.getItem("userData");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Fetch data and validate userType

    setLoading(true);

    const data = {
      email: email,
      password: password,
    };
    try {
      const { data: userData, loading } = await SignIn(data);
      console.log(userData);
      setLoading(loading);
      if (!userData) {
        // setIsModalVisible(true);
        // reset();
        Swal.fire({
          title: "Error!",
          text: "Please, Log in again!",
          icon: "error",
          confirmButtonText: "Back",
        });
      } else {
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log(userData);

        if (userData.role === userTypes.EMPLOYEE) {
          navigate("/employee/dashboard");
        } else if (userData.role === userTypes.CUSTOMER) {
          navigate("/customer/dashboard");
        } else if (userData.role === userTypes.CAR_WASH_CENTER_ADMIN) {
          navigate("/CarWashCenterAdmin/dashboard");
        } else {
          Swal.fire({
            title: "Error!",
            text: "User type does not found!",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in onSubmit:", error);
      Swal.fire({
        title: "Error!",
        text: "Please, check your email and password!",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    // localStorage.setItem("userData", JSON.stringify(userData));
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dejithzc7/image/upload/v1722373450/6852137_28532_schhgg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Dont have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
