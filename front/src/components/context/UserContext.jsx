import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getAllUsersData,
  getAllUserFilms,
  loginUser,
  getUserById,
} from "../../api/library/UsersApi";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (localStorage.user !== undefined) {
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  function refreshUserData(id) {
    getUserById(id).then((res) => {
      setUserData(res.data.data.users);
      localStorage.setItem("user", JSON.stringify(res.data.data.users));
    });
  }

  async function doLogin(data) {
    // console.log(data);
    let result = await loginUser(data).then((res) => {
      // console.log(res.data);
      setUserData(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      // console.log(res.status);
      return res;
    });
    return result;
  }

  function signOut() {
    setUserData({});
    localStorage.clear();
  }

  return (
    <UserContext.Provider
      value={{
        setUserData,
        userData,
        doLogin,
        refreshUserData,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };
