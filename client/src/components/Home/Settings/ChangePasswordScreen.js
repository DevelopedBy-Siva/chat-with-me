import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import SubModal from "../Modal/SubModal";
import axios from "../../../api/axios";
import toast from "../../Toast";
import retrieveError from "../../../api/ExceptionHandler";
import {
  AllowedInputFields,
  confirmPasswordValidation,
  inputChanges,
  passwordValidation,
} from "../../../utils/InputHandler";

const modalStyle = {
  maxHeight: "435px",
  maxWidth: "480px",
};

export default function ChangePasswordScreen({ close }) {
  const currentPswdErrorRef = useRef(null);
  const newPswdErrorRef = useRef(null);
  const confirmPswdErrorRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const [info, setInfo] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    currentPswdErrorRef.current.innerText = "";
    currentPswdErrorRef.current.classList.remove("input-error");
  }, [info.currentPassword]);

  useEffect(() => {
    newPswdErrorRef.current.innerText = "";
    newPswdErrorRef.current.classList.remove("input-error");
  }, [info.password]);

  useEffect(() => {
    confirmPswdErrorRef.current.innerText = "";
    confirmPswdErrorRef.current.classList.remove("input-error");
  }, [info.confirmPassword]);

  function handleClose() {
    if (isLoading) return;
    close();
  }

  const handleInputChange = (e, type) => {
    const allowedFields = [
      AllowedInputFields.CURRENT_PASSWORD,
      AllowedInputFields.PASSWORD,
      AllowedInputFields.CONFIRM_PASSWORD,
    ];
    const data = inputChanges(e, type, info, allowedFields);
    setInfo(data);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (isLoading) return;

    const { currentPassword, password, confirmPassword } = info;
    const currentPasswordValid = passwordValidation(currentPassword);
    const passwordValid = passwordValidation(password);
    const confirmPasswordValid = confirmPasswordValidation(
      password,
      confirmPassword
    );

    const isValid =
      currentPasswordValid.isValid &&
      passwordValid.isValid &&
      confirmPasswordValid.isValid;

    if (!isValid) {
      if (!currentPasswordValid.isValid) {
        currentPswdErrorRef.current.innerText = currentPasswordValid.message;
        currentPswdErrorRef.current.classList.add("input-error");
      }
      if (!passwordValid.isValid) {
        newPswdErrorRef.current.innerText = passwordValid.message;
        newPswdErrorRef.current.classList.add("input-error");
      }
      if (!confirmPasswordValid.isValid) {
        confirmPswdErrorRef.current.innerText = confirmPasswordValid.message;
        confirmPswdErrorRef.current.classList.add("input-error");
      }
      return;
    }

    setIsLoading(true);
    await axios
      .put("/user/change-pswd", null, {
        headers: {
          "x-current-password": info.currentPassword,
          "x-new-password": info.password,
        },
      })
      .then(() => {
        toast.success("Password changed successfully");
        close();
      })
      .catch((error) => {
        let { message } = retrieveError(error);
        try {
          if (error.response.status === 405)
            message = "Please check your current password";
        } catch (_) {}
        toast.error(message, toast.props.user.nonPersist);
        setIsLoading(false);
      });
  }

  return (
    <SubModal style={modalStyle} inactive={isLoading} close={handleClose}>
      <Container>
        <ModalHeaderWrapper style={{ fontSize: "0.9rem" }}>
          Change password
        </ModalHeaderWrapper>
        <InputContainer onSubmit={handleSubmit}>
          <InputWrapper>
            <InputLabel>Current password</InputLabel>
            <InputBox
              value={info.currentPassword}
              name="currentPassword"
              type="password"
              onInput={(e) => handleInputChange(e, "currentPassword")}
            />
            <InputErrorMessage ref={currentPswdErrorRef} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>New password</InputLabel>
            <InputBox
              value={info.password}
              name="password"
              type="password"
              onInput={(e) => handleInputChange(e, "password")}
            />
            <InputErrorMessage ref={newPswdErrorRef} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Confirm password</InputLabel>
            <InputBox
              value={info.confirmPassword}
              name="confirmPassword"
              type="password"
              onInput={(e) => handleInputChange(e, "confirmPassword")}
            />
            <InputErrorMessage ref={confirmPswdErrorRef} />
          </InputWrapper>
          <ConfirmBtn disabled={isLoading} type="submit">
            Update password
          </ConfirmBtn>
        </InputContainer>
      </Container>
    </SubModal>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.form`
  flex: 1;
  padding: 0.4rem 0.6rem;
  overflow-y: auto;
  flex-shrink: 0;
  margin-top: 0.6rem;
`;

const InputWrapper = styled.div`
  min-height: 80px;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 5px;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const InputBox = styled.input`
  margin-bottom: 0.4rem;
  display: block;
  width: 100%;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  background: none;
  outline: none;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.txt.main};
  border-radius: 6px;
  letter-spacing: 1px;
  font-weight: 400;
  font-style: italic;
  height: 34px;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const ConfirmBtn = styled.button`
  color: ${(props) => props.theme.txt.sub};
  outline-color: ${(props) => props.theme.border.outline};
  border: none;
  background: ${(props) => props.theme.btn.active};
  border-radius: 6px;
  padding: 0 14px;
  height: 34px;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  margin: auto;
  margin-top: 0.8rem;
  display: block;
  width: 100%;
  position: relative;

  &:enabled:hover {
    color: ${(props) => props.theme.txt.main};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const InputErrorMessage = styled.span`
  display: none;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  margin-top: 5px;
  line-height: 16px;

  &.input-error {
    display: block;
  }
`;
