import React from "react";
import styled from "styled-components";
import { RiChatSmile3Fill } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

import Avatar from "../../assets/svgs/avatars/3.svg";

export default function Header() {
  return (
    <Container>
      <Logo>
        <RiChatSmile3Fill />
      </Logo>
      <SearchContainer>
        <Search>
          <SearchIcon />
          <SearchInput>Find or start a conversation...</SearchInput>
        </Search>
      </SearchContainer>
      <Account>
        <NotificationBtn>
          <NotificationCountContainer>
            <NotificationCount>22</NotificationCount>
          </NotificationCountContainer>
          <IoIosNotificationsOutline />
        </NotificationBtn>
        <UserInfo>
          <ProfileAvatar src={Avatar} />
          <UserName>sivasanker n</UserName>
          <DropdownIcon />
        </UserInfo>
      </Account>
    </Container>
  );
}

const Container = styled.header`
  height: 60px;
  width: 100%;
  display: flex;
  background: ${(props) => props.theme.background.container};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.background.highlight.hex};
  color: ${(props) => props.theme.text.main};
  height: 60px;
  width: 55px;
`;

const Account = styled.header`
  height: 60px;
  display: flex;
  flex: 1;
  min-width: 0;
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

const NotificationCountContainer = styled.div`
  background: ${(props) => props.theme.background.highlight.hex};
  color: ${(props) => props.theme.text.main};
  width: 16px;
  height: 16px;
  font-size: 40%;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  right: -5px;
  overflow: hidden;
`;

const NotificationCount = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 260px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100%;
`;

const SearchIcon = styled(FiSearch)`
  color: ${(props) => props.theme.text.main};
  font-size: 70%;
`;

const SearchInput = styled.button`
  margin-left: 10px;
  border: none;
  outline: none;
  background: none;
  color: ${(props) => props.theme.text.sub};
  font-size: 40%;
  width: 100%;
  cursor: pointer;
  text-align: left;
`;
