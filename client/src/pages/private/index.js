import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { validateToken } from "../../utils/Auth";

export default function Private() {
  const [proceed, setProceed] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const isValid = validateToken();
      setProceed(isValid);
    }, 5000);
  }, []);

  return proceed === null ? (
    <h5>Loading...</h5>
  ) : proceed === true ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
