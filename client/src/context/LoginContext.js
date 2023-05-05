import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../store/actions/UserActions";
import { isLoggedIn, removeIsLoggedIn } from "../utils/UserLocal";
import axios from "../api/axios";

const LoginContext = React.createContext();

export function useLoggedIn() {
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function startupValidation() {
      let isValid = isLoggedIn();
      if (isValid) {
        isValid = await axios
          .get("/user/")
          .then(({ data }) => {
            dispatch(setUser(data));
            return true;
          })
          .catch(() => {
            removeIsLoggedIn();
            return false;
          });
      }
      setLoggedIn(isValid);
    }
    startupValidation();
  }, [dispatch]);
  return (
    <LoginContext.Provider value={loggedIn}>{children}</LoginContext.Provider>
  );
}
