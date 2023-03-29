import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getToken } from "../../utils/Auth";

export default function Public() {
  const tokenFound = getToken();
  return !tokenFound ? (
    <Suspense fallback="loading...">
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/" replace />
  );
}
