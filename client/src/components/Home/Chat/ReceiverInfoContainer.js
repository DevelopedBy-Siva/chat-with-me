import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { MdPersonOff, MdBlock, MdDeleteForever } from "react-icons/md";
import { IoExitOutline, IoAddOutline, IoClose } from "react-icons/io5";
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
  addContactToGroup,
  blockUserContact,
  changeContactNickname,
  deleteUserContact,
  kickContactFromGroup,
  removeUserGroup,
} from "../../../store/actions/ContactActions";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import {
  getContactNickname,
  nicknameValidation,
} from "../../../utils/InputHandler";

const CONTAINER_WIDTH = "280px";
const options = [
  {
    id: "block-user",
    icon: <MdBlock className="icon" />,
    placeholder: "Block user",
  },
  {
    id: "remove-user",
    icon: <MdPersonOff className="icon" />,
    placeholder: "Remove contact",
  },
];

const groupOptions = [
  {
    id: "add-to-group",
    icon: <IoAddOutline className="icon" />,
    placeholder: "Add member",
    isModal: true,
  },
  {
    id: "leave-group",
    icon: <IoExitOutline className="icon" />,
    placeholder: "Leave group",
  },
  {
    id: "delete-group",
    icon: <MdDeleteForever className="icon" />,
    placeholder: "Delete group",
    onlyAdmin: true,
  },
];

export default function ReceiverInfoContainer({ infoVisible, setInfoVisible }) {
  const { active } = useSelector((state) => state.chats);

  return (
    <AnimatePresence key={active.val}>
      {infoVisible && (
        <InfoContainer setInfoVisible={setInfoVisible} active={active} />
      )}
    </AnimatePresence>
  );
}

function InfoContainer({ setInfoVisible, active }) {
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
  const [addMember, setAddMember] = useState(false);
  const [kickMember, setKickMember] = useState({
    loading: false,
    item: null,
    show: false,
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
            toast.success("Left the group successfully");
          });
          break;
        case "delete-group":
          await axios.delete(`/chat/${chatId}`).then(() => {
            dispatch(setActive(null, true));
            dispatch(removeUserGroup(chatId));
            toast.success("Group the removed successfully");
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
    if (isLoading || kickMember.loading) return;
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

  function handleAddMemberToggle(val = false) {
    if (isLoading || kickMember.loading) return;
    setAddMember(val);
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
                onClick={() =>
                  op.isModal
                    ? handleAddMemberToggle(true)
                    : handleModal(true, op.id)
                }
                title={op.placeholder}
                id={op.id}
                key={index}
                disabled={isLoading || kickMember.loading}
              >
                {op.icon}
              </UserOperationBtn>
            ))}
          </UserOptionsWrapper>
          {!isPrivate && (
            <UserMembersContainer>
              <MembersLabel>Members ({members.length})</MembersLabel>
              <MembersWrapper>
                {members.map((item, index) => {
                  const contactName = getContactNickname(contacts, item.email);
                  return (
                    <GroupMemberDetails
                      admin={admin}
                      contactName={contactName}
                      details={details}
                      item={item}
                      key={index}
                      kickMember={kickMember}
                      setKickMember={setKickMember}
                    />
                  );
                })}
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
      {addMember && (
        <AddNewMembers
          isLoading={isLoading}
          handleAddMemberToggle={handleAddMemberToggle}
          contacts={contacts}
          active={active}
          groups={groups}
          setIsLoading={setIsLoading}
        />
      )}
      {kickMember.show && (
        <ConfirmMemberKick
          kickMember={kickMember}
          setKickMember={setKickMember}
          groups={groups}
          chatId={active.val}
        />
      )}
    </React.Fragment>
  );
}

function GroupMemberDetails({
  item,
  contactName,
  admin,
  details,
  kickMember,
  setKickMember,
}) {
  function kickMemberFromGroup(email) {
    setKickMember({ ...kickMember, show: true, item: email });
  }

  const showLoading = kickMember.loading && kickMember.item === item.email;
  const name = contactName ? contactName : item.name;
  return (
    <Members>
      <ItemAvatarContainer>
        <ItemAvatar src={getAvatar(item.avatarId)} />
      </ItemAvatarContainer>
      <ItemDetails>
        <ItemName>{name}</ItemName>
        {admin === item.email && <IsAdmin>admin</IsAdmin>}
      </ItemDetails>
      {admin === details.email && item.email !== details.email && (
        <RemoveMember
          className={showLoading ? "loading" : ""}
          disabled={kickMember.loading}
        >
          {showLoading ? (
            <LoadingSpinner style={{ width: "14px", height: "14px" }} />
          ) : (
            <IoClose
              onClick={() => kickMemberFromGroup(item.email)}
              className="icon"
            />
          )}
        </RemoveMember>
      )}
    </Members>
  );
}

const confirmMemberKickModalStyle = {
  maxWidth: "500px",
  height: "auto",
};
function ConfirmMemberKick({ groups, chatId, kickMember, setKickMember }) {
  const dispatch = useDispatch();
  function getTitle() {
    let response = {
      deleteGroup: false,
      msg: "Are you sure?",
    };
    const index = groups.findIndex((i) => i.chatId === chatId);
    if (index === -1) return response;
    const count = groups[index].members.length;
    if (count <= 2) {
      response.deleteGroup = true;
      response.msg =
        "As the group contains less than or equal to 3 members, group will be removed when you kick this member. Do you still wish to continue?";
      return response;
    }
    response.msg = "Are you sure you want to kick this member?";
    return response;
  }

  function handleClose() {
    setKickMember({ ...kickMember, show: false, item: null });
  }

  const { msg, deleteGroup } = getTitle();

  async function kickMemberFromGroup() {
    if (kickMember.loading) return;
    const contact = kickMember.item;
    setKickMember({ ...kickMember, loading: true, show: false });
    await axios
      .put(`/chat/kick/${chatId}?contact=${contact}`)
      .then(() => {
        if (deleteGroup) {
          dispatch(setActive(null, true));
          dispatch(removeUserGroup(chatId));
          toast.success("Group removed successfully");
        } else {
          dispatch(kickContactFromGroup(chatId, contact));
          toast.success("Contact removed successfully");
        }
      })
      .catch(() => {
        toast.error("Something went wrong. Failed to remove the contact");
      });
    setKickMember({ show: false, loading: false, item: null });
  }

  return (
    <Modal style={confirmMemberKickModalStyle} close={handleClose}>
      <ConfirmationContainer>
        <ConfirmationLabel>{msg}</ConfirmationLabel>
        <ConfirmationBtnContainer>
          <ConfimrBtn onClick={kickMemberFromGroup}>Yes</ConfimrBtn>
          <ConfimrBtn onClick={handleClose}>No</ConfimrBtn>
        </ConfirmationBtnContainer>
      </ConfirmationContainer>
    </Modal>
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
  maxHeight: "234px",
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

const newMembersModalStyle = {
  maxWidth: "420px",
  maxHeight: "350px",
};

function AddNewMembers({
  isLoading,
  handleAddMemberToggle,
  active,
  contacts,
  groups,
  setIsLoading,
}) {
  const dispatch = useDispatch();

  function handleClose() {
    handleAddMemberToggle(false);
  }

  function getMembers() {
    const currentGroupIndex = groups.findIndex((i) => i.chatId === active.val);
    if (currentGroupIndex === -1) return [];
    let toRender = [];
    const currentGroupMembers = groups[currentGroupIndex].members;
    contacts.forEach((i) => {
      const isPresent = currentGroupMembers.some((m) => m.email === i.email);
      if (!isPresent) toRender.push(i);
    });
    return toRender;
  }

  async function addContact(contact) {
    if (isLoading) return;

    setIsLoading(true);
    await axios
      .put(`/chat/add-to-group/${active.val}?contact=${contact.email}`)
      .then(() => {
        dispatch(addContactToGroup(active.val, contact));
        toast.success("Contact added to the group successfully");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        const { message } = retrieveError(error);
        toast.error(message, toast.props.user.nonPersist);
      });

    setIsLoading(false);
  }

  const membersAvailable = getMembers();
  return (
    <Modal
      close={handleClose}
      style={newMembersModalStyle}
      inactive={isLoading}
    >
      <AddNewMembersContainer>
        <ModalHeaderWrapper>Add member</ModalHeaderWrapper>
        <AddNewMembersWrapper>
          <AddNewMembersTitle
            className={membersAvailable.length === 0 ? "center" : ""}
          >
            {membersAvailable.length === 0
              ? "No new contacts available"
              : "Select a contact to add in the group"}
          </AddNewMembersTitle>
          <AddNewMembersContatctContainer>
            {membersAvailable.map((item, index) => (
              <AddNewMembersContact key={index}>
                <AddNewMembersAvatarContainer>
                  <AddNewMembersAvatar src={getAvatar(item.avatarId)} />
                </AddNewMembersAvatarContainer>
                <AddNewMembersName>{item.nickname}</AddNewMembersName>
                <AddNewMembersBtn disabled={isLoading}>
                  {isLoading ? (
                    <LoadingSpinner style={{ width: "14px", height: "14px" }} />
                  ) : (
                    <IoAddOutline
                      onClick={() => addContact(item)}
                      className="icon"
                    />
                  )}
                </AddNewMembersBtn>
              </AddNewMembersContact>
            ))}
          </AddNewMembersContatctContainer>
        </AddNewMembersWrapper>
      </AddNewMembersContainer>
    </Modal>
  );
}

const AddNewMembersContact = styled.li`
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 50px;
  border-bottom: 1px solid ${(props) => props.theme.border.inputbox};
  padding: 5px 0;

  &:last-of-type {
    border: none;
  }
`;

const AddNewMembersAvatarContainer = styled.span`
  display: block;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  margin-right: 8px;
  background-color: ${(props) => props.theme.btn.active};
`;

const AddNewMembersAvatar = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const AddNewMembersName = styled.span`
  display: block;
  flex: 1;
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.main};
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddNewMembersBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.txt.sub};
  background: none;
  outline: none;
  border: none;
  font-size: 1.2rem;
  position: relative;
  width: 30px;
  height: 25px;

  .icon {
    cursor: pointer;
  }

  :enabled:hover {
    color: ${(props) => props.theme.txt.main};
  }

  :disabled .icon {
    cursor: not-allowed;
  }
`;

const AddNewMembersContatctContainer = styled.ul`
  display: block;
  list-style: none;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
  margin-top: 15px;
`;

const AddNewMembersTitle = styled.h5`
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  flex-shrink: 0;
  margin-top: 5px;

  &.center {
    text-align: center;
  }
`;

const AddNewMembersWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0 0.6rem;
`;

const AddNewMembersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

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
  line-height: 18px;
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
  flex-shrink: 0;
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
  flex-shrink: 0;
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
  font-size: 1.3rem;
  border-radius: 5px;
  padding: 8px;
  outline: none;
  border: none;
  color: ${(props) => props.theme.txt.main};
  background-color: ${(props) => props.theme.btn.active};
  width: 45px;
  height: 45px;

  :enabled:hover .icon {
    transform: scale(1.06);
  }

  :disabled {
    cursor: not-allowed;
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
  color: ${(props) => props.theme.txt.sub};
  margin-left: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
  display: none;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  position: relative;

  &.loading {
    display: flex;
    cursor: wait;
  }

  &.icon {
    cursor: pointer;
  }

  :enabled:hover {
    color: ${(props) => props.theme.txt.main};
  }

  :disabled .icon {
    cursor: not-allowed;
  }
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
