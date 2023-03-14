import React from "react";
import styled from "styled-components";

import Modal from "../Modal";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";

const modalStyle = {
  maxWidth: "760px",
  maxHeight: "572px",
};

export default function MySelf() {
  return (
    <Modal style={modalStyle}>
      <ModalHeaderWrapper>Profile</ModalHeaderWrapper>
      <Container></Container>
    </Modal>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
