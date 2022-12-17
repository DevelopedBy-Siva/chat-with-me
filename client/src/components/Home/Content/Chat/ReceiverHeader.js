import React from "react";
import styled from "styled-components";
import { CgDetailsMore } from "react-icons/cg";

import Avatar from "../../../../assets/svgs/avatars/6.svg";

export default function ReceiverHeader({ infoVisible, setInfoVisible }) {
  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.div`
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
