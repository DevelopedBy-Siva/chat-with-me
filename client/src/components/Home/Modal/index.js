import React from "react";
import styled from "styled-components";
import FocusLock from "react-focus-lock";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

export default function Modal() {
  const navigate = useNavigate();

  function handleClose() {
    return navigate("/", { replace: true });
  }

  return (
    <FocusLock>
      <Container>
        <Overlay onClick={handleClose} />
        <Wrapper>
          <Outlet />
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
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: hidden;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.bg.overlay};
  opacity: 0.6;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 760px;
  min-height: 120px;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  overflow: hidden;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
`;
