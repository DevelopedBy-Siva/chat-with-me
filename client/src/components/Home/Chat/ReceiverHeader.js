import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { CgDetailsMore } from "react-icons/cg";

import { getAvatar } from "../../../assets/avatars";

export default function ReceiverHeader({
  contactId,
  infoVisible,
  setInfoVisible,
}) {
  return (
    <Container>
      <ReceiverContainer contactId={contactId} />
      {!infoVisible && (
        <ReceiverInfoBtn onClick={() => setInfoVisible(true)}>
          <CgDetailsMore />
        </ReceiverInfoBtn>
      )}
    </Container>
  );
}

function ReceiverContainer({ contactId }) {
  const { contacts, groups } = useSelector((state) => state.contacts);

  function findContactInfo() {
    const { val, isPrivate } = contactId;
    if (isPrivate) {
      const index = contacts.findIndex((i) => i.chatId === val);
      return contacts[index];
    }
    const index = groups.findIndex((i) => i.chatId === val);
    return groups[index];
  }

  const { isOnline, name, nickname, avatarId, isPrivate, icon } =
    findContactInfo();

  return (
    <Receiver>
      <ReceiverAvatarContainer bg={icon ? icon.background : null}>
        {isPrivate ? <ReceiverAvatar src={getAvatar(avatarId)} /> : icon.letter}
      </ReceiverAvatarContainer>
      <ReceiverInfo>
        <ReceiverName>
          {nickname && nickname.length > 0 ? nickname : name}
        </ReceiverName>
        {isPrivate ? (
          <ReceiverStatus>{isOnline ? "online" : "offline"}</ReceiverStatus>
        ) : (
          ""
        )}
      </ReceiverInfo>
    </Receiver>
  );
}

const Container = styled.div`
  height: 70px;
  flex-shrink: 0;
  padding: 0.5rem 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.bg.app};
  z-index: 1;
`;

const Receiver = styled.div`
  margin-right: 0.4rem;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`;

const ReceiverAvatarContainer = styled.div`
  border-radius: 50%;
  height: 44px;
  width: 44px;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: capitalize;
  color: #fff;
  background-color: ${(props) =>
    props.bg ? props.bg : props.theme.btn.active};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReceiverAvatar = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const ReceiverInfo = styled.div`
  margin-left: 1rem;
  min-width: 0;
  width: 90%;
`;

const ReceiverName = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  font-size: 0.9rem;
  font-weight: 400;
`;

const ReceiverStatus = styled.span`
  font-size: 0.7rem;
  display: block;
  color: ${(props) => props.theme.txt.sub};
  text-transform: lowercase;
  margin-top: 2px;
`;

const ReceiverInfoBtn = styled.button`
  position: relative;
  display: block;
  outline: none;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.txt.main};
  font-size: 1.4rem;
`;
