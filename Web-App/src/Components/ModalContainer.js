import styled from "styled-components";

export default function ModalContainer({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(128, 128, 128, 0.6);
  z-index: 9999;
`;
