import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CgUnblock } from "react-icons/cg";

import { getAvatar } from "../../../assets/avatars";
import { sortContactsByAsc } from "../../../utils/InputHandler";

export default function BlockedContacts() {
  const { contacts = [] } = useSelector((state) => state.contacts);

  function filterContacts() {
    if (!contacts || contacts.length === 0) return [];
    const data = contacts.filter((val) => val.isBlocked);
    return sortContactsByAsc(data);
  }

  if (filterContacts().length === 0)
    return <NoContactsMsg>No blocked contacts found</NoContactsMsg>;

  return filterContacts().map((item, index) => {
    const { name, nickname, avatarId } = item;
    return (
      <ContactContainer key={index}>
        <ContactDetails>
          <ContactAvatarContainer>
            <ContactAvatar src={getAvatar(avatarId)} />
          </ContactAvatarContainer>
          <ContactNameContainer>
            <ContactName>{name}</ContactName>
            <ContactNickname>{nickname}</ContactNickname>
          </ContactNameContainer>
        </ContactDetails>
        <OptionBtnContainer>
          <OptionBtn>
            <CgUnblock title="Unblock" />
          </OptionBtn>
        </OptionBtnContainer>
      </ContactContainer>
    );
  });
}

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

const ContactAvatarContainer = styled.div`
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${(props) => props.theme.btn.active};

  @media (max-width: 484px) {
    width: 30px;
    height: 30px;
  }
`;

const ContactAvatar = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  user-select: none;
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
`;

const NoContactsMsg = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  text-align: center;
  line-height: 16px;
  margin-top: 10px;
`;