import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";

import EmojiContainer from "../EmojiContainer";
import Header from "./Header";

export default function ChatContainer() {
  const msgRef = useRef(null);

  useEffect(() => {
    msgRef.current.focus();
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    const msg = msgRef.current.innerText.trim();
    if (!msg.length) return;

    /**
     * TODO:
     * Send msg to server
     */
    console.log(msg);
    msgRef.current.innerText = "";
  }

  function convertToPlainText(event) {
    event.preventDefault();

    console.log(document.getSelection().anchorOffset);

    msgRef.current.innerText = event.clipboardData.getData("text/plain");

    // document.execCommand("selectAll", false, null);
    // document.getSelection().collapseToEnd();
  }

  return (
    <Container>
      <Header />
      <MessageContainer></MessageContainer>
      <MessageInputContainer onSubmit={sendMessage}>
        <TextContainer>
          <MessageInput
            ref={msgRef}
            contentEditable
            onPaste={convertToPlainText}
          />
        </TextContainer>
        <MessageOprs>
          <EmojiContainer />
          <SendBtn type="submit">
            <SendBtnIcon />
          </SendBtn>
        </MessageOprs>
      </MessageInputContainer>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.background.container};
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: 1.4rem;
  border-top: 1px solid ${(props) => props.theme.background.app};
`;

const MessageInputContainer = styled.form`
  min-height: 60px;
  display: flex;
  position: relative;
  padding: 0.7rem 1.2rem;
  border-top: 1px solid ${(props) => props.theme.background.app};
`;

const TextContainer = styled.div`
  width: calc(100% - 80px);
  max-height: 90px;
  margin-right: 1rem;
  padding: 0.8rem;
  border-radius: 5px;
  background: ${(props) => props.theme.background.containerLight};
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.background.app};
    border-radius: inherit;
  }
`;

const MessageInput = styled.div`
  color: ${(props) => props.theme.text.sub};
  font-size: 38%;
  word-break: break-all;
  cursor: text;
  outline: none;
  border: none;
  caret-color: ${(props) => props.theme.text.sub};

  :empty:focus::before,
  :empty::before {
    content: "Write a message...";
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
`;

const SendBtnIcon = styled(RiSendPlaneFill)`
  color: ${(props) => props.theme.background.highlight.hex};
  font-size: 180%;
`;
