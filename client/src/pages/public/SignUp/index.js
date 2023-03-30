import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { FiKey } from "react-icons/fi";
import { TiTickOutline } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";

import toast, { DEFAULT_PUBLIC_TOAST_PROPS } from "../../../components/Toast";
import axios from "../../../api/axios";
import {
  emailValidation as validateEmail,
  passwordValidation as validatePassword,
  nameValidation as validateName,
  phoneValidation as validatePhone,
  confirmPasswordValidation as validateConfirmPswd,
  inputChanges,
  AllowedInputFields,
} from "../../../utils/InputHandler";
import PageWrapper from "../../../components/Public/common/PageWrapper";
import UserInputContainer from "../../../components/Public/common/InputContainer";
import UserButtonContainer from "../../../components/Public/common/ButtonContainer";
import retrieveError from "../../../api/ExceptionHandler";

export default function SignUp() {
  const navigate = useNavigate();

  const emailInputRef = useRef(null);

  const emailErrorRef = useRef(null);
  const nameErrorRef = useRef(null);
  const phoneErrorRef = useRef(null);
  const passwordErrorRef = useRef(null);
  const confirmPswdErrorRef = useRef(null);

  const [signupInfo, setSignupInfo] = useState({
    email: null,
    name: null,
    phone: "",
    password: null,
    confirmPassword: null,
  });
  const [serverData, setServerData] = useState({
    loading: false,
    error: null,
  });

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    emailErrorRef.current.innerText = "";
    emailErrorRef.current.classList.remove("input-error");
  }, [signupInfo.email]);

  useEffect(() => {
    nameErrorRef.current.innerText = "";
    nameErrorRef.current.classList.remove("input-error");
  }, [signupInfo.name]);

  useEffect(() => {
    phoneErrorRef.current.innerText = "";
    phoneErrorRef.current.classList.remove("input-error");
  }, [signupInfo.phone]);

  useEffect(() => {
    passwordErrorRef.current.innerText = "";
    passwordErrorRef.current.classList.remove("input-error");
  }, [signupInfo.password]);

  useEffect(() => {
    confirmPswdErrorRef.current.innerText = "";
    confirmPswdErrorRef.current.classList.remove("input-error");
  }, [signupInfo.confirmPassword]);

  const handleInputChange = (e, type) => {
    const allowedFields = [
      AllowedInputFields.NAME,
      AllowedInputFields.EMAIL,
      AllowedInputFields.PHONE,
      AllowedInputFields.PASSWORD,
      AllowedInputFields.CONFIRM_PASSWORD,
    ];
    const data = inputChanges(e, type, signupInfo, allowedFields);
    setSignupInfo(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.remove();

    const { email, password, phone, name, confirmPassword } = signupInfo;

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    const nameValid = validateName(name);
    const phoneValid = validatePhone(phone);
    const confirmPswd = validateConfirmPswd(password, confirmPassword);

    const validInput =
      emailValid.isValid &&
      passwordValid.isValid &&
      nameValid.isValid &&
      phoneValid.isValid &&
      confirmPswd.isValid;

    if (!validInput) {
      if (!emailValid.isValid) {
        emailErrorRef.current.innerText = emailValid.message;
        emailErrorRef.current.classList.add("input-error");
      }
      if (!nameValid.isValid) {
        nameErrorRef.current.innerText = nameValid.message;
        nameErrorRef.current.classList.add("input-error");
      }
      if (!phoneValid.isValid) {
        phoneErrorRef.current.innerText = phoneValid.message;
        phoneErrorRef.current.classList.add("input-error");
      }
      if (!passwordValid.isValid) {
        passwordErrorRef.current.innerText = passwordValid.message;
        passwordErrorRef.current.classList.add("input-error");
      }
      if (!confirmPswd.isValid) {
        confirmPswdErrorRef.current.innerText = confirmPswd.message;
        confirmPswdErrorRef.current.classList.add("input-error");
      }
      return;
    }

    setServerData({
      ...serverData,
      loading: true,
      error: null,
    });
    axios
      .post("/register", { ...signupInfo, confirmPassword: undefined })
      .then(() => navigate("/"))
      .catch((err) => {
        let { message, toastId, isInfo } = retrieveError(err, true);
        if (isInfo)
          toast.info(message, {
            ...DEFAULT_PUBLIC_TOAST_PROPS,
            id: toastId,
          });
        else
          toast.error(message, {
            ...DEFAULT_PUBLIC_TOAST_PROPS,
            id: toastId,
          });

        setServerData({
          ...serverData,
          loading: false,
          error: err,
        });
      });
  };

  const handlePageNavigation = (param, replace = false) => {
    return navigate(param, {
      replace,
    });
  };

  return (
    <PageWrapper title="Sign up">
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <UserInputContainer
            title="E-mail"
            inputRef={emailInputRef}
            errorRef={emailErrorRef}
            name="email"
            type="text"
            spellCheck="false"
            autoComplete="off"
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "email")}
            icon={<MdAlternateEmail />}
          />

          <UserInputContainer
            title="Name"
            errorRef={nameErrorRef}
            name="name"
            type="text"
            spellCheck="false"
            autoComplete="off"
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "name")}
            icon={<FaRegUser />}
          />

          <UserInputContainer
            title="Phone"
            errorRef={phoneErrorRef}
            name="phone"
            type="text"
            spellCheck="false"
            autoComplete="off"
            inputMode="numeric"
            value={signupInfo.phone}
            disabled={serverData.loading}
            onChange={(e) => handleInputChange(e, "phone")}
            icon={<AiOutlinePhone />}
          />

          <UserInputContainer
            title="Password"
            errorRef={passwordErrorRef}
            name="password"
            type="password"
            maxLength={32}
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "password")}
            icon={<FiKey />}
          />

          <UserInputContainer
            title="Confirm Password"
            errorRef={confirmPswdErrorRef}
            name="password"
            type="password"
            maxLength={32}
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "confirmPassword")}
            icon={<TiTickOutline />}
          />

          <UserButtonContainer
            label="Sign up"
            type="submit"
            onClick={handleSubmit}
            disabled={serverData.loading}
            loading={serverData.loading}
          />
        </Form>

        <AlreadyHaveAccount>
          Already have an account?{" "}
          <PageNavigationBtn
            onClick={() => handlePageNavigation("/sign-in", true)}
            disabled={serverData.loading}
          >
            Sign in
          </PageNavigationBtn>
        </AlreadyHaveAccount>
      </FormContainer>

      <Outlet />
    </PageWrapper>
  );
}

const FormContainer = styled.div``;

const Form = styled.form`
  width: 100%;
`;

const AlreadyHaveAccount = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  font-weight: 400;
`;

const PageNavigationBtn = styled.button`
  color: ${(props) => props.theme.txt.highlight};
  background: none;
  outline: none;
  border: none;
  font-size: 0.7rem;
  letter-spacing: 1px;
  font-weight: 500;
  cursor: pointer;

  &:hover:enabled {
    text-decoration: underline;
  }
  &:hover:disabled {
    cursor: not-allowed;
  }
`;
