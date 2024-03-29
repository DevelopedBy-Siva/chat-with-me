import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { BsCheck } from "react-icons/bs";
import { MdReportGmailerrorred } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";

import { getMessageTime } from "../../../utils/DateTime";
import { getAvatar } from "../../../assets/avatars";

export default function MessageContainer({
  currentUser = "",
  sender = "",
  message = "",
  createdAt,
  isSent,
  contactInfo = {},
  isPrivate,
  nickname,
  avatar,
  isNotification,
}) {
  function isSender() {
    return currentUser.trim().toLowerCase() === sender.trim().toLowerCase();
  }
  const avatarPosition = isSender() ? "sender-avatar" : "receiver-avatar";

  const sentStatus =
    isSent === undefined || isSent === true ? (
      <BsCheck />
    ) : isSent === false ? (
      <GiSandsOfTime style={{ fontSize: "0.6rem" }} />
    ) : (
      <MdReportGmailerrorred />
    );

  if (isNotification)
    return <Notification>{_.capitalize(message)}</Notification>;

  return (
    <Container as={isSender() ? MessageSender : MessageReceiver}>
      <ContentWrapper className={avatarPosition}>
        <UserAvatarContainer className={avatarPosition}>
          <UserAvatar src={getAvatar(avatar ? avatar : contactInfo.avatarId)} />
        </UserAvatarContainer>
        <Wrapper>
          <MsgTimestamp>{getMessageTime(createdAt)}</MsgTimestamp>
          <MsgWrapper>
            {isPrivate === false && !isSender() && (
              <SenderName>{nickname ? nickname : contactInfo.name}</SenderName>
            )}
            <Message>{message}</Message>
            <MsgStatus>
              <MsgStatusIcon>{sentStatus}</MsgStatusIcon>
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

const UserAvatarContainer = styled.div`
  background-color: ${(props) => props.theme.btn.active};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 8px;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  flex-shrink: 0;

  &.sender-avatar {
    margin-right: 8px;
  }
  &.receiver-avatar {
    margin-left: 8px;
  }
`;

const UserAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const SenderName = styled.span`
  display: block;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateY(-2px);
  padding: 0 0.5rem 2px 0.5rem;
  font-weight: 600;
  font-size: 0.6rem;
  color: ${(props) => props.theme.txt.highlight};
  text-transform: capitalize;
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
  flex-direction: row-reverse;

  &.sender-avatar {
    flex-direction: row;
  }
`;

const Notification = styled.ul`
  text-align: center;
  font-size: 0.65rem;
  padding: 0 4px;
  border-radius: 4px;
  color: ${(props) => props.theme.txt.sub};
  font-weight: 400;
  margin: 24px auto;
  letter-spacing: 1.4px;
  pointer-events: none;
`;

const MessageSender = styled.ul`
  justify-content: flex-start;
  li {
    background-color: ${(props) => props.theme.msgBox.sender};
    color: ${(props) => props.theme.msgBox.senderColor};
  }
`;

const MessageReceiver = styled.ul`
  justify-content: flex-end;
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
  white-space: pre-wrap;

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
