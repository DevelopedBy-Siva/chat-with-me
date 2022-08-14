import { useState } from "react";

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

  const handleScreen = (screen = SCREEN.HOME) => {
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
          />
        );
      case VEIRFY_CODE:
        return <ForgotPasswordVerify handleScreen={handleScreen} info={info} />;
      case CNG_PSWD:
        return <ForgotPasswordChangePassword info={info} setInfo={setInfo} />;
      default:
        break;
    }
  };

  return <Modal isNavigate={true}>{handleActiveScreen()}</Modal>;
}
