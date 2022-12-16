import React from "react";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";

import Avatar from "../../../assets/svgs/avatars/3.svg";

export default function ContentWrapper({ children }) {
  return (
    <Container>
      <Header>
        <NotificationBtn>
          <NotificationCount>1</NotificationCount>
          <IoIosNotificationsOutline />
        </NotificationBtn>
        <UserInfo>
          <ProfileAvatar src={Avatar} />
          <UserName>sivasanker n</UserName>
          <DropdownIcon />
        </UserInfo>
      </Header>
      {children}
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  min-width: 0;
  background: ${(props) => props.theme.background.container};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 60px;
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

const NotificationBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 70%;
  margin-right: 18px;
  color: ${(props) => props.theme.text.main};
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  position: relative;
`;

const NotificationCount = styled.span`
  background: ${(props) => props.theme.background.highlight.hex};
  color: ${(props) => props.theme.text.main};
  width: 16px;
  height: 16px;
  font-size: 40%;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  right: -5px;
`;
