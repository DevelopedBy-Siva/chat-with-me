import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "../../../api/axios";
import ButtonContainer from "../common/ButtonContainer";
import { FORGOT_PSWD_SCREEN as SCREEN } from "../../../utils/Screens";
import toast from "../../Toast";
import retrieveError from "../../../api/ExceptionHandler";

export default function ForgotPasswordVerify({
  info,
  handleScreen,
  serverResponse,
  setServerResponse,
}) {
  const FORGOT_PSWD_EXPIRY_TIME = 299;
  const MAX_VERIFICATION_CODE_INPUT_BOXES = 5;

  const navigate = useRef(useNavigate());
  const inputRef = useRef([]);

  const [verificationCode, setVerificationCode] = useState("");
  const [activeInput, setActiveInput] = useState(0);
  const [expiry, setExpiry] = useState("05:00");

  useEffect(() => {
    const index = activeInput;
    inputRef.current[index].focus();
  }, [activeInput]);

  const handleInputChange = (e) => {
    if (!e) return;

    const ASCIICode = e.which ? e.which : e.keyCode;

    if (ASCIICode === 8 || ASCIICode === 46)
      return handleVerificationCodeDeletion();

    if (verificationCode.length > 4) return;

    const isAllowed = ASCIICode >= 48 && ASCIICode <= 57;
    if (!isAllowed) return;

    const val = e.key;
    const activeInput_index = verificationCode.length + 1;
    if (activeInput_index < 5) setActiveInput(activeInput_index);
    setVerificationCode((code) => code + val);
  };

  const handleVerificationCodeDeletion = () => {
    let code = verificationCode;
    const codeLen = code.length;
    code = code.substring(0, codeLen - 1);

    const activeInput_index = verificationCode.length - 1;
    if (activeInput_index < 0) return;
    setActiveInput(activeInput_index);
    setVerificationCode(code);
  };

  const getVerificationCodeFromIndex = (index) => {
    let val = "";
    try {
      val = verificationCode.charAt(index);
    } catch (e) {}
    return val;
  };

  useEffect(() => {
    let timeleft = 0;
    let timer;
    const generateExpiryTime = () => {
      if (timeleft >= FORGOT_PSWD_EXPIRY_TIME) {
        clearInterval(timer);
        return navigate.current(-1, { replace: true });
      }
      let val = FORGOT_PSWD_EXPIRY_TIME - timeleft;
      const minutes = Math.floor((val % 3600) / 60)
          .toString()
          .padStart(2, "0"),
        seconds = Math.floor(val % 60)
          .toString()
          .padStart(2, "0");
      setExpiry(minutes + ":" + seconds);
      timeleft += 1;
    };
    timer = setInterval(generateExpiryTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const verifyEmail = (e) => {
    e.preventDefault();
    toast.remove();

    setServerResponse({
      loading: true,
      error: null,
    });

    axios
      .post(`/verify-account?email=${info.email}`, null, {
        headers: {
          "x-verify-code": verificationCode,
        },
      })
      .then(() => {
        handleScreen(SCREEN.CNG_PSWD);
      })
      .catch((error) => {
        let { message } = retrieveError(error, true);
        try {
          if (error.response.status === 400)
            message = "Invalid verification code";
        } catch (_) {}
        toast.error(message, toast.props.user.persist);

        setServerResponse({
          loading: false,
          error: "ERROR MESSAGE",
        });
      });
  };

  const isVerifyBtnDisabled = () => {
    const disabled =
      verificationCode.length < MAX_VERIFICATION_CODE_INPUT_BOXES;

    return serverResponse.loading ? true : disabled;
  };

  const inputBoxes = () => {
    return Array.apply("", new Array(MAX_VERIFICATION_CODE_INPUT_BOXES));
  };

  return (
    <Container>
      <InputTitle>
        We emailed a five-digit code to <i>{info.email}</i>. Enter the code
        below to confirm your email address.
      </InputTitle>
      <Form onSubmit={verifyEmail}>
        <InputContainer>
          {inputBoxes().map((_, index) => {
            const elementRef = (element) => inputRef.current.push(element);
            return (
              <InputBox
                type="text"
                maxLength="1"
                ref={elementRef}
                disabled={serverResponse.loading || activeInput !== index}
                key={index}
                value={getVerificationCodeFromIndex(index)}
                onChange={() => handleInputChange(null)}
                onKeyDown={handleInputChange}
              />
            );
          })}
        </InputContainer>
        <CodeExpires>
          Verification code expires in: <Timer>{expiry}</Timer>
        </CodeExpires>
        <ButtonContainer
          loading={serverResponse.loading}
          disabled={isVerifyBtnDisabled()}
          label="Verify"
        />
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const InputTitle = styled.h3`
  text-align: left;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;
  line-height: 1.1rem;

  &::before {
    content: "\u003E ";
    font-weight: 500;
    font-size: 0.8rem;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const InputBox = styled.input`
  display: inline-block;
  height: 50px;
  width: 100%;
  max-width: 50px;
  text-align: center;
  color: ${(props) => props.theme.txt.main};
  border: 1px solid ${(props) => props.theme.border.inputbox};
  border-radius: 5px;
  margin-left: 5px;
  font-size: 1.4rem;
  font-weight: 500;
  outline-color: #05a4fa;
  background: none;
  -moz-appearance: textfield;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CodeExpires = styled.span`
  display: block;
  margin-bottom: 25px;
  text-align: center;
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.sub};
  user-select: none;
`;

const Timer = styled.span`
  color: ${(props) => props.theme.txt.sub};
  font-weight: 400;
  user-select: none;
`;

const Form = styled.form``;
