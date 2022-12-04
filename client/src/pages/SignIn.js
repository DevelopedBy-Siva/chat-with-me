import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
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

  const emailInputRef = useRef(null);
  const emailErrorRef = useRef(null);

  const passwordInputRef = useRef(null);
  const passwordErrorRef = useRef(null);

  const [btnActive, setBtnActive] = useState(true);
  const [loginInfo, setLoginInfo] = useState({
    email: null,
    password: null,
    rememberme: false,
  });
  const [serverData, setServerData] = useState({
    loading: false,
    error: null,
  });

  // Focus on Email Input box on page startup
  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  // Validate input changes
  useEffect(() => {
    const { email, password } = loginInfo;

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
  }, [loginInfo]);

  const handleInputChange = (e, type) => {
    const allowedFields = [
      AllowedInputFields.EMAIL,
      AllowedInputFields.PASSWORD,
      AllowedInputFields.REMEMBER_ME,
    ];
    const data = inputChanges(e, type, loginInfo, allowedFields);
    setLoginInfo(data);
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
      .then(() => {
        // TODO: Handle Success
      })
      .catch((error) => {
        setServerData({
          ...serverData,
          loading: false,
          error,
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
        <Title>Log in</Title>
        <Form onSubmit={handleSubmit}>
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

          <CheckboxContainer>
            <RememberMe
              name="rememberme"
              type="checkbox"
              disabled={serverData.loading}
              onClick={(e) => handleInputChange(e, "rememberme")}
            />
            <RememberMeText>Keep me logged in</RememberMeText>
          </CheckboxContainer>

          <UserButtonContainer
            label="Log in"
            type="submit"
            onClick={handleSubmit}
            disabled={handleBtnSubmit()}
            loading={serverData.loading}
          />
        </Form>

        <DontHaveAccount>
          Dont't have an account?{" "}
          <PageNavigationBtn
            onClick={() => handlePageNavigation("/sign-up", true)}
            disabled={serverData.loading}
          >
            Sign up
          </PageNavigationBtn>
        </DontHaveAccount>

        <ForgetPassword>
          <PageNavigationBtn
            onClick={() => handlePageNavigation("/sign-in/forgot-password")}
            disabled={serverData.loading}
          >
            Forgot Password?
          </PageNavigationBtn>
        </ForgetPassword>
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

const CheckboxContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  margin-bottom: 15px;
`;

const RememberMe = styled.input`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  &:hover:disabled {
    cursor: not-allowed;
  }
`;

const RememberMeText = styled.span`
  position: absolute;
  font-size: 11px;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
`;

const DontHaveAccount = styled.span`
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

const ForgetPassword = styled.span`
  display: block;
  margin-top: 4px;
`;