import React from "react";
import styled from "styled-components";

export default function ChatViewContainer() {
  return <Container></Container>;
}

const Container = styled.div`
  grid-area: view;
  background: ${(props) => props.theme.background.container};
`;
