import React, { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import networkStatus from "./components/Toastify/NetworkStatus";
import Public from "./pages/public";
import Private from "./pages/private";
import { AnimatePresence } from "framer-motion";

const SignIn = lazy(() => import("./pages/public/SignIn"));
const SignUp = lazy(() => import("./pages/public/SignUp"));
const ForgotPassword = lazy(() => import("./pages/public/FrgtPwsd"));
const Home = lazy(() => import("./pages/private/Home"));
const Chat = lazy(() => import("./components/Home/Chat"));
const Friends = lazy(() => import("./components/Home/Friends"));
const Group = lazy(() => import("./components/Home/Group"));
const Settings = lazy(() => import("./components/Home/Settings"));
const Logout = lazy(() => import("./components/Home/Logout"));
const QrCode = lazy(() => import("./components/Home/QrCode"));
const Modal = lazy(() => import("./components/Home/Modal"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("online", networkStatus);
    window.addEventListener("offline", networkStatus);

    return () => {
      window.removeEventListener("online", networkStatus);
      window.removeEventListener("offline", networkStatus);
    };
  });

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Private />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Chat />}>
              <Route element={<Modal />}>
                <Route path="/friends" element={<Friends />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/group" element={<Group />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/qrcode" element={<QrCode />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route element={<Public />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}
