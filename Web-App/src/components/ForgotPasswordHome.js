import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import ButtonContainer from "./ButtonContainer";
import InputContainer from "./InputContainer";
import { FORGOT_PSWD_SCREEN as SCREEN } from "../utils/Screens";
import {
  AllowedInputFields,
  emailValidation,
  inputChanges,
  validationColor,
  errorVisibility,
} from "../utils/InputHandler";

export default function ForgotPasswordHome({ info, setInfo, handleScreen }) {
  const emailInputRef = useRef(null);
  const emailErrorRef = useRef(null);

  const [serverResponse, setServerResponse] = useState({
    loading: false,
    error: null,
  });
  const [btnActive, setBtnActive] = useState(true);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    const { email } = info;
    const { isValid, message } = emailValidation(email);

    if (email) {
      const { error } = validationColor;

      if (isValid) errorVisibility(emailInputRef, emailErrorRef);
      else errorVisibility(emailInputRef, emailErrorRef, error, error, message);
    }
    isValid ? setBtnActive(false) : setBtnActive(true);
  }, [info.email]);

  const handleInputChange = (e, type) => {
    const allowedFields = [
      AllowedInputFields.EMAIL,
      AllowedInputFields.PASSWORD,
      AllowedInputFields.CONFIRM_PASSWORD,
    ];
    const data = inputChanges(e, type, info, allowedFields);
    setInfo(data);
  };

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
        handleScreen(SCREEN.VEIRFY_CODE);
      })
      .catch(() => {
        setServerResponse({
          loading: false,
          error: "ERROR MESSAGE",
        });
      });
  };

  const handleBtnSubmit = () => {
    return serverResponse.loading ? true : btnActive;
  };

  return (
    <Container>
      <Title>Reset password</Title>
      <Description>
        Enter the email associated with your account and we'll send a
        verifcation code to confirm your email
      </Description>
      <Form onSubmit={verifyEmail}>
        <InputContainer
          title="Your e-mail"
          inputRef={emailInputRef}
          errorRef={emailErrorRef}
          placeholder="name@domain.com"
          name="email"
          type="email"
          spellCheck="false"
          autoComplete="off"
          disabled={serverResponse.loading}
          errorMessage={serverResponse.error}
          onInput={(e) => handleInputChange(e, "email")}
        />
        <ButtonContainer
          type="submit"
          label="Verify"
          marginTop="5px"
          marginBottom="10px"
          disabled={handleBtnSubmit()}
        />
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Form = styled.form``;

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 25px;
  margin-top: 5px;
`;

const Description = styled.h3`
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  line-height: 12px;
  text-align: center;
  width: 60%;
  margin: auto;
  margin-bottom: 25px;
  line-height: 16px;

  @media (max-width: 728px) {
    width: 80%;
  }
`;
