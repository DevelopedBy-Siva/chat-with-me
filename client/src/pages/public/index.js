import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import FullPageLoading from "../../components/Loader/FullPage";

export default function Public() {
  const tokenFound = false;
  return !tokenFound ? (
    <Suspense fallback={<FullPageLoading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/" replace />
  );
}
