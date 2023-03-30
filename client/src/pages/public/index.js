import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getToken } from "../../utils/Auth";
import FullPageLoading from "../../components/Loader/FullPage";

export default function Public() {
  const tokenFound = getToken();
  return !tokenFound ? (
    <Suspense fallback={<FullPageLoading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/" replace />
  );
}
