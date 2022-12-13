import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

export default function SideBar() {
  return (
    <Container>
      <SearchContainer>
        <Search>
          <SearchIcon />
          <SearchInput>Find or start a conversation</SearchInput>
        </Search>
      </SearchContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 260px;
  background: ${(props) => props.theme.background.containerLight};
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.background.container};
  height: 70px;
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
