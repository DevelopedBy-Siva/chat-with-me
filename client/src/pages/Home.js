import styled from "styled-components";
import "react-tooltip/dist/react-tooltip.css";

import Navbar from "../components/Home/NavBarContainer";
import SideBar from "../components/Home/SideBarContainer";
import Chat from "../components/Home/Content/ChatContainer";

export default function UserHome() {
  return (
    <Container>
      <Navbar />
      <SideBar />
      <Chat />
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
