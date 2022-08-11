import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ButtonContainer from "./ButtonContainer";

export default function ForgotPassword_Verify({ info }) {
  const inputRef = useRef(new Array());

  const [verifyCode, setVerifyCode] = useState(["", "", "", "", ""]);
  const [activeInput, setActiveInput] = useState(0);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleInputChange = (e, index) => {
    let value = e.target.value;
    value = parseInt(value);

    if (value >= 0 && value <= 10) {
      const code = [...verifyCode];
      code[index] = e.target.value;
      setVerifyCode(code);
    } else return;
  };

  useEffect(() => {
    if (parseInt(verifyCode[activeInput]) >= 0) {
      console.log("YES");
    }
    console.log("NO");
  }, [verifyCode]);

  const inputValidation = (val) => {};

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
                disabled={activeInput !== index}
                maxLength="1"
                value={val}
                key={index}
                type="text"
                onChange={(e) => handleInputChange(e, index)}
              />
            );
          })}
        </InputContainer>
        <CodeExpires>
          Verification code expires in: <Timer>04:50</Timer>
        </CodeExpires>
        <ButtonContainer label="Verify" />
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
