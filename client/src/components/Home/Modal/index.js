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
        <Overlay {...OverlayAnimation} onClick={handleClose} />
        <Wrapper {...ContentAnimation}>
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
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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
`;

const Wrapper = styled(motion.div)`
  width: 100%;
  max-width: 760px;
  min-height: 90px;
  background-color: ${(props) => props.theme.bg.modal};
  padding: 15px;
  border-radius: 10px;
  overflow: hidden;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.txt.sub};
`;

const OverlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 0.8 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.25,
  },
};

const ContentAnimation = {
  initial: { opacity: 0, y: "100%" },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "100%" },
  transition: { duration: 0.15 },
};
