import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

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
const Profile = lazy(() => import("./components/Home/Profile"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Private />}>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Chat />}>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/groups" element={<Group />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
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
  );
}
