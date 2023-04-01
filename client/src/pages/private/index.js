import { Suspense, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { validateToken } from "../../utils/Auth";
import FullPageLoading from "../../components/Loader/FullPage";

export default function Private() {
  const [proceed, setProceed] = useState(null);

  useEffect(() => {
    async function startupValidation() {
      const isValid = await validateToken();
      setProceed(isValid);
    }
    startupValidation();
  }, []);

  return proceed === null ? (
    <FullPageLoading />
  ) : proceed === true ? (
    <Suspense fallback={<FullPageLoading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
