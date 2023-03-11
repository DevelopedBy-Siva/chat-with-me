import React, { useEffect } from "react";
import styled from "styled-components";
import FocusLock from "react-focus-lock";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ style = {}, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  function handleClose() {
    return navigate("/", { replace: true });
  }

  return (
    <FocusLock>
      <Container>
        <Overlay onClick={handleClose} />
        <Wrapper style={style}>
          {children}
          <CloseBtn onClick={handleClose}>
            <AiOutlineClose />
          </CloseBtn>
        </Wrapper>
      </Container>
    </FocusLock>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100dvh;
  z-index: 999999;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.bg.overlay};
  opacity: 0.8;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.bg.modal};
  padding: 2rem 1.2rem 1.2rem 1.2rem;
  border-radius: 10px;
  width: 98%;
  height: 95%;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.txt.sub};
  outline-color: ${(props) => props.theme.border.outline};
`;
