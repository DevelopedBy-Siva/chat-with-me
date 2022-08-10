import React, { useState } from "react";
import styled from "styled-components";
import ButtonContainer from "./ButtonContainer";

export default function ForgotPassword_Verify() {
  const [code, setCode] = useState([0, 0, 0, 0, 0]);

  return (
    <Container>
      <Title>Forgot Password?</Title>
      <InputTitle>Enter the verification code sent to your email</InputTitle>
      <InputContainer>
        {code.map((box) => (
          <InputBox />
        ))}
      </InputContainer>
      <ButtonContainer label="Verify" />
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
  font-weight: 700;
`;

const InputContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(20px, auto);
`;

const InputBox = styled.input`
  display: block;
  height: 50px;
`;
