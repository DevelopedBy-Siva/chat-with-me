import { useState } from "react";

import ForgotPasswordChangePassword from "../../../components/Public/FrgtPswd/ForgotPasswordChangePassword";
import ForgotPasswordHome from "../../../components/Public/FrgtPswd/ForgotPasswordHome";
import ForgotPasswordVerify from "../../../components/Public/FrgtPswd/ForgotPasswordVerify";
import PageWrapper from "../../../components/Public/common/PageWrapper";
import { FORGOT_PSWD_SCREEN as SCREEN } from "../../../utils/Screens";

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

  const getPageTitle = (screen) => {
    let title;
    switch (screen) {
      case SCREEN.CNG_PSWD:
        title = "New Password";
        break;
      case SCREEN.VEIRFY_CODE:
        title = "Verify Email";
        break;
      default:
        title = "Forget Password";
    }
    return title;
  };

  return (
    <PageWrapper title={getPageTitle(activeScreen)}>
      {handleActiveScreen()}
    </PageWrapper>
  );
}
