import React from "react";
import styled from "styled-components";

import Modal from "../Modal";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";

const modalStyle = {
  maxWidth: "420px",
  maxHeight: "480px",
};

export default function Group() {
  return (
    <Modal style={modalStyle}>
      <ModalHeaderWrapper>Groups</ModalHeaderWrapper>
      <Container></Container>
    </Modal>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
