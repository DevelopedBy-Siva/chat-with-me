import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonContainer from "./ButtonContainer";

export default function ForgotPasswordVerify({ info }) {
  const navigate = useNavigate();
  const FORGOT_PSWD_EXPIRY_TIME = 299;

  const inputRef = useRef([]);

  const [verifyCode, setVerifyCode] = useState(["", "", "", "", ""]);
  const [activeInput, setActiveInput] = useState(0);
  const [expiry, setExpiry] = useState("05:00");

  const handleInputChange = (e, index) => {
    const { key } = e;
    const code = [...verifyCode];
    if (key === "Backspace" || key === "Delete") {
      code[index] = "";
      if (activeInput === 0) return;
      index--;
      setActiveInput(index);
    }
    if (key >= 0 && key <= 9) {
      code[index] = key.toString();
      index++;
      setActiveInput(index);
    }
    setVerifyCode(code);
  };

  useEffect(() => {
    if (activeInput > 4) {
      inputRef.current[4].disabled = false;
      inputRef.current[4].focus();
      return;
    }
    inputRef.current[activeInput].focus();
  }, [activeInput]);

  useEffect(() => {
    let timeleft = 0;
    let timer = setInterval(function () {
      if (timeleft >= FORGOT_PSWD_EXPIRY_TIME) {
        clearInterval(timer);
      }
      let val = FORGOT_PSWD_EXPIRY_TIME - timeleft;
      generateExpiryTime(val);
      timeleft += 1;
      if (val === 0) return navigate(-1, { replace: true });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const generateExpiryTime = (val) => {
    const minutes = Math.floor((val % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      seconds = Math.floor(val % 60)
        .toString()
        .padStart(2, "0");
    setExpiry(minutes + ":" + seconds);
  };

  const isVerifyBtnDisabled = () => {
    let disabled = true;
    verifyCode.forEach((code) => {
      if (code.length !== 0) disabled = false;
    });
    return disabled;
  };

  return (
    <Container>
      <Title>Verify your e-mail address</Title>
      <InputTitle>
        We emailed you a five-digit code to <i>{info.email}</i>.
        <br />
        Enter the code below to confirm your email address.
      </InputTitle>
      <Form>
        <InputContainer>
          {verifyCode.map((val, index) => {
            const elementRef = (element) => inputRef.current.push(element);
            return (
              <InputBox
                ref={elementRef}
                disabled={activeInput != index}
                maxLength="1"
                value={val}
                key={index}
                type="text"
                onKeyDown={(e) => handleInputChange(e, index)}
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
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  line-height: 12px;
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
