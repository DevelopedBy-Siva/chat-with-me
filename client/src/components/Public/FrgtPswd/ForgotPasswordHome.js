import { useRef, useEffect } from "react";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";

import axios from "../../../api/axios";

import ButtonContainer from "../../Public/common/ButtonContainer";
import InputContainer from "../../Public/common/InputContainer";
import { FORGOT_PSWD_SCREEN as SCREEN } from "../../../utils/Screens";
import {
  AllowedInputFields,
  emailValidation,
  inputChanges,
} from "../../../utils/InputHandler";

export default function ForgotPasswordHome({
  info,
  setInfo,
  handleScreen,
  serverResponse,
  setServerResponse,
}) {
  const emailInputRef = useRef(null);
  const emailErrorRef = useRef(null);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    emailErrorRef.current.innerText = "";
    emailErrorRef.current.classList.remove("input-error");
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
    const mail = info.email;
    const { isValid, message } = emailValidation(mail);

    if (!isValid) {
      emailErrorRef.current.innerText = message;
      emailErrorRef.current.classList.add("input-error");
      return;
    }

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

  return (
    <Container>
      <Form onSubmit={verifyEmail}>
        <InputContainer
          title="E-mail"
          inputRef={emailInputRef}
          errorRef={emailErrorRef}
          name="email"
          type="text"
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
          onClick={verifyEmail}
          loading={serverResponse.loading}
          disabled={serverResponse.loading}
        />
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Form = styled.form``;
