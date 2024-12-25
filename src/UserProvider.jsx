// UserContext.js
import { createContext, useState, useContext } from 'react';

// Create a context for user data
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

// UserProvider component to wrap the app and provide the context
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  // Function to update the user data
  const updateUser = (updatedUserData) => {
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
