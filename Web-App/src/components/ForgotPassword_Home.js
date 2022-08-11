import { useRef, useEffect } from "react";
import styled from "styled-components";
import ButtonContainer from "../components/ButtonContainer";
import InputContainer from "../components/InputContainer";
import { FORGOT_PSWD_SCREEN as SCREEN } from "../utils/Screens";
import {
  AllowedInputFields,
  emailValidation,
  inputChanges,
  validationColor,
  errorVisibility,
} from "../utils/InputHandler";

export default function ForgotPassword_Home({
  verify,
  serverResponse,
  info,
  setInfo,
  btnActive,
  setBtnActive,
}) {
  const emailInputRef = useRef(null);
  const emailErrorRef = useRef(null);

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

  const handleBtnSubmit = () => {
    return serverResponse.loading ? true : btnActive;
  };

  return (
    <Container>
      <Title>Forgot Password?</Title>
      <Form onSubmit={(e) => verify(e, SCREEN.VEIRFY_CODE)}>
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
