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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
`;
