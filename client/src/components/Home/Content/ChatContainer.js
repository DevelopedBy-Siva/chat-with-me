import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";
import { CgDetailsMore } from "react-icons/cg";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdDeleteForever, MdPersonOff, MdBlock } from "react-icons/md";
import { BiPencil } from "react-icons/bi";

import EmojiContainer from "../../EmojiContainer";
import ContentWrapper from "./ContentWrapper";
import Avatar from "../../../assets/svgs/avatars/6.svg";
import { contacts } from "../../../assets/dummy_values";
import Tooltip from "../../Tooltip";

const current_user = "siva";

const friendOperations = [
  {
    id: "block-user",
    icon: <MdBlock />,
    placeholder: "Block user",
  },
  {
    id: "clear-user-chat",
    icon: <MdDeleteForever />,
    placeholder: "Clear chat",
  },
  {
    id: "unfriend-user",
    icon: <MdPersonOff />,
    placeholder: "Unfriend",
  },
];

export default function ChatContainer() {
  const msgRef = useRef(null);
  const [infoVisible, setInfoVisible] = useState(false);

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
        <SubContainer>
          <ChatBox>
            <ReceiverContainer>
              <Receiver>
                <ReceiverAvatar src={Avatar} />
                <ReceiverInfo>
                  <ReceiverName>Duke nukem</ReceiverName>
                  <ReceiverStatus>Online</ReceiverStatus>
                </ReceiverInfo>
              </Receiver>
              {!infoVisible && (
                <ReceiverInfoBtn onClick={() => setInfoVisible(true)}>
                  <CgDetailsMore />
                </ReceiverInfoBtn>
              )}
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
                <RiSendPlaneFill />
              </SendBtn>
            </MessageOprs>
          </MessageInputContainer>
        </SubContainer>
        {infoVisible && (
          <UserInfoContainer infoVisible={infoVisible}>
            <UserInfoCloseBtn onClick={() => setInfoVisible(false)}>
              <IoIosArrowDropleft />
            </UserInfoCloseBtn>
            <UserInfoWrapper>
              <UserAvatar src={Avatar} />
              <UserInfoName>Hrithik roshan</UserInfoName>
              <NicknameContainer>
                <NicknameTitle>#nick</NicknameTitle>
                <Nickname>duke nukem</Nickname>
                <ChangeNicknameBtn id="change-nickname">
                  <BiPencil />
                </ChangeNicknameBtn>
                <Tooltip id="change-nickname" msg="Change nickname" />
              </NicknameContainer>
              <UserDescription>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </UserDescription>
              <UserOperations>
                {friendOperations.map((op) => (
                  <>
                    <UserOperationBtn id={op.id}>{op.icon}</UserOperationBtn>
                    <Tooltip id={op.id} msg={op.placeholder} />
                  </>
                ))}
              </UserOperations>
            </UserInfoWrapper>
          </UserInfoContainer>
        )}
      </Container>
    </ContentWrapper>
  );
}

const Container = styled.section`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.background.container};
`;

const SubContainer = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const UserInfoContainer = styled.div`
  max-width: 280px;
  width: 30%;
  border: 1px solid ${(props) => props.theme.background.app};
  border-right: 0;
  border-bottom: 0;
  flex-shrink: 0;
  position: relative;
`;

const UserInfoCloseBtn = styled.button`
  position: absolute;
  left: -10px;
  top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background.container};
  color: ${(props) => props.theme.text.sub};
  border: none;
  outline: none;
  border-radius: 50%;
  font-size: 60%;
  cursor: pointer;
  transform: rotate(180deg) scale(1);
  z-index: 1;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: rotate(180deg) scale(1.1);
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
    background: ${(props) => props.theme.background.app};
    border-radius: 4px;
  }
`;

const UserAvatar = styled.img`
  margin-top: 2rem;
  width: 50%;
  background: none;
  border-radius: 50%;
  display: block;
`;

const UserInfoName = styled.span`
  margin-top: 1.4rem;
  font-size: 60%;
  width: 100%;
  display: block;
  color: ${(props) => props.theme.text.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  text-align: center;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${(props) => props.theme.text.sub};
  opacity: 1;
`;

const Nickname = styled.span`
  display: block;
  font-size: 30%;
  text-transform: capitalize;
  margin: 0 4px;
  color: white;
`;

const NicknameTitle = styled.span`
  display: block;
  text-transform: lowercase;
  font-size: 30%;
  font-style: italic;
`;

const ChangeNicknameBtn = styled.button`
  font-size: 30%;
  display: block;
  border: none;
  outline: none;
  background: none;
  color: ${(props) => props.theme.text.main};
  cursor: pointer;
`;

const UserDescription = styled.span`
  display: block;
  font-size: 30%;
  color: ${(props) => props.theme.text.sub};
  text-align: center;
  margin-top: 0.8rem;
`;

const UserOperations = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;

const UserOperationBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 8px;
  font-size: 80%;
  border-radius: 5px;
  padding: 8px;
  outline: none;
  border: none;
  color: ${(props) => props.theme.text.main};
  background-color: ${(props) => props.theme.background.containerLight};
  width: 60px;
  height: 60px;
  transition: all 0.4s ease-in-out;
  :hover {
    font-size: 72%;
    background-color: ${(props) => props.theme.background.highlight.hex};
  }
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
  position: relative;
  display: block;
  outline: none;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 70%;
  transform: scale(1);
  color: ${(props) => props.theme.text.main};
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: scale(1.1);
  }
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
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.background.app};
    border-radius: 6px;
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
  color: ${(props) => props.theme.background.highlight.hex};
  font-size: 80%;
`;
