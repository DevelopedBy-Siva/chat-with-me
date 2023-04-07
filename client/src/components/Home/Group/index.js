import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

import Modal from "../Modal";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import LoadingSpinner from "../../Loader";
import AddGroup from "./AddGroup";

const modalStyle = {
  maxWidth: "420px",
  maxHeight: "480px",
};

export default function Group() {
  const {
    loading,
    error,
    groups = [],
  } = useSelector((state) => state.contacts);

  const [modalActive, setModalActive] = useState(false);

  const closeModal = () => setModalActive(false);

  return (
    <React.Fragment>
      <Modal style={modalStyle}>
        <Container>
          <ModalHeaderWrapper>Groups</ModalHeaderWrapper>
          {loading ? (
            <LoadingSpinner style={{ top: "30px", opacity: "0.7" }} />
          ) : error ? (
            <AlertMsg>Something went wrong. Please try again later.</AlertMsg>
          ) : (
            <React.Fragment>
              <AddButton onClick={() => setModalActive(true)}>
                <AiOutlinePlus style={{ marginRight: "4px" }} />
                Create group
              </AddButton>
              {groups.length === 0 ? (
                <AlertMsg>No groups found</AlertMsg>
              ) : (
                <Content></Content>
              )}
            </React.Fragment>
          )}
        </Container>
      </Modal>
      {modalActive && <AddGroup close={closeModal} />}
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Content = styled.div`
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: 0.6rem;
  padding-top: 0;
`;

const AlertMsg = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  text-align: center;
  line-height: 16px;
  padding: 0.6rem;
`;

const AddButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  margin: 0.6rem;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  background: rgba(45, 157, 65, 0.8);
  color: ${(props) => props.theme.txt.main};
  letter-spacing: 1px;
  height: 32px;

  :hover {
    background: rgba(45, 157, 65, 1);
  }
`;
