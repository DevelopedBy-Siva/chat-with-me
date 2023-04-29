import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import FullPageLoading from "../../components/Loader/FullPage";
import { LoginProvider, useLoggedIn } from "../../context/LoginContext";

export default function Private() {
  return (
    <LoginProvider>
      <Container />
    </LoginProvider>
  );
}

function Container() {
  const loggedIn = useLoggedIn();

  return loggedIn === null ? (
    <FullPageLoading />
  ) : loggedIn === true ? (
    <Suspense fallback={<FullPageLoading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
