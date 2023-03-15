import { Suspense, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { validateToken } from "../../utils/Auth";
import store from "../../store";

export default function Private() {
  const [proceed, setProceed] = useState(null);

  useEffect(() => {
    const isValid = validateToken();
    setProceed(isValid);
  }, []);

  return proceed === null ? (
    <h5>Loading...</h5>
  ) : proceed === true ? (
    <Provider store={store}>
      <Suspense>
        <Outlet />
      </Suspense>
    </Provider>
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
