import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { FiKey } from "react-icons/fi";

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
import Checkbox from "../components/CheckBox";

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
    <SignInUpContainer title="Sign in">
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

          <CheckBoxFrgtPswd>
            <RememberMeWrapper>
              <Checkbox
                name="rememberme"
                type="checkbox"
                disabled={serverData.loading}
                isChecked={loginInfo.rememberme}
                onChange={(e) => handleInputChange(e, "rememberme")}
              />
              <RememberMeText>Remember me</RememberMeText>
            </RememberMeWrapper>
            <ForgetPassword>
              <PageNavigationBtn
                type="button"
                onClick={() => handlePageNavigation("/forgot-password")}
                disabled={serverData.loading}
              >
                Forgot Password?
              </PageNavigationBtn>
            </ForgetPassword>
          </CheckBoxFrgtPswd>

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
      </FormContainer>
    </SignInUpContainer>
  );
}

const FormContainer = styled.div``;

const Form = styled.form`
  width: 100%;
`;

const CheckBoxFrgtPswd = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;

const RememberMeWrapper = styled.label``;

const RememberMeText = styled.span`
  position: absolute;
  left: 22px;
  top: 50%;
  font-size: 0.7rem;
  transform: translateY(-50%);
  color: ${(props) => props.theme.txt.sub};
`;

const DontHaveAccount = styled.span`
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

const ForgetPassword = styled.span`
  display: block;
`;
