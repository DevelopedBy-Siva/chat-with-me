import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import FullPageLoading from "../../components/Loader/FullPage";
import { isLoggedIn } from "../../utils/UserLocal";

export default function Public() {
  const isLogged = isLoggedIn();
  return !isLogged ? (
    <Suspense fallback={<FullPageLoading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/" replace />
  );
}
