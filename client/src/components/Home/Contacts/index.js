import React, { useState } from "react";
import styled from "styled-components";
import { ImBlocked } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { MdPersonOff, MdBlock } from "react-icons/md";
import { useSelector } from "react-redux";

import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import { getAvatar } from "../../../assets/avatars";
import Modal from "../Modal";
import LoadingSpinner from "../../Loader";

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
];

const modalStyle = {
  maxWidth: "420px",
  height: "auto",
  maxHeight: "480px",
};

export default function Contacts() {
  const [activeBtn, setActiveBtn] = useState("contacts");

  const {
    contacts = [],
    loading,
    error,
  } = useSelector((state) => state.contacts);

  return (
    <Modal style={modalStyle}>
      <Container>
        <ModalHeaderWrapper>Contacts</ModalHeaderWrapper>
        <Nav>
          {navBtns.map((item, index) => (
            <ContentSwitchBtn
              className={activeBtn === item.val ? "active" : ""}
              key={index}
              onClick={() => setActiveBtn(item.val)}
            >
              {item.icon}
              <NavBtnName>{item.name}</NavBtnName>
            </ContentSwitchBtn>
          ))}
        </Nav>
        <Content>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMsg>Something went wrong. Please try again later.</ErrorMsg>
          ) : contacts && contacts.length === 0 ? (
            <ErrorMsg>No contacts found</ErrorMsg>
          ) : (
            contacts.map((item, index) => {
              const { name, nickname, avatarId, isPrivate } = item;
              return !isPrivate ? (
                ""
              ) : (
                <ContactContainer key={index}>
                  <ContactDetails>
                    <ContactAvatar src={getAvatar(avatarId)} />
                    <ContactNameContainer>
                      <ContactName>{name}</ContactName>
                      <ContactNickname>{nickname}</ContactNickname>
                    </ContactNameContainer>
                  </ContactDetails>
                  <OptionBtnContainer>
                    <OptionBtn>
                      <MdBlock title="Block contact" />
                    </OptionBtn>
                    <OptionBtn>
                      <MdPersonOff title="Remove contact" />
                    </OptionBtn>
                  </OptionBtnContainer>
                </ContactContainer>
              );
            })
          )}
        </Content>
      </Container>
    </Modal>
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
  margin: 8px 0;
`;

const ContentSwitchBtn = styled.li`
  list-style: none;
  flex: 0.5;
  text-align: center;
  background: none;
  color: ${(props) => props.theme.txt.sub};
  padding: 0.6rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 400;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background: ${(props) => props.theme.btn.active};
    color: ${(props) => props.theme.txt.main};
  }
`;

const NavBtnName = styled.span`
  display: block;
  font-size: 0.8rem;
  margin-left: 8px;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const Content = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.6rem;
  min-height: 60px;
  position: relative;
`;

const ContactContainer = styled.div`
  padding: 1.2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.border.inputbox};
  display: flex;
  align-items: center;
  flex-direction: row;

  &:last-of-type {
    border: none;
  }
`;

const ContactDetails = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;

  &:first-of-type {
    margin-right: 10px;
  }
`;

const ContactAvatar = styled.img`
  object-fit: cover;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  user-select: none;
  flex-shrink: 0;

  @media (max-width: 484px) {
    width: 30px;
    height: 30px;
  }
`;

const ContactNameContainer = styled.div`
  margin-left: 15px;
  overflow: hidden;

  @media (max-width: 484px) {
    margin-left: 10px;
  }
`;

const ContactName = styled.span`
  font-size: 0.8rem;
  display: block;
  text-transform: capitalize;
  margin-bottom: 4px;
  letter-spacing: 1px;
  color: ${(props) => props.theme.txt.sub};
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const ContactNickname = styled.span`
  display: block;
  font-size: 0.7rem;
  text-transform: capitalize;
  color: ${(props) => props.theme.txt.sub};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ::before {
    content: "#";
  }

  @media (max-width: 484px) {
    font-size: 0.6rem;
  }
`;

const OptionBtnContainer = styled.div`
  flex-shrink: 0;
`;

const OptionBtn = styled.button`
  display: inline-block;
  font-size: 1.2rem;
  background: none;
  border: none;
  outline: none;
  color: ${(props) => props.theme.txt.sub};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.txt.main};
  }

  :disabled {
    cursor: progress;
  }

  :first-of-type {
    margin-right: 15px;
  }

  @media (max-width: 484px) {
    font-size: 1rem;
  }
`;

const ErrorMsg = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  text-align: center;
  line-height: 16px;
  margin-top: 10px;
`;
