import React from "react";
import styled from "styled-components";

export default function SideBar() {
  return (
    <Container>
      <Heading>Messages</Heading>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  width: 300px;
  overflow-y: auto;
  border-right: 1px solid ${(props) => props.theme.border.inputbox};
`;

const Heading = styled.h3`
  font-size: 1.4rem;
  text-align: left;
  color: ${(props) => props.theme.txt.main};
  font-weight: 500;
`;
