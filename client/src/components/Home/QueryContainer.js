import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import Avatar from "../../assets/svgs/avatars/3.svg";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function QueryContainer() {
  return (
    <Container>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search for contacts..." />
      </Search>
      <UserInfo>
        <ProfileAvatar src={Avatar} />
        <UserName>sivasanker n</UserName>
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
  font-size: 40%;
  width: 160px;
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
