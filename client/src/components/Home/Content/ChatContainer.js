import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { RiSendPlaneFill, RiInformationFill } from "react-icons/ri";

import EmojiContainer from "../../EmojiContainer";
import ContentWrapper from "./ContentWrapper";
import Avatar from "../../../assets/svgs/avatars/6.svg";
import { contacts } from "../../../assets/dummy_values";

const current_user = "siva";

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
    <ContentWrapper>
      <Container>
        <ChatBox>
          <ReceiverContainer>
            <Receiver>
              <ReceiverAvatar src={Avatar} />
              <ReceiverInfo>
                <ReceiverName>Duke nukem</ReceiverName>
                <ReceiverStatus>Online</ReceiverStatus>
              </ReceiverInfo>
            </Receiver>
            <ReceiverInfoBtn>
              <InfoIcon />
            </ReceiverInfoBtn>
          </ReceiverContainer>
          <MessageContainer>
            <MessageWrapper>
              {contacts.map((i, index) =>
                i.sender === current_user ? (
                  <MessageSender key={index}>
                    <Message>{i.message}</Message>
                  </MessageSender>
                ) : (
                  <MessageReceiver key={index}>
                    <Message>{i.message}</Message>
                  </MessageReceiver>
                )
              )}
            </MessageWrapper>
          </MessageContainer>
        </ChatBox>
        <MessageInputContainer onSubmit={sendMessage}>
          <TextContainer>
            <MessageInput
              ref={msgRef}
              contentEditable
              onPaste={convertToPlainText}
              role="textbox"
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
    </ContentWrapper>
  );
}

const Container = styled.section`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.background.container};
`;

const ChatBox = styled.div`
  flex: 1;
  min-height: 0;
  border-top: 1px solid ${(props) => props.theme.background.app};
  display: flex;
  flex-direction: column;
`;

const ReceiverContainer = styled.div`
  height: 70px;
  border-bottom: 1px solid ${(props) => props.theme.background.app};
  flex-shrink: 0;
  padding: 0.5rem 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Receiver = styled.div`
  margin-right: 0.4rem;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`;

const ReceiverAvatar = styled.img`
  height: 44px;
  background: none;
  border-radius: 50%;
`;

const ReceiverInfo = styled.div`
  height: 44px;
  margin-left: 1rem;
  min-width: 0;
  width: 90%;
`;

const ReceiverName = styled.span`
  font-size: 50%;
  display: block;
  color: ${(props) => props.theme.text.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

const ReceiverStatus = styled.span`
  font-size: 30%;
  display: block;
  color: ${(props) => props.theme.text.sub};
  text-transform: capitalize;
`;

const ReceiverInfoBtn = styled.button`
  display: block;
  outline: none;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;

const InfoIcon = styled(RiInformationFill)`
  color: ${(props) => props.theme.text.main};
  font-size: 180%;
`;

const MessageContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  position: relative;
  font-size: 32%;
  display: flex;
  flex-direction: column;
`;

const MessageWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  padding: 1.4rem;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.background.app};
    border-radius: 5px;
  }
`;

const MessageSender = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin-top: 8px;
  li {
    background-color: ${(props) => props.theme.msgBox.sender};
    color: ${(props) => props.theme.text.main};
  }
`;

const MessageReceiver = styled.ul`
  display: flex;
  justify-content: flex-start;
  list-style: none;
  margin-top: 8px;
  li {
    background-color: ${(props) => props.theme.msgBox.receiver};
    color: ${(props) => props.theme.text.sub};
  }
`;

const Message = styled.li`
  max-width: 60%;
  padding: 8px;
  border-radius: 4px;
`;

const MessageInputContainer = styled.form`
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
`;

const SendBtnIcon = styled(RiSendPlaneFill)`
  color: ${(props) => props.theme.background.highlight.hex};
  font-size: 180%;
`;
