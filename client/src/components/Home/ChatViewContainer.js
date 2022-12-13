import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";
import Avatar from "../../assets/svgs/avatars/3.svg";
import { RiArrowDropDownLine } from "react-icons/ri";

import EmojiContainer from "../EmojiContainer";

export default function ChatViewContainer() {
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

  return (
    <Container>
      <MainContainer>
        <ChatHeader>
          <UserInfo>
            <ProfileAvatar src={Avatar} />
            <UserName>sivasanker n</UserName>
            <DropdownIcon />
          </UserInfo>
        </ChatHeader>
        <MessageContainer></MessageContainer>
        <MessageInputContainer onSubmit={sendMessage}>
          <InputWrapper>
            <MessageInput
              spellcheck="false"
              ref={msgRef}
              placeholder="Write a message..."
              role="textbox"
              contentEditable
            />
          </InputWrapper>
          <MessageOprs>
            <EmojiContainer />
            <SendBtn type="submit">
              <SendBtnIcon />
            </SendBtn>
          </MessageOprs>
        </MessageInputContainer>
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  flex: 1 1 auto;
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1.4rem;
`;

const UserInfo = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const UserName = styled.span`
  margin-left: 10px;
  color: ${(props) => props.theme.text.main};
  font-weight: 200;
  font-size: 80%;
  letter-spacing: 1.2px;
  text-transform: capitalize;
`;

const ProfileAvatar = styled.img`
  height: 30px;
  background: none;
  border-radius: 50%;
`;

const DropdownIcon = styled(RiArrowDropDownLine)`
  color: ${(props) => props.theme.text.main};
  font-size: 140%;
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: 1.4rem;
`;

const MessageInputContainer = styled.form`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.background.app};
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  padding: 1.2rem;
`;

const InputWrapper = styled.div`
  flex: 1;
  background: ${(props) => props.theme.background.containerLight};
  border-radius: 5px;
  margin-right: 1rem;
  max-height: 70px;
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
  font-size: 40%;
  resize: none;
  user-select: text;
  white-space: pre-wrap;
  outline: none;
  border: none;
  width: 100%;
  :empty:before {
    content: attr(placeholder);
    pointer-events: none;
  }
`;

const MessageOprs = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
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
  font-size: 170%;
`;
