import React from "react";
import styled from "styled-components";

import Modal from "../Modal";

const modalStyle = {
  maxWidth: "380px",
  maxHeight: "200px",
};

export default function OneTimeInfo() {
  return (
    <Modal style={modalStyle}>
      <Container>a</Container>
    </Modal>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
