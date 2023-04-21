import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import popupsound from "../../assets/sounds/popup.mp3";
import { getAvatar } from "../../assets/avatars";
import { getContactNickname } from "../../utils/InputHandler";

export default function MsgToastContainer({
  message = "...",
  avatarId,
  sendBy = "unknown",
  email = "",
}) {
  useEffect(() => {
    new Audio(popupsound).play();
  }, []);

  const { contacts } = useSelector((state) => state.contacts);

  const nickname = getContactNickname(contacts, email);
  return (
    <Container>
      <ImageContainer>
        <Img src={getAvatar(avatarId)} />
      </ImageContainer>
      <Details>
        <From>{nickname ? nickname : sendBy}</From>
        <Msg>{message}</Msg>
      </Details>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
`;

const ImageContainer = styled.span`
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  flex-shrink: 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
  margin-left: 15px;
  overflow: hidden;
  flex: 1;
  min-width: 0;
  user-select: none;
`;

const From = styled.span`
  display: block;
  text-transform: capitalize;
  font-size: 0.8rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1b1b1b;
`;

const Msg = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  font-size: 0.7rem;
  margin-top: 4px;
  color: #989898;
  line-height: 16px;
  color: #1b1b1b;
`;
