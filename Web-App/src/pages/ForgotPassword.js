import { useState, useRef } from "react";
import styled from "styled-components";
import InputContainer from "../components/InputContainer";
import Modal from "../components/ModalContainer";

export default function ForgotPassword() {
  const [email, setEmail] = useState(null);

  const emailInputRef = useRef(null);
  const inputPlaceholderRef = useRef(null);
  const errorRef = useRef(null);

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case "email":
        email = value.toLowerCase();
        break;
      default:
        break;
    }
    setEmail(email);
  };

  return (
    <Modal isNavigate={true}>
      <Container>
        <Title>Forgot Password?</Title>
        <Form>
          <InputContainer
            title="Your e-mail"
            placeholderRef={inputPlaceholderRef}
            inputRef={emailInputRef}
            errorRef={errorRef}
            placeholder="name@domain.com"
            name="email"
            type="email"
            spellCheck="false"
            autoComplete="off"
            // disabled={serverData.loading}
            onInput={(e) => handleInputChange(e, "email")}
          />
        </Form>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Form = styled.form``;

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 15px;
`;

const SubmitBtn = styled.button``;
