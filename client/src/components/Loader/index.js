import styled, { keyframes } from "styled-components";

export default function LoadingSpinner({ style = {} }) {
  return (
    <Container style={style}>
      <Spinner />
    </Container>
  );
}

const Container = styled.div`
  width: 22px;
  height: 22px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
`;

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.span`
  width: 100%;
  height: 100%;
  display: block;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #909090;
  border-radius: 50%;
  animation: ${spinner} 1.5s linear infinite;
`;
