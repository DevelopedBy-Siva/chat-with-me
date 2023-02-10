import React from "react";
import styled from "styled-components";

export default function SideBar() {
  return (
    <Container>
      <Heading>Message Center</Heading>
    </Container>
  );
}

const Container = styled.div`
  width: 340px;
  overflow-y: auto;
  border-right: 1px solid ${(props) => props.theme.border.inputbox};
`;

const Heading = styled.h3`
  font-size: 1.4rem;
  text-align: center;
  padding: 1rem 0.2rem;
  color: ${(props) => props.theme.txt.main};
  font-weight: 500;
`;
