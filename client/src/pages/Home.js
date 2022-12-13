import styled from "styled-components";

import Navbar from "../components/Home/NavBarContainer";
import SideBar from "../components/Home/SideBarContainer";
import ChatView from "../components/Home/ChatViewContainer";

export default function UserHome() {
  return (
    <Container>
      <Navbar />
      <SideBar />
      <ChatView />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background: ${(props) => props.theme.background.app};
`;
