import React from "react";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";

import Avatar from "../../../assets/svgs/avatars/3.svg";

export default function ContentWrapper({ children }) {
  return (
    <Container>
      <Header>
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
