import React from "react";
import styled from "styled-components";
import { RiErrorWarningLine } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

export default function MessageContainer({
  index,
  timestamp,
  currentUser,
  sender,
  message,
  isSent,
}) {
  function isSender() {
    return currentUser.trim().toLowerCase() === sender.trim().toLowerCase();
  }

  function getTime() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateTime = timestamp.toLocaleString("en-US", {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return dateTime;
  }

  return (
    <>
      <ContainerBreak>
        <BreakTimestamp>Monday, 20 Dec 22</BreakTimestamp>
      </ContainerBreak>
      <Container as={isSender() ? MessageSender : MessageReceiver} key={index}>
        <MsgWrapper>
          <Message>{message}</Message>
          <MsgStatus>
            <MsgStatusIcon>
              {isSent ? <TiTick /> : <RiErrorWarningLine />}
            </MsgStatusIcon>
            <MsgTimestamp>{getTime()}</MsgTimestamp>
          </MsgStatus>
        </MsgWrapper>
      </Container>
    </>
  );
}

const Container = styled.ul`
  display: flex;
  list-style: none;
  margin-top: 8px;
`;

const ContainerBreak = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-top: 8px;
`;

const BreakTimestamp = styled.span`
  padding: 2px 4px;
  background-color: ${(props) => props.theme.background.app};
  color: ${(props) => props.theme.text.sub};
  border-radius: 2px;
`;

const MessageSender = styled.ul`
  justify-content: flex-end;
  li {
    background-color: ${(props) => props.theme.msgBox.sender};
    color: ${(props) => props.theme.text.main};
  }
`;

const MessageReceiver = styled.ul`
  justify-content: flex-start;
  li {
    background-color: ${(props) => props.theme.msgBox.receiver};
    color: ${(props) => props.theme.text.sub};
  }
`;

const MsgWrapper = styled.li`
  max-width: 60%;
  min-width: 60px;
  padding: 0.8rem 0.3rem 1.3rem 0.3rem;
  border-radius: 4px;
  position: relative;
`;

const Message = styled.span`
  display: block;
  width: 100%;
  max-height: 150px;
  padding: 0 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;

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

const MsgStatus = styled.div`
  position: absolute;
  bottom: 4px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text.main};
  opacity: 0.5;
`;

const MsgTimestamp = styled.span`
  font-size: 65%;
`;

const MsgStatusIcon = styled.span`
  font-size: 85%;
  display: block;
  margin-right: 3px;
  margin-top: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
