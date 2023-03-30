import { Suspense, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { validateToken } from "../../utils/Auth";
import store from "../../store";
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
    <Provider store={store}>
      <Suspense fallback={<FullPageLoading />}>
        <Outlet />
      </Suspense>
    </Provider>
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
