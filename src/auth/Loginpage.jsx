import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import MainLayout from "../Components/MainLayout";

function LoginPage({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
    setPassword(e.target.value);
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      console.log(userData);
      // console.log(userData.email);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("email", userData.email);
        
        const userType = userData.role;
        navigate(`/${userType}/Dashboard`, { replace: true });
    
        if (userData.role === "ADMIN") {
          if(userData.email === "isindu@gmail.com"){
            
             navigate("/CenterAdmin/Dashboard");
          }else{
            navigate("/CenterAdmin/NewDashboard");
          }
        } 
         else if (userData.role === "EMPLOYEE") {
          navigate("/Employee/Dashboard");
        } else {
          navigate("/NewUser/Dashboard");
        }
      }
      else 
       {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("failed to login");
      }, 5000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cyan-900">
        <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
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
                Dont have an account? <a href="/registration">Register</a>
            </p>
        </div>
    </div>
);
};

export default LoginPage;