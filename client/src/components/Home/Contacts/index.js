import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ImBlocked } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";

import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import Modal from "../Modal";
import LoadingSpinner from "../../Loader";
import MyContacts from "./MyContacts";
import BlockedContacts from "./BlockedContacts";
import AddContacts from "./AddContacts";
import NewContact from "./NewContact";

const navBtns = [
  {
    name: "My contacts",
    val: "contacts",
    icon: <FaUserFriends />,
  },
  {
    name: "Blocked",
    val: "blocked",
    icon: <ImBlocked />,
  },
  {
    name: "Add contact",
    val: "add_contacts",
    icon: <HiUserAdd />,
  },
];

const modalStyle = {
  maxWidth: "420px",
  maxHeight: "480px",
};

export default function Contacts() {
  const [activeBtn, setActiveBtn] = useState("contacts");

  const { loading, error } = useSelector((state) => state.contacts);

  const [addContactActive, setAddContactActive] = useState({
    active: false,
    item: null,
  });

  const closeSubModal = () =>
    setAddContactActive({ item: null, active: false });

  return (
    <React.Fragment>
      <Modal style={modalStyle}>
        <Container>
          <ModalHeaderWrapper>Contacts</ModalHeaderWrapper>
          <Nav>
            {navBtns.map((item, index) => (
              <ContentSwitchBtn
                title={item.name}
                className={activeBtn === item.val ? "active" : ""}
                key={index}
                onClick={() => setActiveBtn(item.val)}
              >
                {item.icon}
              </ContentSwitchBtn>
            ))}
          </Nav>
          <Content>
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMsg>Something went wrong. Please try again later.</ErrorMsg>
            ) : activeBtn === "contacts" ? (
              <MyContacts />
            ) : activeBtn === "blocked" ? (
              <BlockedContacts />
            ) : (
              <AddContacts setAddContactActive={setAddContactActive} />
            )}
          </Content>
        </Container>
      </Modal>

      {addContactActive.active && (
        <NewContact item={addContactActive.item} close={closeSubModal} />
      )}
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.ul`
  display: flex;
  border-radius: 8px;
  background: ${(props) => props.theme.border.inputbox};
  flex-shrink: 0;
  margin: 0.6rem;
`;

const ContentSwitchBtn = styled.li`
  list-style: none;
  width: 0;
  flex-grow: 1;
  text-align: center;
  background: none;
  color: ${(props) => props.theme.txt.sub};
  padding: 0.6rem;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 400;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background: ${(props) => props.theme.btn.selected};
    color: ${(props) => props.theme.txt.main};
  }
`;

const Content = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.6rem;
  min-height: 60px;
  position: relative;
`;

const ErrorMsg = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  text-align: center;
  line-height: 16px;
  margin-top: 10px;
`;
