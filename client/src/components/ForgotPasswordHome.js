import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";

import axios from "../api/axios";

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

export default function ForgotPasswordHome({
  info,
  setInfo,
  handleScreen,
  serverResponse,
  setServerResponse,
}) {
  const emailInputRef = useRef(null);
  const emailErrorRef = useRef(null);

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

    axios
      .get("/posts/1")
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
      <Form onSubmit={verifyEmail}>
        <InputContainer
          title="E-mail"
          inputRef={emailInputRef}
          errorRef={emailErrorRef}
          name="email"
          type="email"
          spellCheck="false"
          autoComplete="off"
          disabled={serverResponse.loading}
          errorMessage={serverResponse.error}
          onInput={(e) => handleInputChange(e, "email")}
          icon={<MdAlternateEmail />}
        />
        <ButtonContainer
          type="submit"
          label="Verify"
          marginTop="5px"
          marginBottom="10px"
          loading={serverResponse.loading}
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
