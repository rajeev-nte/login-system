import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
axios.defaults.withCredentials = true

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false); // ✅ renamed
  const [userData, setUserData] = useState(null); //usestate(false)

  const getAuthState = async ()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
      if(data.success){
        setIsLoggedin(true)
        getUserData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
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
  useEffect(() =>{
    getAuthState();
  },[])

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin, 
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
