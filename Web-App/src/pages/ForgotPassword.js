import { useEffect, useState } from "react";

import ForgotPasswordChangePassword from "../components/ForgotPasswordChangePassword";
import ForgotPasswordHome from "../components/ForgotPasswordHome";
import ForgotPasswordVerify from "../components/ForgotPasswordVerify";
import Modal from "../components/ModalContainer";
import { FORGOT_PSWD_SCREEN as SCREEN } from "../utils/Screens";

export default function ForgotPassword() {
  const [activeScreen, setActiveScreen] = useState(SCREEN.HOME);
  const [info, setInfo] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [serverResponse, setServerResponse] = useState({
    loading: false,
    error: null,
  });

  const handleScreen = (screen = SCREEN.HOME) => {
    setServerResponse({
      loading: false,
      error: null,
    });
    setActiveScreen(screen);
  };

  const handleActiveScreen = () => {
    const { HOME, VEIRFY_CODE, CNG_PSWD } = SCREEN;
    switch (activeScreen) {
      case HOME:
        return (
          <ForgotPasswordHome
            handleScreen={handleScreen}
            info={info}
            setInfo={setInfo}
            serverResponse={serverResponse}
            setServerResponse={setServerResponse}
          />
        );
      case VEIRFY_CODE:
        return (
          <ForgotPasswordVerify
            handleScreen={handleScreen}
            info={info}
            serverResponse={serverResponse}
            setServerResponse={setServerResponse}
          />
        );
      case CNG_PSWD:
        return (
          <ForgotPasswordChangePassword
            info={info}
            setInfo={setInfo}
            serverResponse={serverResponse}
            setServerResponse={setServerResponse}
          />
        );
      default:
        break;
    }
  };

  return <Modal loading={serverResponse.loading}>{handleActiveScreen()}</Modal>;
}
