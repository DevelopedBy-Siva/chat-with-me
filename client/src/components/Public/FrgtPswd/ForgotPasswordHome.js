import { useRef, useEffect } from "react";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";

import axios from "../../../api/axios";
import toast from "../../Toast";
import ButtonContainer from "../../Public/common/ButtonContainer";
import InputContainer from "../../Public/common/InputContainer";
import { FORGOT_PSWD_SCREEN as SCREEN } from "../../../utils/Screens";
import {
  AllowedInputFields,
  emailValidation,
  inputChanges,
} from "../../../utils/InputHandler";
import retrieveError from "../../../api/ExceptionHandler";

export default function ForgotPasswordHome({
  info,
  setInfo,
  handleScreen,
  serverResponse,
  setServerResponse,
}) {
  const emailInputRef = useRef(null);
  const emailErrorRef = useRef(null);

  useEffect(() => {
    toast.remove();
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    emailErrorRef.current.innerText = "";
    emailErrorRef.current.classList.remove("input-error");
  }, [info.email]);

  const handleInputChange = (e, type) => {
    const allowedFields = [
      AllowedInputFields.EMAIL,
      AllowedInputFields.PASSWORD,
      AllowedInputFields.CONFIRM_PASSWORD,
    ];
    const data = inputChanges(e, type, info, allowedFields);
    setInfo(data);
  };

  const verifyEmail = (e) => {
    e.preventDefault();
    toast.remove();

    const mail = info.email;
    const { isValid, message } = emailValidation(mail);
    if (!isValid) {
      emailErrorRef.current.innerText = message;
      emailErrorRef.current.classList.add("input-error");
      return;
    }

    setServerResponse({
      loading: true,
      error: null,
    });

    axios
      .post(`/forgot-pswd?email=${mail}`)
      .then(() => {
        toast.success(
          "Verification code sent to the registered mail",
          toast.props.user.nonPersist
        );
        handleScreen(SCREEN.VEIRFY_CODE);
      })
      .catch((error) => {
        let { message, isInfo } = retrieveError(error, true);
        if (isInfo) toast.info(message, toast.props.user.persist);
        else toast.error(message, toast.props.user.persist);

        setServerResponse({
          loading: false,
          error: "ERROR MESSAGE",
        });
      });
  };

  return (
    <Container>
      <Form onSubmit={verifyEmail}>
        <InputContainer
          title="E-mail"
          inputRef={emailInputRef}
          errorRef={emailErrorRef}
          name="email"
          type="text"
          spellCheck="false"
          autoComplete="off"
          disabled={serverResponse.loading}
          errorMessage={serverResponse.error}
          onInput={(e) => handleInputChange(e, "email")}
          icon={<MdAlternateEmail />}
        />
        <ButtonContainer
          type="submit"
          label="Verify"
          onClick={verifyEmail}
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
