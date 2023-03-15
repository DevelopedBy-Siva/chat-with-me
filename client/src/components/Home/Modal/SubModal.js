import React from "react";
import styled from "styled-components";
import FocusLock from "react-focus-lock";
import { AiOutlineClose } from "react-icons/ai";

export default function SubModal({
  style = {},
  inactive = false,
  close,
  children,
}) {
  function handleClose() {
    close();
  }

  return (
    <FocusLock>
      <Container>
        <Overlay inactive={inactive ? 1 : 0} onClick={handleClose} />
        <Wrapper style={style}>
          {children}
          <CloseBtn disabled={inactive} onClick={handleClose}>
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
  z-index: 99999999;
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
  cursor: ${(props) => (props.inactive ? "not-allowed" : "auto")};
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.bg.modal};
  padding: 2rem 1.2rem 1.8rem 1.2rem;
  border-radius: 10px;
  width: 95%;
  height: 95%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media (max-width: 484px) {
    padding: 1.8rem 1rem 1.6rem 1rem;
  }
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

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:enabled {
    color: ${(props) => props.theme.txt.main};
  }
`;
