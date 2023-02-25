import React, { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import networkStatus from "./components/Toastify/NetworkStatus";
import Public from "./pages/public";
import Private from "./pages/private";

const SignIn = lazy(() => import("./pages/public/SignIn"));
const SignUp = lazy(() => import("./pages/public/SignUp"));
const ForgotPassword = lazy(() => import("./pages/public/FrgtPwsd"));
const Home = lazy(() => import("./pages/private/Home"));
const Chat = lazy(() => import("./components/Home/Chat"));
const Contacts = lazy(() => import("./components/Home/Contacts"));
const Group = lazy(() => import("./components/Home/Group"));
const Settings = lazy(() => import("./components/Home/Settings"));
const Logout = lazy(() => import("./components/Home/Logout"));
const MySelf = lazy(() => import("./components/Home/MySelf"));
const Modal = lazy(() => import("./components/Home/Modal"));

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
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<Private />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Chat />}>
              <Route element={<Modal />}>
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/group" element={<Group />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/myself" element={<MySelf />} />
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
