import React from "react";
import styled from "styled-components";

export default function SideBar() {
  return <Container></Container>;
}

const Container = styled.div`
  width: 260px;
  background: ${(props) => props.theme.background.containerLight};
  overflow-y: auto;
`;