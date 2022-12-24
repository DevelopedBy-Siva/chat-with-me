import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./auth/ProtectedRoute";
import networkStatus from "./toast/NetworkStatus";
import Chat from "./components/Home/Chat";
import Friends from "./components/Home/Friends";
import Settings from "./components/Home/Settings";

export default function App() {
  useEffect(() => {
    window.addEventListener("online", networkStatus);
    window.addEventListener("offline", networkStatus);

    return () => {
      window.removeEventListener("online", networkStatus);
      window.removeEventListener("offline", networkStatus);
    };
  });

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Chat />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/group" element={<Friends />} />
        </Route>
      </Route>
      <Route path="/sign-in" element={<SignIn />}>
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
