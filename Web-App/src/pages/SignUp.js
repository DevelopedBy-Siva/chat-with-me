import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
    response: null,
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
      response: null,
    });

    const URL = process.env.REACT_APP_API_BASEURL;
    axios
      .get(URL)
      .then(({ data }) => {
        setServerData({
          ...serverData,
          loading: true,
          error: null,
          response: 200,
        });
      })
      .catch((err) => {
        setServerData({
          ...serverData,
          loading: false,
          response: null,
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
    <SignInUpContainer>
      <FormContainer>
        <Title>Sign up</Title>
        <Form onSubmit={handleSubmit}>
          <UserInputContainer
            title="Your e-mail"
            inputRef={nameInputRef}
            errorRef={nameErrorRef}
            placeholder="name@domain.com"
            name="email"
            type="email"
            spellCheck="false"
            autoComplete="off"
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "email")}
          />

          <UserInputContainer
            title="Your e-mail"
            inputRef={emailInputRef}
            errorRef={emailErrorRef}
            placeholder="name@domain.com"
            name="email"
            type="email"
            spellCheck="false"
            autoComplete="off"
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "email")}
          />

          <UserInputContainer
            title="Your e-mail"
            inputRef={phoneInputRef}
            errorRef={phoneErrorRef}
            placeholder="name@domain.com"
            name="email"
            type="email"
            spellCheck="false"
            autoComplete="off"
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "email")}
          />

          <UserInputContainer
            title="Password"
            inputRef={passwordInputRef}
            errorRef={passwordErrorRef}
            placeholder="at least 8 characters"
            name="password"
            type="password"
            maxLength={32}
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "password")}
          />

          <UserInputContainer
            title="Password"
            inputRef={confirmPswdInputRef}
            errorRef={confirmPswdErrorRef}
            placeholder="at least 8 characters"
            name="password"
            type="password"
            maxLength={32}
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "password")}
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
          Already have an account?
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  padding: 0.8rem;

  @media (max-width: 728px) {
    background: white;
    width: 100%;
    max-width: 500px;
    flex: none;
    margin: 15px 0;
  }
`;

const Form = styled.form`
  width: 95%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  color: #737373;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 34px;
  margin-bottom: 15px;
`;

const AlreadyHaveAccount = styled.span`
  display: block;
  font-weight: 400;
  font-size: 10px;
  color: #737373;
`;

const PageNavigationBtn = styled.button`
  color: #4a00e0;
  background: none;
  outline: none;
  border: none;
  font-size: 10px;
  font-weight: 700;
  margin-left: 5px;
  cursor: pointer;
  &:hover:enabled {
    text-decoration: underline;
  }
  &:hover:disabled {
    cursor: not-allowed;
  }
`;
