import { Navigate, Route, Routes } from "react-router-dom";
import Wrapper from "./pages/UserHome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Wrapper />} />
        <Route path="/account" element={<Wrapper />} />
        <Route path="/settings" element={<Wrapper />} />
        <Route path="/:receiver" element={<Wrapper />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />}>
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}
