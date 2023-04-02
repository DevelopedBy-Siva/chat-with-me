import { Suspense, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import FullPageLoading from "../../components/Loader/FullPage";
import axios from "../../api/axios";
import { setUser } from "../../store/actions/UserActions";

export default function Private() {
  const [proceed, setProceed] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function startupValidation() {
      const isValid = await axios
        .get("/user/")
        .then(({ data }) => {
          dispatch(setUser(data));
          return true;
        })
        .catch(() => false);
      setProceed(isValid);
    }
    startupValidation();
  }, [dispatch]);

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
