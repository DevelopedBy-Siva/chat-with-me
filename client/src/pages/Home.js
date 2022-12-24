import styled from "styled-components";
import "react-tooltip/dist/react-tooltip.css";

import Navbar from "../components/Home/NavBarContainer";
import Chat from "../components/Home/Content/Chat";
import Header from "../components/Home/Header";

export default function UserHome() {
  return (
    <Container>
      <Header />
      <Wrapper>
        <Navbar />
        <Chat />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${(props) => props.theme.background.app};
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;
