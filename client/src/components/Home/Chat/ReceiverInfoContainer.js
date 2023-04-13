import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { MdPersonOff, MdBlock, MdDeleteForever } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { IoExitOutline } from "react-icons/io5";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsFillPencilFill } from "react-icons/bs";

import axios from "../../../api/axios";
import toast from "../../Toast";
import Modal from "../Modal/SubModal";
import retrieveError from "../../../api/ExceptionHandler";
import LoadingSpinner from "../../Loader";
import { getAvatar } from "../../../assets/avatars";
import { setActive } from "../../../store/actions/ChatActions";
import {
  blockUserContact,
  changeContactNickname,
  deleteUserContact,
  removeUserGroup,
} from "../../../store/actions/ContactActions";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import { nicknameValidation } from "../../../utils/InputHandler";

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
  return (
    <AnimatePresence>
      {infoVisible && <InfoContainer setInfoVisible={setInfoVisible} />}
    </AnimatePresence>
  );
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
  const [changeNickname, setChangeNickname] = useState({
    val: "",
    show: false,
    error: null,
  });

  const dispatch = useDispatch();

  function findContactInfo() {
    const { val, isPrivate } = active;
    if (isPrivate) {
      const index = contacts.findIndex((i) => i.chatId === val);
      const data = contacts[index];
      return data;
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
    chatId,
    email,
    members = [],
  } = findContactInfo();

  useEffect(() => {
    setChangeNickname({
      show: false,
      val: nickname,
      error: null,
    });
  }, [nickname]);

  function getOptions() {
    if (isPrivate) return options;

    if (admin !== details.email)
      return groupOptions.filter((i) => !i.onlyAdmin);
    return groupOptions;
  }

  async function executeOperations(type) {
    setIsLoading(true);
    try {
      switch (type) {
        case "leave-group":
          await axios.put(`/chat/leave/${chatId}`).then(() => {
            dispatch(setActive(null, true));
            dispatch(removeUserGroup(chatId));
            toast.success("Left group successfully");
          });
          break;
        case "delete-group":
          await axios.delete(`/chat/${chatId}`).then(() => {
            dispatch(setActive(null, true));
            dispatch(removeUserGroup(chatId));
            toast.success("Group removed successfully");
          });

          break;
        case "block-user":
          await axios.put(`/user/block?email=${email}`).then(() => {
            dispatch(setActive(null, true));
            dispatch(blockUserContact(email));
            toast.success("Contact blocked successfully");
          });

          break;
        case "remove-user":
          await axios.delete(`/user/contact?email=${email}`).then(() => {
            dispatch(setActive(null, true));
            dispatch(deleteUserContact(email));
            toast.success("Contact removed successfully");
          });

          break;
        default:
          break;
      }
    } catch (error) {
      const { message } = retrieveError(error);
      setShowModal({ show: false, toDo: null });
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleModal(show = false, toDo = null) {
    if (isLoading) return;
    setShowModal({ show, toDo });
  }

  function handleNicknameModal(show = false) {
    if (isLoading) return;
    setChangeNickname({ ...changeNickname, show });
  }

  function handleNicknameChange(e) {
    const value = e.target.value;
    const { message } = nicknameValidation(value, contacts);
    setChangeNickname({ ...changeNickname, val: value, error: message });
  }

  async function updateNickname() {
    if (isLoading || changeNickname.error) return;

    const newNickname = changeNickname.val.toLowerCase();
    if (newNickname === nickname)
      return setChangeNickname({ ...changeNickname, show: false });

    setIsLoading(true);
    await axios
      .put(`/user/contact/nickname?email=${email}&nickname=${newNickname}`)
      .then(() => {
        setChangeNickname({ ...changeNickname, show: false });
        dispatch(changeContactNickname({ email, nickname: newNickname }));
        toast.success("Nickname updated successfully");
      })
      .catch((error) => {
        const { message } = retrieveError(error);
        toast.error(message, toast.props.user.nonPersist);
      });
    setIsLoading(false);
  }

  const isScreenSmall = window.innerWidth <= 920;

  return (
    <React.Fragment>
      <UserInfoContainer
        initial={{
          marginRight: isScreenSmall ? 0 : `-${CONTAINER_WIDTH}`,
          transform: isScreenSmall ? "translateX(100%)" : "none",
        }}
        animate={{
          marginRight: 0,
          transform: isScreenSmall ? "translateX(0)" : "none",
        }}
        exit={{
          marginRight: isScreenSmall ? 0 : `-${CONTAINER_WIDTH}`,
          transform: isScreenSmall ? "translateX(100%)" : "none",
        }}
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
              <ChangeNicknameBtn onClick={() => handleNicknameModal(true)}>
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
                        <TiUserDelete style={{ opacity: 0.8 }} />
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
      {changeNickname.show && (
        <ChangeNicknameContainer
          isLoading={isLoading}
          nickname={changeNickname.val}
          handleNicknameModal={handleNicknameModal}
          name={name}
          handleNicknameChange={handleNicknameChange}
          error={changeNickname.error}
          updateNickname={updateNickname}
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
            {isLoading ? (
              <LoadingSpinner style={{ width: "14px", height: "14px" }} />
            ) : (
              "Yes"
            )}
          </ConfimrBtn>
          <ConfimrBtn onClick={() => handleModal()} disabled={isLoading}>
            No
          </ConfimrBtn>
        </ConfirmationBtnContainer>
      </ConfirmationContainer>
    </Modal>
  );
}

const nicknameModalStyle = {
  maxWidth: "420px",
  maxHeight: "230px",
};
function ChangeNicknameContainer({
  name,
  isLoading,
  handleNicknameModal,
  nickname,
  handleNicknameChange,
  error,
  updateNickname,
}) {
  return (
    <Modal
      inactive={isLoading}
      style={nicknameModalStyle}
      close={handleNicknameModal}
    >
      <ChangeNicknameModalContainer>
        <ModalHeaderWrapper>Change nickname</ModalHeaderWrapper>
        <ChangeNicknamModalWrapper>
          <ChangeNicknamModalLabel>{name}'s nickname:</ChangeNicknamModalLabel>
          <ChangeNicknameModalInputWrapper>
            <ChangeNicknameModalInput
              value={nickname}
              name="nickname"
              type="text"
              spellCheck={false}
              autoComplete="off"
              disabled={isLoading}
              placeholder="Enter the nickname"
              onChange={handleNicknameChange}
            />
            <ChangeNicknamModalError>{error}</ChangeNicknamModalError>
          </ChangeNicknameModalInputWrapper>
          <ChangeNicknamModalBtn
            onClick={updateNickname}
            disabled={isLoading || error}
          >
            {isLoading ? (
              <LoadingSpinner style={{ width: "14px", height: "14px" }} />
            ) : (
              "Change"
            )}
          </ChangeNicknamModalBtn>
        </ChangeNicknamModalWrapper>
      </ChangeNicknameModalContainer>
    </Modal>
  );
}

const ChangeNicknamModalWrapper = styled.div`
  flex: 1;
  padding: 0.6rem;
  overflow-y: auto;
`;

const ChangeNicknameModalInputWrapper = styled.div`
  display: block;
  width: 100%;
  min-height: 50px;
`;

const ChangeNicknamModalError = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.danger};
  margin-top: 5px;
`;

const ChangeNicknamModalBtn = styled.button`
  display: block;
  width: 70px;
  height: 24px;
  margin: auto;
  margin-top: 8px;
  background: #085ed4;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.7rem;
  position: relative;
  cursor: pointer;

  :enabled:hover {
    background: #206ed8;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const ChangeNicknamModalLabel = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.sub};
  ::first-letter {
    text-transform: capitalize;
  }
`;

const ChangeNicknameModalInput = styled.input`
  display: block;
  width: 100%;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  background: none;
  margin-top: 6px;
  padding: 6px 4px;
  color: ${(props) => props.theme.txt.main};
  border-radius: 4px;
  outline: none;
  font-size: 0.8rem;
`;

const ChangeNicknameModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ConfirmationContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.6rem;
  padding-bottom: 0;
`;

const ConfirmationLabel = styled.p`
  color: ${(props) => props.theme.txt.main};
  font-size: 0.8rem;
  text-align: center;
`;

const ConfirmationBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
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
  position: relative;

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

const UserInfoContainer = styled(motion.div)`
  width: ${CONTAINER_WIDTH};
  flex-shrink: 0;
  position: relative;
  z-index: 9;
  background-color: ${(props) => props.theme.bg.container};

  @media (max-width: 920px) {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
  }
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
