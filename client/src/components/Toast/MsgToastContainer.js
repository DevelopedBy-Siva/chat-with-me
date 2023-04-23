import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";

import popupsound from "../../assets/sounds/popup.mp3";
import { getAvatar } from "../../assets/avatars";
import { getContactNickname } from "../../utils/InputHandler";
import { setActive } from "../../store/actions/ChatActions";
import { toggle_BW_Chats } from "../../utils/Screens";

export default function MsgToastContainer({
  message = "...",
  avatarId,
  sendBy = "unknown",
  email = "",
  chatId,
  isPrivate = true,
  toastProps = {},
  senderId,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    new Audio(popupsound).play();
  }, []);

  const { contacts } = useSelector((state) => state.contacts);
  const { active } = useSelector((state) => state.chats);

  function goToChat() {
    const isChatPresent = contacts.findIndex((item) => item.chatId === chatId);
    if (isChatPresent !== -1) {
      if (active.val !== chatId) {
        toggle_BW_Chats();
        dispatch(setActive(chatId, isPrivate, senderId));
      }
    } else {
      console.log("not found");
    }
    closeToast();
  }

  function closeToast() {
    toast.dismiss(toastProps.id);
  }

  const nickname = getContactNickname(contacts, email);

  return (
    <Container>
      <Wrapper onClick={() => goToChat()}>
        <ImageContainer>
          <Img src={getAvatar(avatarId)} />
        </ImageContainer>
        <Details>
          <From>{nickname ? nickname : sendBy}</From>
          <Msg>{message}</Msg>
        </Details>
      </Wrapper>
      <CloseBtn>
        <IoClose className="icon" onClick={closeToast} />
      </CloseBtn>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 340px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin: auto;
  padding: 14px;
  overflow: hidden;
  background: #9eafc1;
  border-radius: 5px;
  cursor: pointer;
`;

const ImageContainer = styled.span`
  display: block;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  flex-shrink: 0;
  flex-shrink: 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
  margin-left: 14px;
  overflow: hidden;
  flex: 1;
  min-width: 0;
  user-select: none;
`;

const From = styled.span`
  display: block;
  text-transform: capitalize;
  font-size: 0.8rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1b1b1b;
`;

const Msg = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  font-size: 0.7rem;
  margin-top: 2px;
  line-height: 16px;
  color: #1b1b1b;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: #1b1b1b;
  z-index: 9;

  .icon {
    opacity: 0.7;
    transition: opacity 0.2s ease-in-out;

    :hover {
      opacity: 1;
    }
  }
`;
