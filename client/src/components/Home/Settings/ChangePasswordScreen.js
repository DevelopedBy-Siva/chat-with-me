import React from "react";
import styled from "styled-components";

import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import SubModal from "../Modal/SubModal";

const modalStyle = {
  maxHeight: "420px",
  maxWidth: "480px",
};

export default function ChangePasswordScreen({ close }) {
  return (
    <SubModal style={modalStyle} close={close}>
      <Container>
        <ModalHeaderWrapper style={{ fontSize: "0.9rem" }}>
          Change password
        </ModalHeaderWrapper>
        <InputContainer>
          <InputWrapper>
            <InputLabel>Old password</InputLabel>
            <InputBox name="old password" type="password" />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>New password</InputLabel>
            <InputBox name="new password" type="password" />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Confirm password</InputLabel>
            <InputBox name="confirm password" type="password" />
          </InputWrapper>
          <ConfirmBtn>Update password</ConfirmBtn>
        </InputContainer>
      </Container>
    </SubModal>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.form`
  flex: 1;
  padding: 0.4rem 0.6rem;
  overflow-y: auto;
`;

const InputWrapper = styled.div`
  margin: 0.6rem 0 2rem 0;
`;

const InputLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 5px;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const InputBox = styled.input`
  margin-bottom: 0.4rem;
  display: block;
  width: 100%;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  background: none;
  outline: none;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.txt.main};
  border-radius: 6px;
  letter-spacing: 1px;
  font-weight: 400;
  font-style: italic;
  height: 34px;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const ConfirmBtn = styled.button`
  color: ${(props) => props.theme.txt.sub};
  outline-color: ${(props) => props.theme.border.outline};
  border: none;
  background: ${(props) => props.theme.btn.active};
  border-radius: 6px;
  padding: 0 14px;
  height: 34px;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  margin: auto;
  margin-top: 1.2rem;
  display: block;
  width: 100%;
  position: relative;

  &:enabled:hover {
    color: ${(props) => props.theme.txt.main};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;
