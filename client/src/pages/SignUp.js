import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { FiKey } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";

import axios from "../api/axios";
import {
  emailValidation as validateEmail,
  passwordValidation as validatePassword,
  validationColor,
  inputChanges,
  AllowedInputFields,
  errorVisibility,
} from "../utils/InputHandler";
import SignInUpContainer from "../components/SignInUpContainer";
import UserInputContainer from "../components/InputContainer";
import UserButtonContainer from "../components/ButtonContainer";

export default function SignIn() {
  const navigate = useNavigate();

  const nameInputRef = useRef(null);
  const nameErrorRef = useRef(null);

  const emailInputRef = useRef(null);
  const emailErrorRef = useRef(null);

  const phoneInputRef = useRef(null);
  const phoneErrorRef = useRef(null);

  const passwordInputRef = useRef(null);
  const passwordErrorRef = useRef(null);

  const confirmPswdInputRef = useRef(null);
  const confirmPswdErrorRef = useRef(null);

  const [btnActive, setBtnActive] = useState(true);
  const [signupInfo, setSignupInfo] = useState({
    email: null,
    name: null,
    phone: null,
    password: null,
    confirmPassword: null,
  });
  const [serverData, setServerData] = useState({
    loading: false,
    error: null,
  });

  // Focus on Email Input box on page startup
  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  // Validate input changes
  useEffect(() => {
    const { email, password } = signupInfo;

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    const { error } = validationColor;
    // Remove/ Add input error messages from the DOM
    if (email) {
      if (emailValid.isValid) errorVisibility(emailInputRef, emailErrorRef);
      else
        errorVisibility(
          emailInputRef,
          emailErrorRef,
          error,
          error,
          emailValid.message
        );
    }
    if (password) {
      if (passwordValid.isValid)
        errorVisibility(passwordInputRef, passwordErrorRef);
      else
        errorVisibility(
          passwordInputRef,
          passwordErrorRef,
          error,
          error,
          passwordValid.message
        );
    }
    // If Input is Valid, enable the login button
    if (emailValid.isValid && passwordValid.isValid) setBtnActive(false);
    else setBtnActive(true);
  }, [signupInfo]);

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

    setServerData({
      ...serverData,
      loading: true,
      error: null,
    });

    axios
      .get("/posts/1")
      .then(({ data }) => {})
      .catch((err) => {
        setServerData({
          ...serverData,
          loading: false,
          error: "Error Message",
        });
      });
  };

  const handleBtnSubmit = () => {
    return serverData.loading ? true : btnActive;
  };

  const handlePageNavigation = (param, replace = false) => {
    return navigate(param, {
      replace,
    });
  };

  return (
    <SignInUpContainer title="Sign up">
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <UserInputContainer
            title="E-mail"
            inputRef={nameInputRef}
            errorRef={nameErrorRef}
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
            inputRef={emailInputRef}
            errorRef={emailErrorRef}
            name="name"
            type="text"
            spellCheck="false"
            autoComplete="off"
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "email")}
            icon={<FaRegUser />}
          />

          <UserInputContainer
            title="Phone"
            inputRef={phoneInputRef}
            errorRef={phoneErrorRef}
            name="phone"
            type="text"
            spellCheck="false"
            autoComplete="off"
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "email")}
            icon={<AiOutlinePhone />}
          />

          <UserInputContainer
            title="Password"
            inputRef={passwordInputRef}
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
            inputRef={confirmPswdInputRef}
            errorRef={confirmPswdErrorRef}
            name="password"
            type="password"
            maxLength={32}
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "password")}
            icon={<FiKey />}
          />

          <UserButtonContainer
            label="Sign up"
            type="submit"
            onClick={handleSubmit}
            disabled={handleBtnSubmit()}
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
    </SignInUpContainer>
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
`;

const PageNavigationBtn = styled.button`
  color: ${(props) => props.theme.txt.highlight};
  background: none;
  outline: none;
  border: none;
  font-size: 0.7rem;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover:enabled {
    text-decoration: underline;
  }
  &:hover:disabled {
    cursor: not-allowed;
  }
`;
