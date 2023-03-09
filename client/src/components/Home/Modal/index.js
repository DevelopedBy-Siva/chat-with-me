import React, { useEffect } from "react";
import styled from "styled-components";
import FocusLock from "react-focus-lock";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal() {
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
        <Wrapper>
          <Outlet />
          <CloseBtn onClick={handleClose}>
            <AiOutlineClose />
          </CloseBtn>
        </Wrapper>
        <Overlay onClick={handleClose} />
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
  display: flex;
  justify-content: center;
  align-items: center;
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
  z-index: 9999;
`;

const Wrapper = styled.div`
  width: 98%;
  margin: auto;
  max-width: 760px;
  min-height: 90px;
  background-color: ${(props) => props.theme.bg.modal};
  padding: 2rem;
  border-radius: 10px;
  overflow: hidden;
  opacity: 1;
  z-index: 999999;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.txt.sub};
  outline-color: ${(props) => props.theme.border.outline};
`;
