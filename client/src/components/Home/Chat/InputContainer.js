import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RiSendPlaneFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

import EmojiContainer from "./Emoji";
import { sendMessage } from "../../../store/reducers/Chats";

export default function InputContainer() {
  const msgInputRef = useRef(null);

  const dispatch = useDispatch();

  const { active, loading } = useSelector((state) => state.chats);

  useEffect(() => {
    if (msgInputRef) {
      msgInputRef.current.value = "";
      msgInputRef.current.focus();
    }
  }, [active]);

  function submitMessage(e) {
    e.preventDefault();
    const msg = msgInputRef.current.value;
    if (msg && msg.trim().length === 0) return;
    const msgId = uuidv4();
    const toSend = {
      sendBy: "siva",
      message: msg,
      createdAt: new Date().toUTCString(),
      msgId,
    };
    dispatch(sendMessage(toSend, active));
    msgInputRef.current.value = "";
    msgInputRef.current.style.height = "auto";
  }

  function handleResize(e) {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <Container onSubmit={submitMessage}>
      <InputWrapper isLoading={loading}>
        <MsgInput
          ref={msgInputRef}
          rows={1}
          onInput={handleResize}
          placeholder="Type something here..."
          disabled={loading}
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
  cursor: ${(props) => (props.isLoading ? "wait" : "text")};
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

  &::placeholder {
    color: ${(props) => props.theme.txt.sub};
    opacity: 1;
  }

  &:-ms-input-placeholder {
    color: ${(props) => props.theme.txt.sub};
  }

  &::-ms-input-placeholder {
    color: ${(props) => props.theme.txt.sub};
  }

  &:disabled {
    cursor: wait;
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
`;
