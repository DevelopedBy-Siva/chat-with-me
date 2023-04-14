import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";

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
                <FiPlus style={{ fontSize: "1rem", marginRight: "4px" }} />
                Create group
              </AddButton>
              {groups.length === 0 ? (
                <AlertMsg>No groups found</AlertMsg>
              ) : (
                <Content>
                  {groups.map((item, index) => {
                    const { name, icon, members } = item;
                    return (
                      <GroupContainer key={index}>
                        <GroupIcon bg={icon.background}>
                          {icon.letter}
                        </GroupIcon>
                        <GroupName>{name}</GroupName>
                        <MemberCount>
                          Members <br />
                          <b>{members.length + 1}</b>
                        </MemberCount>
                      </GroupContainer>
                    );
                  })}
                </Content>
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
  color: #fff;
  letter-spacing: 1px;
  height: 34px;
  background: #085ed4;
  transition: background 0.25s ease-in-out;

  :enabled:hover {
    background: #206ed8;
  }
`;

const GroupContainer = styled.div`
  cursor: auto;
  border-bottom: 1px solid ${(props) => props.theme.border.inputbox};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;

  &:last-of-type {
    border: none;
  }
`;

const GroupIcon = styled.span`
  width: 38px;
  height: 38px;
  background: ${(props) => props.bg};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.2rem;
  flex-shrink: 0;

  @media (max-width: 484px) {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }
`;

const GroupName = styled.span`
  display: block;
  text-transform: capitalize;
  color: ${(props) => props.theme.txt.sub};
  font-weight: 400;
  font-size: 0.8rem;
  margin-left: 10px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const MemberCount = styled.span`
  display: block;
  font-size: 0.6rem;
  text-align: center;
  color: ${(props) => props.theme.txt.sub};
  padding-left: 10px;
  line-height: 16px;

  b {
    font-weight: 500;
    font-size: 0.75rem;

    @media (max-width: 484px) {
      font-size: 0.7rem;
    }
  }
  @media (max-width: 484px) {
    font-size: 0.6rem;
  }
`;
