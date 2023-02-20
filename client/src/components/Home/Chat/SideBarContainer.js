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
  width: 300px;
  overflow-y: auto;
  background: ${(props) => props.theme.bg.container};
`;

const Heading = styled.h3`
  font-size: 1.4rem;
  text-align: left;
  color: ${(props) => props.theme.txt.main};
  font-weight: 500;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 1rem;
`;
