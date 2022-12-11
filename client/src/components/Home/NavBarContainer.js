import React from "react";
import styled from "styled-components";

export default function NavBarContainer() {
  return <Container></Container>;
}

const Container = styled.div`
  grid-area: navbar;
  background: ${(props) => props.theme.background.container};
`;
