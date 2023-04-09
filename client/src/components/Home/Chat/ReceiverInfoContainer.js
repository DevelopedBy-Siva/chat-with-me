import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { MdDeleteForever, MdPersonOff, MdBlock } from "react-icons/md";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsFillPencilFill } from "react-icons/bs";

import { getAvatar } from "../../../assets/avatars";

const CONTAINER_WIDTH = "280px";
const options = [
  {
    id: "block-user",
    icon: <MdBlock />,
    placeholder: "Block user",
  },
  {
    id: "clear-user-chat",
    icon: <MdDeleteForever />,
    placeholder: "Clear chat",
  },
  {
    id: "unfriend-user",
    icon: <MdPersonOff />,
    placeholder: "Remove contact",
  },
];

export default function ReceiverInfoContainer({ infoVisible, setInfoVisible }) {
  return infoVisible && <InfoContainer setInfoVisible={setInfoVisible} />;
}

function InfoContainer({ setInfoVisible }) {
  const { active } = useSelector((state) => state.chats);
  const { contacts, groups } = useSelector((state) => state.contacts);

  function findContactInfo() {
    const { val, isPrivate } = active;
    if (isPrivate) {
      const index = contacts.findIndex((i) => i.chatId === val);
      return contacts[index];
    }
    const index = groups.findIndex((i) => i.chatId === val);
    return groups[index];
  }
  const { name, avatarId, description, nickname, isPrivate, icon } =
    findContactInfo();

  return (
    <UserInfoContainer
      initial={{ marginRight: `-${CONTAINER_WIDTH}` }}
      animate={{ marginRight: 0 }}
      exit={{ marginRight: `-${CONTAINER_WIDTH}` }}
    >
      <UserInfoCloseBtn onClick={() => setInfoVisible(false)}>
        <BiRightArrowAlt />
      </UserInfoCloseBtn>
      <UserInfoWrapper>
        <UserAvatarContainer bg={icon ? icon.background : null}>
          {isPrivate ? <UserAvatar src={getAvatar(avatarId)} /> : icon.letter}
        </UserAvatarContainer>
        <UserInfoName>{name}</UserInfoName>
        {nickname && nickname.length > 0 && (
          <NicknameContainer>
            <NicknameTitle>#nick&#32;</NicknameTitle>
            <Nickname>{nickname}</Nickname>
            <ChangeNicknameBtn>
              <BsFillPencilFill title="Change nickname" id="change-nickname" />
            </ChangeNicknameBtn>
          </NicknameContainer>
        )}
        <UserDescription>{description}</UserDescription>
        <UserOptionsWrapper>
          {options.map((op, index) => (
            <UserOperationBtn title={op.placeholder} id={op.id} key={index}>
              {op.icon}
            </UserOperationBtn>
          ))}
        </UserOptionsWrapper>
      </UserInfoWrapper>
    </UserInfoContainer>
  );
}

const UserInfoContainer = styled.div`
  width: ${CONTAINER_WIDTH};
  flex-shrink: 0;
  position: relative;
  z-index: 9;
  background-color: ${(props) => props.theme.bg.container};
`;

const UserInfoCloseBtn = styled.button`
  position: absolute;
  left: 8px;
  top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  color: ${(props) => props.theme.txt.main};
  border: none;
  outline: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transform: scale(1.2);
  z-index: 1;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: scale(1.3);
  }
`;

const UserInfoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.bg.app};
    border-radius: 4px;
  }
`;

const UserAvatarContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 100%;
  width: 130px;
  height: 130px;
  background-color: ${(props) =>
    props.bg ? props.bg : props.theme.btn.active};
  border-radius: 50%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 500;
  color: #fff;
  text-transform: capitalize;
`;

const UserAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfoName = styled.span`
  margin-top: 1.4rem;
  font-size: 1.2rem;
  width: 100%;
  display: block;
  color: ${(props) => props.theme.txt.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  text-align: center;
  font-weight: 400;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  width: 100%;
  color: ${(props) => props.theme.txt.sub};
  opacity: 1;
  margin-top: 5px;
`;

const Nickname = styled.span`
  display: block;
  font-size: 0.7rem;
  text-transform: capitalize;
  margin: 0 4px;
  color: ${(props) => props.theme.txt.main};
  font-weight: 400;
`;

const NicknameTitle = styled.span`
  display: block;
  text-transform: lowercase;
  font-size: 0.6rem;
  font-style: italic;
  font-weight: 400;
`;

const ChangeNicknameBtn = styled.button`
  font-size: 0.6rem;
  display: block;
  border: none;
  outline: none;
  background: none;
  color: ${(props) => props.theme.txt.main};
  cursor: pointer;
`;

const UserDescription = styled.span`
  display: block;
  font-size: 0.65rem;
  color: ${(props) => props.theme.txt.main};
  text-align: center;
  margin: 1.2rem 0;
  line-height: 15px;
`;

const UserOptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserOperationBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 8px;
  font-size: 1.4rem;
  border-radius: 5px;
  padding: 8px;
  outline: none;
  border: none;
  color: ${(props) => props.theme.txt.main};
  background-color: ${(props) => props.theme.btn.active};
  width: 56px;
  height: 56px;
  transition: font-size 0.3s ease-in-out;
  :hover {
    font-size: 1.2rem;
  }
`;
