import React from "react";
import styled from "styled-components";

import { getAvatar } from "../../assets/avatars";

export default function MsgToastContainer({
  message = "...",
  avatarId,
  sendBy = "unknown",
}) {
  return (
    <Container>
      <ImageContainer>
        <Img src={getAvatar(avatarId)} />
      </ImageContainer>
      <Details>
        <From>{sendBy}</From>
        <Msg>{message}</Msg>
      </Details>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 310px;
  margin: auto;
  overflow: hidden;
  background: ${(props) => props.theme.toast.bg};
  padding: 15px 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  transition: transform 0.5s ease-in-out;
  cursor: pointer;

  :hover {
    transform: scale(0.96);
  }
`;

const ImageContainer = styled.span`
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
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
`;

const From = styled.span`
  display: block;
  width: 100%;
  text-transform: capitalize;
  font-size: 0.8rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.toast.txtBold};
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
  color: ${(props) => props.theme.toast.default};
`;
