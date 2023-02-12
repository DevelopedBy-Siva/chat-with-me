import { Suspense, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { validateToken } from "../../utils/Auth";

export default function Private() {
  const [proceed, setProceed] = useState(null);

  useEffect(() => {
    const isValid = validateToken();
    setProceed(isValid);
  }, []);

  return proceed === null ? (
    <h5>Loading...</h5>
  ) : proceed === true ? (
    <Suspense>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
