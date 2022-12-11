import React from "react";
import styled from "styled-components";

export default function NavInfoContainer() {
  return <Container></Container>;
}

const Container = styled.div`
  grid-area: info;
  background: ${(props) => props.theme.background.containerLight};
`;
