import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CgDetailsMore } from "react-icons/cg";
import { IoArrowBack } from "react-icons/io5";

import { getAvatar } from "../../../assets/avatars";
import { toggle_BW_Chats } from "../../../utils/Screens";
import { setActive } from "../../../store/actions/ChatActions";

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
  const { contacts, groups, isOnline } = useSelector((state) => state.contacts);

  const dispatch = useDispatch();

  function findContactInfo() {
    const { val, isPrivate } = contactId;
    if (isPrivate) {
      const index = contacts.findIndex((i) => i.chatId === val);
      return contacts[index];
    }
    const index = groups.findIndex((i) => i.chatId === val);
    return groups[index];
  }

  function goBack() {
    toggle_BW_Chats(true);
    setTimeout(() => {
      dispatch(setActive(null));
    }, 500);
  }

  function isContactOnline(id) {
    const index = isOnline.findIndex((i) => i === id);
    return index === -1 ? false : true;
  }

  const { _id, name, nickname, avatarId, isPrivate, icon } = findContactInfo();

  return (
    <Receiver>
      <ReceiverBackBtn onClick={goBack}>
        <IoArrowBack />
      </ReceiverBackBtn>
      <ReceiverAvatarContainer bg={icon ? icon.background : null}>
        {isPrivate ? <ReceiverAvatar src={getAvatar(avatarId)} /> : icon.letter}
      </ReceiverAvatarContainer>
      <ReceiverInfo>
        <ReceiverName>
          {nickname && nickname.length > 0 ? nickname : name}
        </ReceiverName>
        {isPrivate ? (
          <ReceiverStatus>
            {isContactOnline(_id) ? "online" : "offline"}
          </ReceiverStatus>
        ) : (
          ""
        )}
      </ReceiverInfo>
    </Receiver>
  );
}

const ReceiverBackBtn = styled.button`
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.txt.main};
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-right: 10px;
  display: none;

  @media (max-width: 920px) {
    display: flex;
  }
`;

const Container = styled.div`
  height: 70px;
  flex-shrink: 0;
  padding: 0.5rem 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.bg.app};
  z-index: 1;

  @media (max-width: 920px) {
    padding: 0.5rem 1rem;
  }
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
  height: 38px;
  width: 38px;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: capitalize;
  color: #fff;
  background-color: ${(props) =>
    props.bg ? props.bg : props.theme.btn.active};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  margin-right: 14px;
  flex-shrink: 0;
  pointer-events: none;

  @media (max-width: 920px) {
    height: 38px;
    width: 38px;
  }
`;

const ReceiverAvatar = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const ReceiverInfo = styled.div`
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

  @media (max-width: 920px) {
    font-size: 0.8rem;
  }
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

  @media (max-width: 920px) {
    font-size: 1.3rem;
  }
`;
