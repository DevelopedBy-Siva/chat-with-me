import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RiSendPlaneFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

import EmojiContainer from "./Emoji";
import { useSocket } from "../../../context/SocketContext";
import {
  readyToSendMsg,
  updateMessageSendStatus,
} from "../../../store/actions/ChatActions";
import { updateLastMsgAndTmstp } from "../../../store/actions/ContactActions";

export default function InputContainer({
  chatContainerRef,
  isPrivate,
  isBlocked,
}) {
  const msgInputRef = useRef(null);
  const formRef = useRef(null);

  const socket = useSocket();

  const dispatch = useDispatch();

  const { details } = useSelector((state) => state.user);
  const { active, loading, chats } = useSelector((state) => state.chats);

  useEffect(() => {
    if (msgInputRef) msgInputRef.current.value = "";
  }, [active]);

  function submitMessage(e) {
    e.preventDefault();

    if (loading || isBlocked) return;

    const msg = msgInputRef.current.value;
    if (!msg || msg.trim().length === 0) return;

    const { val: chatId } = active;

    const createdAt = new Date().toUTCString();
    const data = {
      sendBy: details._id,
      message: msg.trim(),
      createdAt,
    };

    let recipients = [];
    const chatDetails = chats[chatId];
    if (chatDetails) {
      const contactInfos = chatDetails.contactInfos;
      if (contactInfos) contactInfos.forEach((i) => recipients.push(i._id));
    }

    const chat = {
      recipients,
      data,
      chatId,
      isPrivate: active.isPrivate,
      senderAvatarId: details.avatarId,
      senderName: details.name,
      senderEmail: details.email,
    };

    const msgId = uuidv4();

    dispatch(readyToSendMsg({ ...data, msgId }, chatId, createdAt));
    dispatch(
      updateLastMsgAndTmstp(chatId, data.message, data.createdAt, isPrivate)
    );

    socket.emit("send-message", chat, (isSent) => {
      if (isSent)
        dispatch(updateMessageSendStatus(chatId, msgId, true, createdAt));
    });

    msgInputRef.current.value = "";
    msgInputRef.current.style.height = "auto";
    if (chatContainerRef)
      chatContainerRef.current.scrollTop = chatContainerRef.scrollHeight;
  }

  function handleResize(e) {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleKeyDown(e) {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      submitMessage(e);
    }
  }
  return (
    <Container ref={formRef} onSubmit={submitMessage}>
      <InputWrapper
        className={`${loading ? "isloading" : ""} ${
          isBlocked ? "not-allowed" : ""
        }`}
      >
        <MsgInput
          ref={msgInputRef}
          rows={1}
          onInput={handleResize}
          onKeyDown={handleKeyDown}
          placeholder="Type something here..."
          disabled={loading || isBlocked}
        />
      </InputWrapper>
      <MessageOprs>
        <EmojiContainer msgRef={msgInputRef} />
        <SendBtn type="submit">
          <RiSendPlaneFill />
        </SendBtn>
      </MessageOprs>
    </Container>
  );
}

const Container = styled.form`
  flex-shrink: 0;
  min-height: 60px;
  display: flex;
  position: relative;
  align-items: center;
  padding: 0.7rem 1.2rem;
  background: ${(props) => props.theme.bg.app};
  z-index: 9;
`;

const InputWrapper = styled.label`
  display: block;
  width: calc(100% - 80px);
  border-radius: 5px;
  padding: 0.7rem;
  background: ${(props) => props.theme.bg.container};
  max-height: 120px;
  display: flex;
  align-items: center;
  cursor: text;

  &.isloading {
    cursor: wait;
  }

  &.not-allowed {
    cursor: not-allowed;
  }

  @media (max-width: 920px) {
    width: calc(100% - 65px);
  }
`;

const MsgInput = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  background: none;
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.txt.main};
  letter-spacing: 1px;
  font-size: 0.8rem;
  height: 100%;
  max-height: 80px;
  cursor: inherit;

  &::placeholder {
    color: ${(props) => props.theme.txt.sub};
    opacity: 1;
    font-size: 0.7rem;
  }

  &:-ms-input-placeholder {
    color: ${(props) => props.theme.txt.sub};
  }

  &::-ms-input-placeholder {
    color: ${(props) => props.theme.txt.sub};
  }
`;

const MessageOprs = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 22px;
  right: 1.2rem;
`;

const SendBtn = styled.button`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.txt.sub};

  &:hover {
    color: ${(props) => props.theme.txt.main};
  }

  @media (max-width: 920px) {
    font-size: 1.1rem;
    margin-left: 0.9rem;
  }
`;
