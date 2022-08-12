import axios from "axios";
import { useState } from "react";
import ForgotPasswordChangePassword from "../components/ForgotPasswordChangePassword";
import ForgotPasswordHome from "../components/ForgotPasswordHome";
import ForgotPasswordVerify from "../components/ForgotPasswordVerify";
import Modal from "../components/ModalContainer";
import { FORGOT_PSWD_SCREEN as SCREEN } from "../utils/Screens";

export default function ForgotPassword() {
  const [serverResponse, setServerResponse] = useState({
    loading: false,
    error: null,
  });
  const [activeScreen, setActiveScreen] = useState(SCREEN.HOME);
  const [info, setInfo] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [btnActive, setBtnActive] = useState(true);

  const handleVerification = (e, screen = SCREEN.HOME) => {
    e.preventDefault();

    setServerResponse({
      loading: true,
      error: null,
    });

    const URL = process.env.REACT_APP_API_BASEURL;
    axios
      .get(URL)
      .then(() => {
        setActiveScreen(screen);
        setServerResponse({
          loading: false,
          error: null,
        });
      })
      .catch(() => {
        setServerResponse({
          loading: false,
          error: "ERROR MESSAGE",
        });
      });
  };

  const handleActiveScreen = () => {
    const { HOME, VEIRFY_CODE, CNG_PSWD } = SCREEN;

    switch (activeScreen) {
      case HOME:
        return (
          <ForgotPasswordHome
            verify={handleVerification}
            serverResponse={serverResponse}
            info={info}
            setInfo={setInfo}
            btnActive={btnActive}
            setBtnActive={setBtnActive}
          />
        );
      case VEIRFY_CODE:
        return (
          <ForgotPasswordVerify
            verify={handleVerification}
            serverResponse={serverResponse}
            info={info}
            setInfo={setInfo}
            btnActive={btnActive}
            setBtnActive={setBtnActive}
          />
        );
      case CNG_PSWD:
        return (
          <ForgotPasswordChangePassword
            verify={handleVerification}
            serverResponse={serverResponse}
            info={info}
            setInfo={setInfo}
            btnActive={btnActive}
            setBtnActive={setBtnActive}
          />
        );
      default:
        break;
    }
  };

  return <Modal isNavigate={true}>{handleActiveScreen()}</Modal>;
}
