import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";
import EmojiContainer from "../EmojiContainer";

export default function ChatViewContainer() {
  const msgRef = useRef(null);

  useEffect(() => {
    msgRef.current.focus();
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    const msg = e.target[0].value.trim();
    if (!msg.length) return;

    /**
     * TODO:
     * Send msg to server
     */
    console.log(msg);

    e.target[0].value = "";
  }

  return (
    <Container>
      <MainContainer>
        <ChatHeader></ChatHeader>
        <MessageContainer></MessageContainer>
        <MessageInputContainer onSubmit={sendMessage}>
          <InputWrapper>
            <MessageInput
              autoComplete="off"
              spellCheck="false"
              ref={msgRef}
              placeholder="Write a message..."
            />
            <EmojiContainer />
          </InputWrapper>
          <SendBtn type="submit">
            <SendBtnIcon />
          </SendBtn>
        </MessageInputContainer>
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  grid-area: view;
  background: ${(props) => props.theme.background.container};
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  width: 100%;
  height: 70px;
  margin-bottom: 1px;
  border-bottom: 1px solid ${(props) => props.theme.background.app};
`;

const MessageContainer = styled.div`
  flex: 1;
`;

const MessageInputContainer = styled.form`
  width: 100%;
  height: 60px;
  border-top: 1px solid ${(props) => props.theme.background.app};
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  flex: 1;
  padding: 0 1.4rem;
  display: flex;
`;

const MessageInput = styled.input`
  flex: 1;
  outline: none;
  border: none;
  background: none;
  color: ${(props) => props.theme.text.sub};
  font-size: 40%;
  margin-right: 1.4rem;
`;

const SendBtn = styled.button`
  width: 60px;
  height: 100%;
  outline: none;
  border: none;
  background: none;
  border-left: 1px solid ${(props) => props.theme.background.app};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SendBtnIcon = styled(RiSendPlaneFill)`
  color: ${(props) => props.theme.background.highlight};
  font-size: 140%;
`;
