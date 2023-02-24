import React from "react";
import styled from "styled-components";
import { RiErrorWarningLine } from "react-icons/ri";
import { BiCheckDouble } from "react-icons/bi";

import ReceiverAvatar from "../../../assets/avatars/6.svg";
import SenderAvatar from "../../../assets/avatars/2.svg";
import { getMessageTime } from "../../../utils/DateTime";

export default function MessageContainer({
  currentUser = "",
  sender = "",
  message = "",
  isSent = false,
}) {
  function isSender() {
    return currentUser.trim().toLowerCase() === sender.trim().toLowerCase();
  }

  const avatarPosition = isSender() ? "sender-avatar" : "receiver-avatar";

  return (
    <Container as={isSender() ? MessageSender : MessageReceiver}>
      <ContentWrapper className={avatarPosition}>
        <UserAvatar
          className={avatarPosition}
          src={isSender() ? SenderAvatar : ReceiverAvatar}
          alt="user avatar"
        />
        <Wrapper>
          <MsgTimestamp>
            {getMessageTime(new Date().toUTCString())}
          </MsgTimestamp>
          <MsgWrapper>
            <Message>{message}</Message>
            <MsgStatus>
              <MsgStatusIcon>
                {isSent ? (
                  <BiCheckDouble />
                ) : (
                  <RiErrorWarningLine style={{ fontSize: "0.8rem" }} />
                )}
              </MsgStatusIcon>
            </MsgStatus>
          </MsgWrapper>
        </Wrapper>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  list-style: none;
  margin: 15px 0;
  font-size: 0.7rem;
  font-weight: 400;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 8px;
  z-index: 1;

  &.sender-avatar {
    margin-left: 8px;
  }
  &.receiver-avatar {
    margin-right: 8px;
  }
`;

const MsgWrapper = styled.li`
  padding: 0.8rem 0.3rem 1.5rem 0.3rem;
  position: relative;
  border-radius: 4px;
`;

const ContentWrapper = styled.div`
  max-width: 55%;
  min-width: 60px;
  display: flex;

  &.sender-avatar {
    flex-direction: row-reverse;
  }
`;

const MessageSender = styled.ul`
  justify-content: flex-end;
  li {
    background-color: ${(props) => props.theme.msgBox.sender};
    color: ${(props) => props.theme.msgBox.senderColor};
  }
`;

const MessageReceiver = styled.ul`
  justify-content: flex-start;
  li {
    background-color: ${(props) => props.theme.msgBox.receiver};
    color: ${(props) => props.theme.msgBox.receiverColor};
  }
`;

const Message = styled.span`
  display: block;
  width: 100%;
  min-width: 50px;
  max-height: 150px;
  padding: 0 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  line-height: 18px;
  font-size: 0.7rem;
  letter-spacing: 1.4px;
  font-weight: 400;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.bg.app};
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
  color: ${(props) => props.theme.txt.main};
  opacity: 0.8;
`;

const MsgTimestamp = styled.span`
  font-size: 0.6rem;
  font-weight: 400;
  color: ${(props) => props.theme.txt.main};
  padding: 4px 0;
`;

const MsgStatusIcon = styled.span`
  font-size: 0.9rem;
  display: block;
  margin-right: 0px;
  margin-top: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
