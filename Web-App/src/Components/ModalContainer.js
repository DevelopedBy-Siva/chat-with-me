import FocusTrap from "focus-trap-react";
import { useEffect } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ModalContainer({ children, childRef, isNavigate }) {
  const navigateTo = useNavigate();

  useEffect(() => {}, []);

  const handleClose = () => {
    if (isNavigate) return navigateTo(-1);
  };

  return (
    <FocusTrap>
      <Container>
        <Box>{children}</Box>
        <Overlay onClick={handleClose} />
        <CloseBtn onClick={handleClose}>
          <CloseIcon />
        </CloseBtn>
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
  background: rgba(40, 40, 40, 0.8);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  outline: none;
  border: none;
  z-index: -1;
`;

const Box = styled.div`
  padding: 0.8rem;
  border-radius: 10px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 650px;
  max-height: 90%;
  overflow-y: auto;
  z-index: 1;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
`;

const CloseIcon = styled(MdClose)`
  font-size: 24px;
  color: white;
  cursor: pointer;
`;
