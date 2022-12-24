import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import FocusTrap from "focus-trap-react";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal() {
  return (
    <FocusTrap>
      <Container>
        <Overlay />
        <Wrapper>
          <Outlet />
          <CloseBtn>
            <AiOutlineClose />
          </CloseBtn>
        </Wrapper>
      </Container>
    </FocusTrap>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 0, 0, 0.3);
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  max-width: 95%;
  background-color: green;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  outline: none;
  background: none;
  border: none;
`;
