import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import Avatar from "../../svgs/Avatars/1.svg";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function QueryContainer() {
  return (
    <Container>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search for contacts" />
      </Search>
      <UserInfo>
        <ProfileAvatar src={Avatar} />
        <UserName>Sivasanker</UserName>
        <DropdownIcon />
      </UserInfo>
    </Container>
  );
}

const Container = styled.div`
  grid-area: query;
  background: ${(props) => props.theme.background.container};
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(FiSearch)`
  color: ${(props) => props.theme.text.main};
  font-size: 70%;
`;

const SearchInput = styled.input`
  margin-left: 10px;
  border: none;
  outline: none;
  background: none;
  color: ${(props) => props.theme.text.sub};
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
  margin-left: 4px;
  color: white;
  font-weight: 200;
  font-size: 80%;
  letter-spacing: 2px;
`;

const ProfileAvatar = styled.img``;

const DropdownIcon = styled(RiArrowDropDownLine)`
  color: white;
`;
