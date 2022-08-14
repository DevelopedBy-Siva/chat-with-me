import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  AllowedInputFields,
  inputChanges,
  confirmPasswordValidation as validateConfirmPswd,
  validationColor,
  errorVisibility,
  passwordValidation as validatePassword,
} from "../utils/InputHandler";
import ButtonContainer from "./ButtonContainer";
import InputContainer from "./InputContainer";

export default function ForgotPasswordChangePassword({ info, setInfo }) {
  const navigate = useNavigate();

  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const newPasswordErrorRef = useRef(null);
  const confirmPasswordErrorRef = useRef(null);

  const [serverResponse, setServerResponse] = useState({
    loading: false,
    error: null,
  });
  const [btnActive, setBtnActive] = useState(true);

  useEffect(() => {
    newPasswordRef.current.focus();
  }, []);

  useEffect(() => {
    const { password, confirmPassword } = info;

    const passwordValid = validatePassword(password);
    const confirmPasswordValid = validateConfirmPswd(password, confirmPassword);

    const { error } = validationColor;
    // Remove/ Add input error messages from the DOM
    if (password) {
      if (passwordValid.isValid)
        errorVisibility(newPasswordRef, newPasswordErrorRef);
      else
        errorVisibility(
          newPasswordRef,
          newPasswordErrorRef,
          error,
          error,
          passwordValid.message
        );
    }
    if (password && password.length > 0 && confirmPassword) {
      if (confirmPasswordValid.isValid)
        errorVisibility(confirmPasswordRef, confirmPasswordErrorRef);
      else
        errorVisibility(
          confirmPasswordRef,
          confirmPasswordErrorRef,
          error,
          error,
          confirmPasswordValid.message
        );
    }
    // If Input is Valid, enable the login button
    if (passwordValid.isValid && confirmPasswordValid.isValid)
      setBtnActive(false);
    else setBtnActive(true);
  }, [info]);

  const handleInputChange = (e, type) => {
    const allowedFields = [
      AllowedInputFields.EMAIL,
      AllowedInputFields.PASSWORD,
      AllowedInputFields.CONFIRM_PASSWORD,
    ];
    const data = inputChanges(e, type, info, allowedFields);
    setInfo(data);
  };

  const handleChangePswd = (e) => {
    e.preventDefault();

    setServerResponse({
      loading: true,
      error: null,
    });

    const URL = process.env.REACT_APP_API_BASEURL;
    axios
      .get(URL)
      .then(() => {
        navigate("/sign-in", { replace: true });
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
      <Title>Create new password</Title>
      <Form onSubmit={handleChangePswd}>
        <InputContainer
          title="New password"
          placeholder="Enter the new password"
          name="new-password"
          type="password"
          inputRef={newPasswordRef}
          errorRef={newPasswordErrorRef}
          disabled={serverResponse.loading}
          onChange={(e) => handleInputChange(e, "password")}
        />
        <InputContainer
          title="Confirm password"
          placeholder="Confirm the new password"
          name="confirm-password"
          type="password"
          inputRef={confirmPasswordRef}
          errorRef={confirmPasswordErrorRef}
          disabled={serverResponse.loading}
          errorMessage={serverResponse.error}
          onChange={(e) => handleInputChange(e, "confirmPassword")}
        />
        <ButtonContainer
          type="submit"
          label="Submit"
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

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 25px;
  margin-top: 5px;
`;

const Form = styled.form``;
