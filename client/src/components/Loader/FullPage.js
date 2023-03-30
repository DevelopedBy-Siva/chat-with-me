import React from "react";
import styled from "styled-components";
import LoadingSpinner from ".";

export default function FullPage() {
  return (
    <Container>
      <LoadingSpinner style={{ width: "50px", height: "50px" }} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100dvh;
`;
