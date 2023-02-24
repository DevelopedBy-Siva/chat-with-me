import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RiSendPlaneFill } from "react-icons/ri";

import EmojiContainer from "./Emoji";

export default function InputContainer() {
  const msgInputRef = useRef(null);

  const { active } = useSelector((state) => state.chats);

  useEffect(() => {
    if (msgInputRef) {
      msgInputRef.current.innerText = "";
      msgInputRef.current.focus();
    }
  }, [active]);

  function sendMessage(e) {
    e.preventDefault();
    const msg = msgInputRef.current.innerText.trim();
    if (!msg.length) return;

    /**
     * TODO:
     * Send msg to server
     */
    console.log(msg);
    msgInputRef.current.innerText = "";
  }

  function convertToPlainText(event) {
    event.preventDefault();

    console.log(document.getSelection().anchorOffset);

    msgInputRef.current.innerText = event.clipboardData.getData("text/plain");

    // document.execCommand("selectAll", false, null);
    // document.getSelection().collapseToEnd();
  }

  return (
    <Container onSubmit={sendMessage}>
      <TextContainer onClick={() => msgInputRef.current.focus()}>
        <MessageInput
          ref={msgInputRef}
          contentEditable
          onPaste={convertToPlainText}
          role="textbox"
        />
      </TextContainer>
      <MessageOprs>
        <EmojiContainer />
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
  padding: 0.7rem 1.2rem;
  background: ${(props) => props.theme.bg.app};
  z-index: 9;
`;

const TextContainer = styled.div`
  width: calc(100% - 80px);
  max-height: 90px;
  margin-right: 1rem;
  padding: 0.8rem;
  border-radius: 5px;
  background: ${(props) => props.theme.bg.container};
  overflow-x: hidden;
  overflow-y: auto;
  cursor: text;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: inherit;
  }
`;

const MessageInput = styled.div`
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.7rem;
  word-break: break-all;
  cursor: text;
  outline: none;
  border: none;
  color: ${(props) => props.theme.txt.main};
  font-weight: 400;

  &:empty:focus::before,
  &:empty::before {
    content: "Write a message...";
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
`;
