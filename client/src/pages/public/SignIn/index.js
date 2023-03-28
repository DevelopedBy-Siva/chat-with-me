import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { FiKey } from "react-icons/fi";

import toast, { DEFAULT_PUBLIC_TOAST_PROPS } from "../../../components/Toast";
import axios from "../../../api/axios";
import {
  emailValidation as validateEmail,
  passwordValidation as validatePassword,
  inputChanges,
  AllowedInputFields,
} from "../../../utils/InputHandler";
import PageWrapper from "../../../components/Public/common/PageWrapper";
import UserInputContainer from "../../../components/Public/common/InputContainer";
import UserButtonContainer from "../../../components/Public/common/ButtonContainer";
import Checkbox from "../../../components/Public/common/CheckBox";
import { saveToken } from "../../../utils/Auth";
import retrieveError from "../../../api/ExceptionHandler";

export default function SignIn() {
  const navigate = useNavigate();

  const emailInputRef = useRef(null);

  const emailErrorRef = useRef(null);
  const passwordErrorRef = useRef(null);

  const [loginInfo, setLoginInfo] = useState({
    email: null,
    password: null,
    rememberme: false,
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
  }, [loginInfo.email]);

  useEffect(() => {
    passwordErrorRef.current.innerText = "";
    passwordErrorRef.current.classList.remove("input-error");
  }, [loginInfo.password]);

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

    const { email, password } = loginInfo;

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    const validInput = emailValid.isValid && passwordValid.isValid;
    if (!validInput) {
      if (!emailValid.isValid) {
        emailErrorRef.current.innerText = emailValid.message;
        emailErrorRef.current.classList.add("input-error");
      }
      if (!passwordValid.isValid) {
        passwordErrorRef.current.innerText = passwordValid.message;
        passwordErrorRef.current.classList.add("input-error");
      }
      return;
    }

    setServerData({
      ...serverData,
      loading: true,
      error: null,
    });

    axios
      .post("/login")
      .then(() => {
        // TODO: Handle Success
        const token = "token";
        const saved = saveToken(token);
        if (!saved) throw new Error("Something went wrong. Try again later...");
        return navigate("/");
      })
      .catch((error) => {
        let { message, toastId } = retrieveError(error);
        toast.error(message, { ...DEFAULT_PUBLIC_TOAST_PROPS, id: toastId });
        setServerData({
          ...serverData,
          loading: false,
          error,
        });
      });
  };

  const handlePageNavigation = (param, replace = false) => {
    return navigate(param, {
      replace,
    });
  };

  return (
    <PageWrapper title="Sign in">
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
            errorRef={passwordErrorRef}
            name="password"
            type="password"
            maxLength={32}
            disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "password")}
            icon={<FiKey />}
          />

          <CheckBoxFrgtPswd>
            <RememberMeWrapper disable={serverData.loading}>
              <Checkbox
                name="rememberme"
                type="checkbox"
                disabled={serverData.loading}
                isChecked={loginInfo.rememberme}
                onChange={(e) => handleInputChange(e, "rememberme")}
              />
              Remember me
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
            disabled={serverData.loading}
            loading={serverData.loading}
          />
        </Form>

        <DontHaveAccount>
          Don't have an account?{" "}
          <PageNavigationBtn
            onClick={() => handlePageNavigation("/sign-up", true)}
            disabled={serverData.loading}
          >
            Sign up
          </PageNavigationBtn>
        </DontHaveAccount>
      </FormContainer>
    </PageWrapper>
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
  padding: 10px 0;
`;

const RememberMeWrapper = styled.label`
  cursor: ${(props) => (props.disable ? "not-allowed" : "pointer")};
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.7rem;
  font-weight: 400;
`;

const DontHaveAccount = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  font-weight: 400;
`;

const PageNavigationBtn = styled.button`
  color: ${(props) => props.theme.txt.main};
  background: none;
  outline: none;
  border: none;
  font-size: 0.7rem;
  letter-spacing: 1px;
  cursor: pointer;
  font-weight: 500;

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
