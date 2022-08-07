import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  emailValidation as validateEmail,
  passwordValidation as validatePassword,
  validationColor,
} from "../utils/Validations";
import AppLogo from "../components/AppLogo";

export default function SignUp() {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const passwordErrorRef = useRef(null);
  const emailErrorRef = useRef(null);

  const emailPlaceholderRef = useRef(null);
  const passwordPlaceholderRef = useRef(null);

  const [btnActive, setBtnActive] = useState(true);

  const [loginInfo, setLoginInfo] = useState({
    email: null,
    password: null,
    rememberme: false,
  });
  const [serverData, setServerData] = useState({
    loading: false,
    response: null,
    error: {
      code: null,
      desc: null,
    },
  });

  // Focus on Email Input box on page startup
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // Validate input changes
  useEffect(() => {
    const { email, password } = loginInfo;

    const isEmailNotEmpty = email && !email.isEmpty;
    const isPasswordNotEmpty = password && !password.isEmpty;

    if (isEmailNotEmpty) emailPlaceholderRef.current.style.display = "none";
    else emailPlaceholderRef.current.style.display = "block";
    if (isPasswordNotEmpty)
      passwordPlaceholderRef.current.style.display = "none";
    else passwordPlaceholderRef.current.style.display = "block";

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    // Remove/ Add input error messages from the DOM
    if (email) {
      if (emailValid.isValid) handleErrorVisibility(emailRef, emailErrorRef);
      else
        handleErrorVisibility(
          emailRef,
          emailErrorRef,
          validationColor.error,
          validationColor.error,
          emailValid.message
        );
    }
    if (password) {
      if (passwordValid.isValid)
        handleErrorVisibility(passwordRef, passwordErrorRef);
      else
        handleErrorVisibility(
          passwordRef,
          passwordErrorRef,
          validationColor.error,
          validationColor.error,
          passwordValid.message
        );
    }
    // If Input is Valid, enable the login button
    if (emailValid.isValid && passwordValid.isValid) setBtnActive(false);
    else setBtnActive(true);
  }, [loginInfo]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    const data = { ...loginInfo };
    switch (type) {
      case "email":
        data.email = value.toLowerCase();
        break;
      case "password":
        data.password = value;
        break;
      case "rememberme":
        data.rememberme = e.target.checked;
        break;
      default:
        break;
    }
    setLoginInfo(data);
  };

  const handleErrorVisibility = (
    inputRef,
    errorRef,
    txtColor = validationColor.success,
    borderColor = validationColor.success,
    errorMsg = null
  ) => {
    inputRef.current.style.color = txtColor;
    inputRef.current.style.border = `1px solid ${borderColor}`;
    errorRef.current.innerText = errorMsg;
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
          error: {
            code: "",
            desc: "",
          },
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
    <Container>
      <AppLogo top="10px" left="10px" width="20px" />
      <LogoContainer></LogoContainer>
      <FormContainer>
        <Title>Sign up</Title>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <InputHeading>Your e-mail</InputHeading>
            <Placeholder ref={emailPlaceholderRef}>name@domain.com</Placeholder>
            <InputBox
              ref={emailRef}
              name="email"
              type="email"
              spellCheck="false"
              autoComplete="off"
              disabled={serverData.loading}
              onInput={(e) => handleInputChange(e, "email")}
            />
            <InputErrorMessage ref={emailErrorRef}></InputErrorMessage>
          </InputContainer>
          <InputContainer>
            <InputHeading>Password</InputHeading>
            <Placeholder ref={passwordPlaceholderRef}>
              at least 8 characters
            </Placeholder>
            <InputBox
              ref={passwordRef}
              name="password"
              type="password"
              maxLength={32}
              disabled={serverData.loading}
              onInput={(e) => handleInputChange(e, "password")}
            />
            <InputErrorMessage ref={passwordErrorRef}></InputErrorMessage>
          </InputContainer>
          <CheckboxContainer>
            <RememberMe
              name="rememberme"
              type="checkbox"
              disabled={serverData.loading}
              onClick={(e) => handleInputChange(e, "rememberme")}
            />
            <RememberMeText>Keep me logged in</RememberMeText>
          </CheckboxContainer>
          <LoginBtn
            type="submit"
            onClick={handleSubmit}
            disabled={handleBtnSubmit()}
            apiCallInProgress={serverData.loading}
          >
            Sign up
          </LoginBtn>
        </Form>
        <DontHaveAccount>
          Already have account?
          <RedirectToSignUp
            onClick={() => handlePageNavigation("/sign-in", true)}
          >
            Sign in
          </RedirectToSignUp>
        </DontHaveAccount>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  font-family: "Ubuntu", sans-serif;
  @media (max-width: 728px) {
    padding-bottom: 0.6rem;
  }
`;

const LogoContainer = styled.div`
  width: 50%;
  max-width: 700px;
  background-image: linear-gradient(to right, #8e2de2, #4a00e0);
  padding: 0.8rem;

  @media (max-width: 728px) {
    position: fixed;
    height: 20vh;
    width: 100%;
    max-width: 100%;
    z-index: -1;
  }
`;

// const LogoContainerImg = styled.img`
//   width: 100%;
// `;

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 34px;
  margin-bottom: 15px;
`;

const FormContainer = styled.div`
  padding: 0.8rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;

  @media (max-width: 728px) {
    background: white;
    width: 90%;
    max-width: 500px;
    flex: none;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    margin-top: 10vh;
    margin-left: auto;
    margin-right: auto;
    height: 400px;
  }
`;

const Form = styled.form`
  width: 95%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  color: #737373;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputHeading = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 700;
`;

const InputBox = styled.input`
  width: 100%;
  height: 35px;
  outline: none;
  border: 1px solid #737373;
  border-radius: 5px;
  margin-bottom: 32px;
  font-size: 12px;
  padding: 3px 6px;
  background: none;
`;

const Placeholder = styled.span`
  position: absolute;
  bottom: 44px;
  left: 8px;
  color: #737373;
  font-size: 10px;
  pointer-events: none;
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
`;

const RememberMeText = styled.span`
  position: absolute;
  font-size: 11px;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
`;

const LoginBtn = styled.button`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  outline: none;
  border: none;
  margin-bottom: 15px;
  font-weight: 700;
  color: white;
  cursor: ${({ disabled, apiCallInProgress }) =>
    apiCallInProgress ? "progress" : disabled ? "not-allowed" : "pointer"};
  background: ${({ disabled }) =>
    disabled ? "#c9c9c9" : "linear-gradient(to right, #8e2de2, #4a00e0)"};
`;

const InputErrorMessage = styled.span`
  display: block;
  position: absolute;
  bottom: 12px;
  left: 4px;
  font-size: 10px;
  color: red;
`;

const DontHaveAccount = styled.span`
  display: block;
  font-weight: 400;
  font-size: 10px;
  color: #737373;
`;

const RedirectToSignUp = styled.button`
  color: #4a00e0;
  background: none;
  outline: none;
  border: none;
  font-size: 10px;
  font-weight: 700;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
