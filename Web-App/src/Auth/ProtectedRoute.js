import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import SignIn from "../pages/SignIn";

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

  return user.loading ? <Loading /> : user.data ? <Outlet /> : <SignIn />;
}
