import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false); // ✅ renamed
  const [userData, setUserData] = useState(null);

  const getUserData = async () => { // ✅ fixed typo
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        withCredentials: true, // important for cookies
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin, // ✅ match Login.jsx
    userData,
    setUserData,
    getUserData,   // ✅ match Login.jsx
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
