// import { identity } from "lodash";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useGlobalUserContext, UserContext } from "./context/UserContext";

export default function ProtectedRoutes() {
  let { userData } = useGlobalUserContext(UserContext);
  let [loaded, setLoaded] = useState(false);

  setTimeout(() => {
    setLoaded(true);
  }, 50);

  useEffect(() => {}, [loaded]);

  if (loaded) {
    if (userData.hasOwnProperty("email")) {
      console.log(1);
      return userData.role ? <Outlet /> : <Navigate to="/" />;
    } else {
      console.log(2);
      return <Navigate to="/" />;
    }
  }
}
