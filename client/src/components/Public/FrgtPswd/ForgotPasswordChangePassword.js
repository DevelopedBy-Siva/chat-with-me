import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "../../../api/axios";
import toast from "../../Toast";
import {
  AllowedInputFields,
  inputChanges,
  confirmPasswordValidation as validateConfirmPswd,
  passwordValidation as validatePassword,
} from "../../../utils/InputHandler";
import ButtonContainer from "../common/ButtonContainer";
import InputContainer from "../common/InputContainer";
import retrieveError from "../../../api/ExceptionHandler";

export default function ForgotPasswordChangePassword({
  info,
  setInfo,
  serverResponse,
  setServerResponse,
}) {
  const navigate = useNavigate();

  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const newPasswordErrorRef = useRef(null);
  const confirmPasswordErrorRef = useRef(null);

  useEffect(() => {
    newPasswordRef.current.focus();
  }, []);

  useEffect(() => {
    newPasswordErrorRef.current.innerText = "";
    newPasswordErrorRef.current.classList.remove("input-error");
  }, [info.password]);

  useEffect(() => {
    confirmPasswordErrorRef.current.innerText = "";
    confirmPasswordErrorRef.current.classList.remove("input-error");
  }, [info.confirmPassword]);

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
    toast.remove();

    const { password, confirmPassword } = info;

    const passwordValid = validatePassword(password);
    const confirmPasswordValid = validateConfirmPswd(password, confirmPassword);

    const validInput = passwordValid.isValid && confirmPasswordValid.isValid;
    if (!validInput) {
      if (!passwordValid.isValid) {
        newPasswordErrorRef.current.innerText = passwordValid.message;
        newPasswordErrorRef.current.classList.add("input-error");
      }
      if (!confirmPasswordValid.isValid) {
        confirmPasswordErrorRef.current.innerText =
          confirmPasswordValid.message;
        confirmPasswordErrorRef.current.classList.add("input-error");
      }
      return;
    }

    setServerResponse({
      loading: true,
      error: null,
    });

    axios
      .put(`/change-pswd?email=${info.email}`, null, {
        headers: {
          "x-password": info.password,
        },
      })
      .then(() => {
        toast.success("Password changed successfully. Redirecting...");
        setTimeout(() => navigate("/sign-in", { replace: true }), 3000);
      })
      .catch((error) => {
        let { message } = retrieveError(error, true);
        toast.error(message, toast.props.user.persist);
        setServerResponse({
          loading: false,
          error: "ERROR MESSAGE",
        });
      });
  };

  return (
    <Container>
      <Form onSubmit={handleChangePswd}>
        <InputContainer
          title="New password"
          name="new-password"
          type="password"
          inputRef={newPasswordRef}
          errorRef={newPasswordErrorRef}
          disabled={serverResponse.loading}
          onChange={(e) => handleInputChange(e, "password")}
        />
        <InputContainer
          title="Confirm password"
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
          onClick={handleChangePswd}
          marginTop="5px"
          marginBottom="10px"
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
