import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { FiKey } from "react-icons/fi";

import toast from "../../../components/Toast";
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
import retrieveError from "../../../api/ExceptionHandler";

export default function SignIn() {
  const navigate = useNavigate();

  const emailInputRef = useRef(null);

  const emailErrorRef = useRef(null);
  const passwordErrorRef = useRef(null);

  const [loginInfo, setLoginInfo] = useState({
    email: null,
    password: null,
  });
  const [serverData, setServerData] = useState({
    loading: false,
    error: null,
  });

  useEffect(() => {
    emailInputRef.current.focus();
    toast.remove();
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
    ];
    const data = inputChanges(e, type, loginInfo, allowedFields);
    setLoginInfo(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.remove();

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
      .post("/login", null, {
        headers: {
          "x-auth-email": email,
          "x-auth-password": password,
        },
      })
      .then(() => navigate("/"))
      .catch((error) => {
        let { message } = retrieveError(error, true);
        toast.error(message, toast.props.user.persist);
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

          <ForgetPswdContainer>
            <ForgetPassword>
              <PageNavigationBtn
                type="button"
                onClick={() => handlePageNavigation("/forgot-password")}
                disabled={serverData.loading}
              >
                Forgot Password?
              </PageNavigationBtn>
            </ForgetPassword>
          </ForgetPswdContainer>

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

const FormContainer = styled.div`
  display: block;
`;

const Form = styled.form`
  display: block;
  width: 100%;
`;

const ForgetPswdContainer = styled.div`
  margin-top: 10px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0;
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
