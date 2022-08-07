import FocusTrap from "focus-trap-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ModalContainer({ children, childRef }) {
  useEffect(() => {});

  return (
    <FocusTrap>
      <Container>
        {children}
        <Overlay onClick={() => console.log("HJello")} />
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
  z-index: 9999;
`;

const Overlay = styled.button`
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.6);
  outline: none;
  border: none;
`;
