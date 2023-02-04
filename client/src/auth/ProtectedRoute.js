import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import SignIn from "../pages/public/SignIn";

export default function ProtectedRoute() {
  const [user, setUser] = useState({
    loading: false,
    data: "null",
  });

  useEffect(() => {
    // API call to authenticate
    let a = false;
    if (a) setUser({ loading: false, data: "" });
  }, []);

  return user.loading ? (
    <h2>Loading...</h2>
  ) : user.data ? (
    <Outlet />
  ) : (
    <SignIn />
  );
}
