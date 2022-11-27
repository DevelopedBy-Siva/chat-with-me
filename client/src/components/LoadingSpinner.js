import styled, { keyframes } from "styled-components";

export default function LoadingSpinner() {
  return <Container />;
}

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #909090;
  border-radius: 50%;
  animation: ${spinner} 1.5s linear infinite;
  margin: auto;
`;
