import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import logo from "../../svgs/logo.png";

export default function Header() {
  return (
    <Container>
      <LeftWrapper>
        <Logo src={logo} />
        <Search>
          <FiSearch />
          <SearchInput placeholder="Search for contacts" />
        </Search>
      </LeftWrapper>
      <User>
        <Avatar />
        <Name>Sivas</Name>
        <RiArrowDropDownLine />
      </User>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  height: 50px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 35px;
  object-fit: contain;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
`;
const SearchInput = styled.input`
  margin-left: 10px;
  border: none;
  outline: none;
  background: none;
`;

const User = styled.div``;

const Avatar = styled.img``;

const Name = styled.span``;
