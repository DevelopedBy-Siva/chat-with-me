import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import ButtonContainer from "./ButtonContainer";
import { FORGOT_PSWD_SCREEN as SCREEN } from "../utils/Screens";

export default function ForgotPasswordVerify({ info, handleScreen }) {
  const FORGOT_PSWD_EXPIRY_TIME = 299;
  const MAX_VERIFICATION_CODE_INPUT_BOXES = 5;

  const navigate = useRef(useNavigate());
  const inputRef = useRef([]);

  const [verificationCode, setVerificationCode] = useState("");
  const [activeInput, setActiveInput] = useState(0);
  const [expiry, setExpiry] = useState("05:00");
  const [serverResponse, setServerResponse] = useState({
    loading: false,
    error: null,
  });

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

    setServerResponse({
      loading: true,
      error: null,
    });

    const URL = process.env.REACT_APP_API_BASEURL;
    axios
      .get(URL)
      .then(() => {
        handleScreen(SCREEN.CNG_PSWD);
      })
      .catch(() => {
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
      <Title>Verify your e-mail address</Title>
      <InputTitle>
        We emailed you a five-digit code to <i>{info.email}</i>.
        <br />
        Enter the code below to confirm your email address.
      </InputTitle>
      <Form onSubmit={verifyEmail}>
        <InputContainer>
          {inputBoxes().map((val, index) => {
            const elementRef = (element) => inputRef.current.push(element);
            return (
              <InputBox
                type="text"
                maxLength="1"
                ref={elementRef}
                disabled={activeInput !== index}
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
        <ButtonContainer disabled={isVerifyBtnDisabled()} label="Verify" />
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 25px;
  margin-top: 5px;
`;

const InputTitle = styled.h1`
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  line-height: 14px;
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
  border: 1px solid #737373;
  border-radius: 5px;
  margin-left: 5px;
  font-size: 20px;
  outline-color: #05a4fa;
  background: none;
  color: #000;
  -moz-appearance: textfield;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CodeExpires = styled.span`
  display: block;
  font-size: 10px;
  margin-bottom: 25px;
  text-align: center;
`;

const Timer = styled.span`
  font-size: 14px;
  color: red;
`;

const Form = styled.form``;
