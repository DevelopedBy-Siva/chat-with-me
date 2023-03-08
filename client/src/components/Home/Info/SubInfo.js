import React from "react";
import styled from "styled-components";
import { GoInfo } from "react-icons/go";

export default function SubInfo({ children }) {
  return (
    <Container>
      <Heading>
        <GoInfo style={{ marginRight: "6px" }} /> Note
      </Heading>
      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  margin: 20px 0 5px 0;
  background-image: linear-gradient(
    rgba(56, 139, 253, 0.15),
    rgba(56, 139, 253, 0.15)
  );
  padding: 14px;
  border-radius: 5px;
  border: 1px solid rgba(56, 139, 253, 0.4);
`;

const Heading = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 5px;
  color: rgb(56, 139, 253);
`;

const Content = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.main};
  line-height: 1.2rem;
`;
