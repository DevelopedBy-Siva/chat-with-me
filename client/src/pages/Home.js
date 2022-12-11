import styled from "styled-components";
import { useState, useEffect } from "react";
import { RiChatSmile3Fill } from "react-icons/ri";

import Query from "../components/Home/QueryContainer";
import Navbar from "../components/Home/NavBarContainer";
import NavInfo from "../components/Home/NavInfoContainer";
import ChatView from "../components/Home/ChatViewContainer";

export default function UserHome() {
  useEffect(() => {}, []);

  const [contacts, setContacts] = useState(["Duke", "Nukem", "Sanker"]);
  const [addContactView, setAddContactView] = useState(false);

  const handleAddContactView = () => {
    setAddContactView((view) => !view);
  };

  return (
    <Container>
      <Logo>
        <AppLogo />
      </Logo>
      <Query />
      <Navbar />
      <NavInfo />
      <ChatView />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: minmax(auto, 60px);
  grid-template-columns: 60px minmax(auto, 300px) 1fr;
  grid-template-areas:
    "logo query query"
    "navbar info view";
  row-gap: 1px;
  column-gap: 1px;
  background: ${(props) => props.theme.background.app};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: logo;
  background: ${(props) => props.theme.background.container};
`;

const AppLogo = styled(RiChatSmile3Fill)`
  font-size: 70%;
  color: ${(props) => props.theme.text.main};
`;
