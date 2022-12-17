import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";
import EmojiContainer from "../../../EmojiContainer";

export default function InputContainer() {
  const msgInputRef = useRef(null);

  useEffect(() => {
    msgInputRef.current.focus();
  }, []);

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
      <TextContainer>
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
  color: ${(props) => props.theme.background.highlight.hex};
  font-size: 80%;
`;
