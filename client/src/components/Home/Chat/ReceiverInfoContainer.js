import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { MdPersonOff, MdBlock, MdDeleteForever } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { IoExitOutline } from "react-icons/io5";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsFillPencilFill } from "react-icons/bs";

import { getAvatar } from "../../../assets/avatars";
import axios from "../../../api/axios";
import toast from "../../Toast";
import Modal from "../Modal/SubModal";

const CONTAINER_WIDTH = "280px";
const options = [
  {
    id: "block-user",
    icon: <MdBlock />,
    placeholder: "Block user",
  },
  {
    id: "remove-user",
    icon: <MdPersonOff />,
    placeholder: "Remove contact",
  },
];

const groupOptions = [
  {
    id: "leave-group",
    icon: <IoExitOutline />,
    placeholder: "Leave group",
  },
  {
    id: "delete-group",
    icon: <MdDeleteForever />,
    placeholder: "Delete group",
    onlyAdmin: true,
  },
];

export default function ReceiverInfoContainer({ infoVisible, setInfoVisible }) {
  return infoVisible && <InfoContainer setInfoVisible={setInfoVisible} />;
}

function InfoContainer({ setInfoVisible }) {
  const { active } = useSelector((state) => state.chats);
  const { contacts, groups } = useSelector((state) => state.contacts);
  const { details } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    toDo: null,
  });

  function findContactInfo() {
    const { val, isPrivate } = active;
    if (isPrivate) {
      const index = contacts.findIndex((i) => i.chatId === val);
      return contacts[index];
    }
    const index = groups.findIndex((i) => i.chatId === val);
    const data = groups[index];
    return { ...data, members: [...data.members, { ...details }] };
  }
  const {
    name,
    avatarId,
    description,
    nickname,
    isPrivate,
    icon,
    admin,
    members = [],
  } = findContactInfo();

  function getOptions() {
    if (isPrivate) return options;

    if (admin !== details.email)
      return groupOptions.filter((i) => !i.onlyAdmin);
    return groupOptions;
  }

  async function executeOperations(type) {
    setIsLoading(true);
    switch (type) {
      case "leave-group":
        await axios
          .put("groupId")
          .then(() => {})
          .catch(() => {});
        break;
      case "delete-group":
        await axios
          .delete("groupId")
          .then(() => {})
          .catch(() => {});
        break;
      case "block-user":
        await axios
          .put("user email")
          .then(() => {})
          .catch(() => {});
        break;
      case "remove-user":
        await axios
          .delete("user email")
          .then(() => {})
          .catch(() => {});
        break;
      default:
        break;
    }
  }

  function handleModal(show = false, toDo = null) {
    if (isLoading) return;
    setShowModal({ show, toDo });
  }

  return (
    <React.Fragment>
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
                <BsFillPencilFill
                  title="Change nickname"
                  id="change-nickname"
                />
              </ChangeNicknameBtn>
            </NicknameContainer>
          )}
          <UserDescription>{description}</UserDescription>
          <UserOptionsWrapper>
            {getOptions().map((op, index) => (
              <UserOperationBtn
                onClick={() => handleModal(true, op.id)}
                title={op.placeholder}
                id={op.id}
                key={index}
              >
                {op.icon}
              </UserOperationBtn>
            ))}
          </UserOptionsWrapper>
          {!isPrivate && (
            <UserMembersContainer>
              <MembersLabel>Members ({members.length})</MembersLabel>
              <MembersWrapper>
                {members.map((item, index) => (
                  <Members key={index}>
                    <ItemAvatarContainer>
                      <ItemAvatar src={getAvatar(item.avatarId)} />
                    </ItemAvatarContainer>
                    <ItemDetails>
                      <ItemName>
                        {item.nickname ? item.nickname : item.name}
                      </ItemName>
                      {admin === item.email && <IsAdmin>admin</IsAdmin>}
                    </ItemDetails>
                    {admin !== item.email && (
                      <RemoveMember>
                        <TiUserDelete />
                      </RemoveMember>
                    )}
                  </Members>
                ))}
              </MembersWrapper>
            </UserMembersContainer>
          )}
        </UserInfoWrapper>
      </UserInfoContainer>
      {showModal.show && (
        <OperationConfirmationContainer
          isLoading={isLoading}
          handleModal={handleModal}
          toDo={showModal.toDo}
          execute={executeOperations}
        />
      )}
    </React.Fragment>
  );
}

const modalStyle = {
  maxWidth: "500px",
  height: "auto",
};

function OperationConfirmationContainer({
  isLoading,
  handleModal,
  toDo,
  execute,
}) {
  function getConfirmationTitle() {
    let response = "Are you sure you want to ";
    switch (toDo) {
      case "leave-group":
        response += "leave the group?";
        break;
      case "delete-group":
        response += "delete the group?";
        break;
      case "block-user":
        response += "block the contact?";
        break;
      case "remove-user":
        response += "remove the contact?";
        break;
      default:
        break;
    }
    return response;
  }
  return (
    <Modal style={modalStyle} inactive={isLoading} close={handleModal}>
      <ConfirmationContainer>
        <ConfirmationLabel>{getConfirmationTitle()}</ConfirmationLabel>
        <ConfirmationBtnContainer>
          <ConfimrBtn onClick={() => execute(toDo)} disabled={isLoading}>
            Yes
          </ConfimrBtn>
          <ConfimrBtn onClick={() => handleModal()} disabled={isLoading}>
            No
          </ConfimrBtn>
        </ConfirmationBtnContainer>
      </ConfirmationContainer>
    </Modal>
  );
}

const ConfirmationContainer = styled.div``;

const ConfirmationLabel = styled.p`
  color: ${(props) => props.theme.txt.main};
  font-size: 0.8rem;
  text-align: center;
`;

const ConfirmationBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const ConfimrBtn = styled.button`
  margin: 4px;
  display: block;
  width: 60px;
  padding: 4px;
  font-size: 0.7rem;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  background: ${(props) => props.theme.btn.active};
  color: ${(props) => props.theme.txt.main};
  border: 1px solid ${(props) => props.theme.btn.active};

  &:enabled:hover {
    border: 1px solid ${(props) => props.theme.txt.main};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:first-of-type:disabled {
    cursor: wait;
  }
`;

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
  flex-shrink: 0;
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

const UserMembersContainer = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const MembersLabel = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;
  text-align: left;
  margin-bottom: 12px;
  padding: 0.6rem;
`;

const MembersWrapper = styled.ul`
  list-style: none;
  display: block;
  width: 100%;
`;

const RemoveMember = styled.button`
  flex-shrink: 0;
  color: ${(props) => props.theme.txt.main};
  margin-left: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
  display: none;
  align-items: center;
  justify-content: center;
`;

const Members = styled.li`
  padding: 0.6rem;
  display: flex;
  align-items: center;
  cursor: default;
  overflow: hidden;
  border-radius: 4px;
  transition: all 0.1s ease-in-out;

  :hover {
    background: ${(props) => props.theme.btn.active};
  }

  :hover ${RemoveMember} {
    display: flex;
  }
`;

const ItemAvatarContainer = styled.div`
  width: 35px;
  height: 35px;
  flex-shrink: 0;
`;

const ItemAvatar = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ItemName = styled.span`
  display: block;
  text-transform: capitalize;
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemDetails = styled.div`
  flex: 1;
  overflow: hidden;
  margin-left: 10px;
`;

const IsAdmin = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.7rem;
`;
