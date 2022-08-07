import { Navigate, Route, Routes } from "react-router-dom";
import Wrapper from "./Components/Wrapper";
import NotFound from "./Components/NotFound";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ModalContainer from "./Components/ModalContainer";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Wrapper />} />
        <Route path="/account" element={<Wrapper />} />
        <Route path="/settings" element={<Wrapper />} />
        <Route path="/:receiver" element={<Wrapper />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />}>
        <Route path="forgot-password" element={<ModalContainer />} />
      </Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

export default App;
